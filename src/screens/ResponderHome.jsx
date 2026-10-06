import Badge from '../components/Badge.jsx';
import {
  IconActivity,
  IconAlert,
  IconArrowRight,
  IconCamera,
  IconClock,
  IconFile,
  IconMapPin,
  IconRadio,
  IconUser,
} from '../components/Icons.jsx';
import { appInfo, operationStatus, recentReports, responder } from '../data/mockData.js';
import '../styles/home.css';

function priorityTone(priority) {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'neutral';
}

export default function ResponderHome({ onStart }) {
  return (
    <div className="home">
      <section className="panel home__hero">
        <div className="home__hero-copy">
          <span className="eyebrow">Interactive Field Prototype</span>
          <h1 className="home__title">{appInfo.name}</h1>
          <p className="home__lead">{appInfo.description}</p>
        </div>

        <ol className="workflow" aria-label="System workflow">
          {appInfo.workflow.map((stage, index) => (
            <li className="workflow__item" key={stage}>
              <span className="workflow__index">{index + 1}</span>
              {stage}
              {index < appInfo.workflow.length - 1 && (
                <IconArrowRight className="workflow__arrow" />
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="home__grid">
        <section className="panel home__responder">
          <header className="panel__head">
            <h2 className="panel__title">Responder Assignment</h2>
            <Badge tone="neutral">On Duty</Badge>
          </header>

          <div className="responder__identity">
            <span className="responder__avatar">
              <IconUser />
            </span>
            <div>
              <p className="responder__name">{responder.name}</p>
              <p className="responder__role">{responder.role}</p>
            </div>
          </div>

          <ul className="info-list">
            <li className="info-row">
              <span className="info-row__icon">
                <IconActivity />
              </span>
              <span>
                <span className="info-row__label">Current Operation</span>
                <span className="info-row__value">{responder.operation}</span>
              </span>
            </li>
            <li className="info-row">
              <span className="info-row__icon">
                <IconMapPin />
              </span>
              <span>
                <span className="info-row__label">Search Area</span>
                <span className="info-row__value">{responder.searchArea}</span>
              </span>
            </li>
            <li className="info-row">
              <span className="info-row__icon">
                <IconRadio />
              </span>
              <span>
                <span className="info-row__label">Operation Status</span>
                <span className="info-row__value">
                  <Badge tone="success">{operationStatus}</Badge>
                </span>
              </span>
            </li>
          </ul>

          <button type="button" className="btn btn--primary btn--lg btn--block" onClick={onStart}>
            <IconCamera />
            Start Camera Inspection
          </button>
          <p className="home__cta-hint">
            Opens the portable camera simulation for the assigned search area.
          </p>
        </section>

        <section className="panel home__recent">
          <header className="panel__head">
            <h2 className="panel__title">Recent Reports</h2>
            <span className="panel__hint">Mock data</span>
          </header>

          <ul className="recent-list">
            {recentReports.map((report) => (
              <li className="recent-item" key={report.id}>
                <span className="recent-item__icon">
                  <IconFile />
                </span>
                <div className="recent-item__body">
                  <div className="recent-item__top">
                    <span className="recent-item__area">
                      <IconMapPin />
                      {report.location}
                    </span>
                    <Badge
                      tone={
                        report.status === 'Dismissed'
                          ? 'neutral'
                          : priorityTone(report.priority)
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="recent-item__meta">
                    <IconClock />
                    {report.time}
                    <span className="recent-item__sep">·</span>
                    Priority: {report.priority}
                    <span className="recent-item__sep">·</span>
                    {report.id}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="home__recent-note">
            <IconAlert />
            Reports shown here are pre-loaded mock entries for demonstration.
          </p>
        </section>
      </div>
    </div>
  );
}
