import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import {
  IconActivity,
  IconAlert,
  IconCamera,
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
import '../styles/rescue.css';

const ASSESSMENT_META = [
  { label: 'Visibility', icon: IconEye },
  { label: 'Movement', icon: IconActivity },
  { label: 'Access', icon: IconLock },
];

export default function RescueTeamView({ report, onStartNew }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rescue">
      <header className="rescue__head">
        <div>
          <span className="eyebrow">Rescue Team / Command View</span>
          <h1 className="rescue__title">Casualty Reports</h1>
          <p className="rescue__lead">
            Reports recorded by responders in the field, shown here for the
            rescue team. Information is observational and mock for this
            prototype.
          </p>
        </div>
        <Badge tone="success">
          <IconCheck />
          Synced (Mock)
        </Badge>
      </header>

      <article className="report-card">
        <div className="report-card__accent" aria-hidden />

        <header className="report-card__head">
          <div className="report-card__ident">
            <span className="report-card__id">{report.id}</span>
            <span className="report-card__status">
              <Badge tone="warning">
                <IconAlert />
                {report.status}
              </Badge>
            </span>
          </div>
          <div className="report-card__priority">
            <span className="report-card__priority-label">Priority</span>
            <Badge tone="danger" className="report-card__priority-badge">
              <IconFlag />
              {report.priority}
            </Badge>
          </div>
        </header>

        <div className="report-card__location">
          <span className="report-card__location-icon">
            <IconMapPin />
          </span>
          <div>
            <span className="report-card__location-label">Location</span>
            <span className="report-card__location-value">{report.location}</span>
          </div>
        </div>

        <div className="report-card__assessment">
          <span className="report-card__section-label">Assessment</span>
          <ul className="assess-list">
            {report.assessment.map((item, index) => {
              const Meta = ASSESSMENT_META[index];
              const Icon = Meta.icon;
              return (
                <li className="assess-item" key={Meta.label}>
                  <span className="assess-item__icon">
                    <Icon />
                  </span>
                  <span>
                    <span className="assess-item__label">{Meta.label}</span>
                    <span className="assess-item__value">{item}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <dl className="report-card__meta">
          <div className="report-card__meta-item">
            <dt>
              <IconUser />
              Detected / verified by
            </dt>
            <dd>{report.verifiedBy}</dd>
          </div>
          <div className="report-card__meta-item">
            <dt>
              <IconClock />
              Recorded
            </dt>
            <dd className="mono">{report.timestamp}</dd>
          </div>
          <div className="report-card__meta-item">
            <dt>
              <IconCamera />
              Source
            </dt>
            <dd>Portable camera · {report.detection}</dd>
          </div>
        </dl>

        <div className="report-card__actions">
          <button
            type="button"
            className="btn btn--ghost"
            aria-expanded={showDetails}
            onClick={() => setShowDetails((current) => !current)}
          >
            <IconChevron className={showDetails ? 'btn__chevron--up' : ''} />
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <button type="button" className="btn btn--primary" onClick={onStartNew}>
            Start New Inspection
          </button>
        </div>

        {showDetails && (
          <section className="report-details">
            <div className="report-details__grid">
              <div className="report-details__block">
                <span className="report-card__section-label">
                  Basic Condition
                </span>
                <p className="report-details__text">{report.condition}</p>
              </div>
              <div className="report-details__block">
                <span className="report-card__section-label">
                  Detection (Mock)
                </span>
                <p className="report-details__text">{report.detection}</p>
              </div>
            </div>
            <div className="report-details__block">
              <span className="report-card__section-label">Responder Notes</span>
              <p className="report-details__text report-details__text--notes">
                {report.notes}
              </p>
            </div>
            <p className="report-details__disclaimer">
              <IconFile />
              This record is a verification of a camera suggestion by a
              responder. It is not a medical assessment.
            </p>
          </section>
        )}
      </article>

      <p className="rescue__note">
        Reports are held in local application state for this prototype. No
        backend, live sync, or dispatch integration is included.
      </p>
    </div>
  );
}
