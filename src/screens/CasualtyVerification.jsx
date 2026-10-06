import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import ChipGroup from '../components/ChipGroup.jsx';
import DisasterScene from '../components/DisasterScene.jsx';
import {
  IconActivity,
  IconAlert,
  IconArrowLeft,
  IconCamera,
  IconCheck,
  IconClock,
  IconEye,
  IconFile,
  IconFlag,
  IconLock,
  IconMapPin,
  IconScan,
  IconUser,
  IconX,
} from '../components/Icons.jsx';
import {
  assessmentOptions,
  camera,
  defaultAssessment,
  detection,
  responder,
} from '../data/mockData.js';
import '../styles/verification.css';

const DETECTION_FIELDS = [
  { label: 'Detection', value: detection.result, icon: IconAlert, tone: 'alert' },
  { label: 'Search Area', value: detection.searchArea, icon: IconMapPin },
  { label: 'Visibility', value: detection.visibility, icon: IconEye, tone: 'alert' },
  { label: 'Movement', value: detection.movement, icon: IconActivity, tone: 'alert' },
  { label: 'Access', value: detection.access, icon: IconLock, tone: 'alert' },
  { label: 'Priority', value: detection.priority, icon: IconFlag, tone: 'danger' },
];

const ASSESSMENT_FIELDS = [
  { key: 'visibility', legend: 'Visibility' },
  { key: 'movement', legend: 'Movement' },
  { key: 'condition', legend: 'Condition' },
  { key: 'access', legend: 'Access' },
  { key: 'priority', legend: 'Priority' },
];

const DETAIL_ROWS = [
  {
    label: 'Detected',
    value: detection.detectedAt,
    icon: IconClock,
  },
  {
    label: 'Confidence',
    value: `${detection.confidence}%`,
    icon: IconScan,
  },
  {
    label: 'Camera Position',
    value: camera.device,
    icon: IconCamera,
  },
  {
    label: 'Responder',
    value: `Responder ${responder.name}`,
    icon: IconUser,
  },
];

