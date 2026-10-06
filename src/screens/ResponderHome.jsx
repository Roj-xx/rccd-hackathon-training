import Badge from '../components/Badge.jsx';
import DisasterScene from '../components/DisasterScene.jsx';
import {
  IconAlert,
  IconChevron,
  IconClock,
  IconClipboard,
  IconMapPin,
  IconUser,
} from '../components/Icons.jsx';
import {
  appInfo,
  camera,
  operationStatus,
  recentReports,
  responder,
} from '../data/mockData.js';
import '../styles/home.css';

function priorityTone(priority) {
  if (priority === 'High' || priority === 'Critical') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'neutral';
}

function statusTone(status) {
  return status === 'Dismissed' ? 'neutral' : 'warning';
}

export default function ResponderHome({ onStart }) {
  return (
    <div className="screen">
      <div className="screen-body home">
        <section className="panel home__hero">
          <div className="home__hero-copy">
            <h1 className="home__title">{appInfo.name}</h1>
            <p className="home__lead">{appInfo.description}</p>
          </div>
          <div className="home__hero-media" aria-hidden>
            <DisasterScene detected={false} />
          </div>
        </section>

        <section className="home__summary" aria-label="Operation summary">
          <div className="panel summary-card">
            <span className="summary-card__label">Current Operation</span>
            <p className="summary-card__value">{responder.operation}</p>
            <div className="summary-card__meta">
              <Badge tone="success">{operationStatus}</Badge>
              <span className="summary-card__meta-item">
                <IconMapPin />
                {responder.searchArea}
              </span>
              <span className="summary-card__meta-item mono">
                Inspection {camera.inspection}
              </span>
            </div>
          </div>

          <div className="panel summary-card">
            <span className="summary-card__label">Responder</span>
            <div className="summary-card__responder">
              <span className="summary-card__avatar">
                <IconUser />
              </span>
              <div>
                <p className="summary-card__value">{responder.name}</p>
                <p className="summary-card__role">{responder.role}</p>
              </div>
            </div>
            <div className="summary-card__meta">
              <Badge tone="neutral">On Duty</Badge>
              <span className="summary-card__meta-item">
                <IconClock />
                Shift 06:00 – 18:00
              </span>
            </div>
          </div>

          <div className="panel summary-card summary-card--cta">
            <span className="summary-card__label">Primary Action</span>
            <button
              type="button"
              className="btn btn--primary btn--lg btn--block"
              onClick={onStart}
            >
              <IconClipboard />
              Start Camera Inspection
            </button>
            <p className="summary-card__cta-hint">
              Opens the portable camera simulation for the assigned search area.
            </p>
          </div>
        </section>

        <section className="panel home__recent">
          <header className="panel__head">
            <h2 className="panel__title">Recent Inspections</h2>
            <span className="panel__hint">Mock data</span>
          </header>

          <ul className="recent-list">
            {recentReports.map((report) => (
              <li className="recent-item" key={report.id}>
                <span className="recent-item__icon">
                  <IconClipboard />
                </span>
                <div className="recent-item__body">
                  <div className="recent-item__top">
                    <span className="recent-item__area">
                      <IconMapPin />
                      {report.location}
                    </span>
                    <span className="recent-item__badges">
                      <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                      <Badge tone={priorityTone(report.priority)}>
                        {report.priority}
                      </Badge>
                    </span>
                  </div>
                  <p className="recent-item__meta">
                    <IconClock />
                    {report.time}
                    <span className="recent-item__sep">·</span>
                    {report.id}
                  </p>
                </div>
                <IconChevron className="recent-item__chevron" />
              </li>
            ))}
          </ul>

          <p className="home__recent-note">
            <IconAlert />
            Inspections shown here are pre-loaded mock entries for demonstration.
          </p>
        </section>
      </div>
    </div>
  );
}
