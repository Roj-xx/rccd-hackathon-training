import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import {
  IconActivity,
  IconAlert,
  IconCheck,
  IconChevron,
  IconClock,
  IconEye,
  IconFile,
  IconFlag,
  IconLock,
  IconMapPin,
  IconUser,
} from '../components/Icons.jsx';
import { camera, recentReports } from '../data/mockData.js';
import '../styles/rescue.css';

const RESCUE_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'reports', label: 'Casualty Reports' },
  { id: 'areas', label: 'Search Areas' },
  { id: 'responders', label: 'Responders' },
  { id: 'settings', label: 'Settings' },
];

const CARD_FACTS = [
  { key: 'visibility', label: 'Visibility', icon: IconEye },
  { key: 'movement', label: 'Movement', icon: IconActivity },
  { key: 'condition', label: 'Condition', icon: IconAlert },
];

function priorityTone(priority) {
  if (priority === 'High' || priority === 'Critical') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'neutral';
}

function cardValue(entry, key) {
  if (entry.assessment) {
    if (key === 'visibility') return entry.assessment[0];
    if (key === 'movement') return entry.assessment[1];
  }
  return entry[key];
}

function ReportCard({ entry, current }) {
  const [showDetails, setShowDetails] = useState(false);
  const time = entry.timestamp ?? entry.time;
  const verifiedBy = entry.verifiedBy ?? entry.responder;
  const statusTone = entry.status === 'Dismissed' ? 'neutral' : 'warning';

  return (
    <article className="report-card">
      <div
        className={`report-card__accent report-card__accent--${priorityTone(entry.priority)}`}
        aria-hidden
      />

      <header className="report-card__head">
        <div className="report-card__ident">
          <span className="report-card__eyebrow">
            {current ? 'Current Casualty Report' : 'Casualty Report'}
          </span>
          <div className="report-card__ident-row">
            <span className="report-card__id">{entry.id}</span>
            <Badge tone={statusTone}>{entry.status}</Badge>
          </div>
        </div>
        <div className="report-card__priority">
          <span className="report-card__priority-label">Priority</span>
          <Badge
            tone={priorityTone(entry.priority)}
            className="report-card__priority-badge"
          >
            <IconFlag />
            {entry.priority}
          </Badge>
        </div>
      </header>

      <div className="report-card__facts">
        <div className="report-card__location">
          <span className="report-card__location-icon">
            <IconMapPin />
          </span>
          <div>
            <span className="report-card__location-label">Search Area</span>
            <span className="report-card__location-value">{entry.location}</span>
          </div>
        </div>
        <div className="report-card__fact">
          <span className="report-card__fact-label">
            <IconClock />
            Recorded
          </span>
          <span className="report-card__fact-value mono">{time}</span>
        </div>
        <div className="report-card__fact">
          <span className="report-card__fact-label">
            <IconUser />
            Responder
          </span>
          <span className="report-card__fact-value">{verifiedBy}</span>
        </div>
      </div>

      <div className="report-card__assessment">
        <span className="report-card__section-label">Observation</span>
        <ul className="assess-list">
          {CARD_FACTS.map(({ key, label, icon: Icon }) => (
            <li className="assess-item" key={key}>
              <span className="assess-item__icon">
                <Icon />
              </span>
              <span>
                <span className="assess-item__label">{label}</span>
                <span className="assess-item__value">
                  {cardValue(entry, key)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="report-card__actions">
        <button
          type="button"
          className="btn btn--ghost"
          aria-expanded={showDetails}
          onClick={() => setShowDetails((value) => !value)}
        >
          <IconChevron className={showDetails ? 'btn__chevron--up' : ''} />
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled
          title="Not included in this prototype"
        >
          <IconLock />
          Assign Team
        </button>
      </div>

      {showDetails && (
        <section className="report-details">
          <div className="report-details__grid">
            <div className="report-details__block">
              <span className="report-card__section-label">Basic Condition</span>
              <p className="report-details__text">{entry.condition}</p>
            </div>
            <div className="report-details__block">
              <span className="report-card__section-label">Detection (Mock)</span>
              <p className="report-details__text">{entry.detection}</p>
            </div>
            <div className="report-details__block">
              <span className="report-card__section-label">Inspection</span>
              <p className="report-details__text mono">{camera.inspection}</p>
            </div>
          </div>
          <div className="report-details__block">
            <span className="report-card__section-label">Responder Notes</span>
            <p className="report-details__text report-details__text--notes">
              {entry.notes}
            </p>
          </div>
          <p className="report-details__disclaimer">
            <IconFile />
            This record is a verification of a camera suggestion by a responder.
            It is not a medical assessment.
          </p>
        </section>
      )}
    </article>
  );
}

export default function RescueTeamView({ report, onStartNew }) {
  const queue = [report, ...recentReports];

  const stats = {
    total: queue.length,
    high: queue.filter(
      (entry) => entry.priority === 'High' || entry.priority === 'Critical',
    ).length,
    areas: new Set(queue.map((entry) => entry.location)).size,
    responders: new Set(
      queue.map((entry) => entry.verifiedBy ?? entry.responder),
    ).size,
  };

  return (
    <div className="screen rescue">
      <header className="screen-head">
        <div className="screen-head__inner">
          <div className="screen-head__titles">
            <span className="screen-head__eyebrow">
              Rescue Team / Command View
            </span>
            <h1 className="screen-head__title">Casualty Reports</h1>
          </div>

          <div className="screen-head__aside">
            <Badge tone="success">
              <IconCheck />
              Synced (Mock)
            </Badge>
            <button
              type="button"
              className="btn btn--primary"
              onClick={onStartNew}
            >
              Start New Inspection
            </button>
          </div>
        </div>
      </header>

      <nav className="rescue-nav" aria-label="Rescue team sections">
        <ul className="rescue-nav__list">
          {RESCUE_NAV.map((item) => {
            const active = item.id === 'reports';
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`rescue-nav__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  disabled={!active}
                  title={active ? undefined : 'Not included in this prototype'}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="screen-body">
        <div className="rescue">
          <p className="rescue__lead">
            Reports recorded by responders in the field, shown here for the
            rescue team. Information is observational and mock for this
            prototype.
          </p>

          <section className="rescue-stats" aria-label="Queue summary">
            <div className="stat-card">
              <span className="stat-card__label">Total Reports</span>
              <span className="stat-card__value">{stats.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">High Priority</span>
              <span className="stat-card__value stat-card__value--danger">
                {stats.high}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Search Areas</span>
              <span className="stat-card__value">{stats.areas}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Responders</span>
              <span className="stat-card__value">{stats.responders}</span>
            </div>
          </section>

          <div className="report-queue">
            {queue.map((entry, index) => (
              <ReportCard key={entry.id} entry={entry} current={index === 0} />
            ))}
          </div>

          <p className="rescue__note">
            Reports are held in local application state for this prototype. No
            backend, live sync, or dispatch integration is included.
          </p>
        </div>
      </div>
    </div>
  );
}