export default function CasualtyVerification({ onDismiss, onSave, startPhase = 'review' }) {
  const [phase, setPhase] = useState(startPhase);
  const [assessment, setAssessment] = useState(defaultAssessment);

  const setField = (key, value) => {
    setAssessment((current) => ({ ...current, [key]: value }));
  };

  const handleBack = () => {
    if (phase === 'assessment') {
      setPhase('review');
    } else {
      onDismiss();
    }
  };

  return (
    <div className="screen verify">
      <header className="screen-head">
        <div className="screen-head__inner">
          <button type="button" className="screen-head__back" onClick={handleBack}>
            <IconArrowLeft />
            <span>Back</span>
          </button>

          <div className="screen-head__titles">
            <h1 className="screen-head__title">Casualty Verification</h1>
            <p className="screen-head__meta">
              <IconMapPin aria-hidden />
              <span>{detection.searchArea}</span>
              <span aria-hidden>·</span>
              <span className="mono">Inspection {camera.inspection}</span>
            </p>
          </div>

          <div className="screen-head__aside">
            {phase === 'review' ? (
              <Badge tone="danger">Awaiting verification</Badge>
            ) : (
              <Badge tone="warning">Unsaved</Badge>
            )}
          </div>
        </div>
      </header>

      <div className="screen-body">
        {phase === 'review' ? (
          <div className="verify">
            <section className="alert-banner">
              <span className="alert-banner__icon">
                <IconAlert />
              </span>
              <div className="alert-banner__copy">
                <span className="eyebrow eyebrow--warning">
                  Computer-vision suggestion
                </span>
                <h2 className="verify__title">Possible Casualty Detected</h2>
                <p className="verify__lead">
                  The portable camera analysis suggests a possible person in the
                  search area. The system does not confirm casualties — a
                  responder must verify the detection before anything is
                  recorded.
                </p>
              </div>
              <Badge tone="danger" className="alert-banner__priority">
                Priority: {detection.priority}
              </Badge>
            </section>

            <section className="panel verify__panel">
              <header className="panel__head">
                <h3 className="panel__title">Detection Summary</h3>
                <span className="panel__hint">Awaiting verification</span>
              </header>

              <div className="detect-grid">
                {DETECTION_FIELDS.map(({ label, value, icon: Icon, tone }) => (
                  <div
                    className={`detect-card ${tone ? `detect-card--${tone}` : ''}`.trim()}
                    key={label}
                  >
                    <span className="detect-card__label">
                      <Icon />
                      {label}
                    </span>
                    <span className="detect-card__value">{value}</span>
                  </div>
                ))}
              </div>

              <p className="verify__disclaimer">
                <IconAlert />
                Observational information only. This prototype does not provide
                medical diagnosis or automatic casualty confirmation.
              </p>

              <div className="verify__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--lg"
                  onClick={() => setPhase('assessment')}
                >
                  <IconCheck />
                  Confirm Detection
                </button>
                <button
                  type="button"
                  className="btn btn--danger-quiet btn--lg"
                  onClick={onDismiss}
                >
                  <IconX />
                  Dismiss Detection
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div className="verify">
            <div className="assessment-layout">
              <aside className="panel preview-panel">
                <header className="panel__head">
                  <h2 className="panel__title">Detection Preview</h2>
                  <span className="panel__hint">Static frame</span>
                </header>

                <div className="preview">
                  <DisasterScene
                    detected
                    label={detection.cvLabel}
                    confidence={detection.confidence}
                  />
                </div>

                <div className="detection-details">
                  <span className="detection-details__title">
                    Detection Details
                  </span>
                  <ul className="info-list preview__rows">
                    {DETAIL_ROWS.map(({ label, value, icon: Icon }) => (
                      <li className="info-row" key={label}>
                        <span className="info-row__icon">
                          <Icon />
                        </span>
                        <span>
                          <span className="info-row__label">{label}</span>
                          <span className="info-row__value">{value}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <section className="panel verify__panel">
                <header className="assessment__head">
                  <span className="assessment__icon">
                    <IconFile />
                  </span>
                  <div>
                    <span className="eyebrow">Responder verification</span>
                    <h2 className="verify__title verify__title--sm">
                      Field Assessment
                    </h2>
                    <p className="verify__lead">
                      Record what you can observe from the camera feed.
                      Confirmations are observational, not a medical diagnosis.
                    </p>
                  </div>
                  <Badge tone="warning">Unsaved</Badge>
                </header>

                <div className="assessment__context">
                  <Badge tone="info">
                    <IconMapPin />
                    Search Area · {detection.searchArea}
                  </Badge>
                  <Badge tone="neutral">{detection.result}</Badge>
                  <Badge tone="neutral">Responder {responder.name}</Badge>
                </div>

                <div className="assessment__grid">
                  {ASSESSMENT_FIELDS.map(({ key, legend }) => (
                    <ChipGroup
                      key={key}
                      legend={legend}
                      value={assessment[key]}
                      options={assessmentOptions[key]}
                      onChange={(value) => setField(key, value)}
                    />
                  ))}

                  <div className="chip-group chip-group--notes">
                    <label className="chip-group__legend" htmlFor="responder-notes">
                      Responder Notes
                    </label>
                    <textarea
                      id="responder-notes"
                      className="notes"
                      rows={4}
                      value={assessment.notes}
                      placeholder="Add observational notes, e.g. position observed, hazards, suggested approach route…"
                      onChange={(event) => setField('notes', event.target.value)}
                    />
                  </div>
                </div>

                <div className="verify__actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--lg"
                    onClick={() => onSave(assessment)}
                  >
                    <IconCheck />
                    Save Casualty Report
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost btn--lg"
                    onClick={() => setPhase('review')}
                  >
                    <IconArrowLeft />
                    Back to Detection
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
