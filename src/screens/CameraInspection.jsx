import { useEffect, useState } from 'react';
import Badge from '../components/Badge.jsx';
import DisasterScene from '../components/DisasterScene.jsx';
import {
  IconAlert,
  IconArrowLeft,
  IconBattery,
  IconCamera,
  IconCheck,
  IconMapPin,
  IconPause,
  IconPlay,
  IconRadio,
  IconScan,
  IconX,
} from '../components/Icons.jsx';
import { camera, detection, responder, scanSteps } from '../data/mockData.js';
import '../styles/camera.css';

const STATUS_READY = 'ready';
const STATUS_ANALYZING = 'analyzing';
const STATUS_DETECTED = 'detected';

const DEMO_STATES = [
  { id: STATUS_READY, label: 'Ready to inspect' },
  { id: STATUS_ANALYZING, label: 'Analyzing camera frame' },
  { id: STATUS_DETECTED, label: 'Possible person detected' },
];

function StateFlow({ current }) {
  const currentIndex = DEMO_STATES.findIndex((state) => state.id === current);

  return (
    <div className="state-flow" aria-label="Inspection state">
      {DEMO_STATES.map((state, index) => {
        const modifier =
          index === currentIndex
            ? 'is-current'
            : index < currentIndex
              ? 'is-done'
              : '';
        return (
          <span
            className={`state-flow__item ${modifier}`.trim()}
            key={state.id}
            aria-current={index === currentIndex ? 'step' : undefined}
          >
            <span className="state-flow__marker" aria-hidden>
              {index < currentIndex ? <IconCheck /> : <span className="state-flow__dot" />}
            </span>
            {state.label}
          </span>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === STATUS_ANALYZING) {
    return (
      <Badge tone="info" className="feed__status">
        <span className="feed__pulse" aria-hidden />
        Analyzing
      </Badge>
    );
  }

  if (status === STATUS_DETECTED) {
    return (
      <Badge tone="danger" className="feed__status">
        <span className="feed__pulse" aria-hidden />
        Possible Person
      </Badge>
    );
  }

  return (
    <Badge tone="warning" className="feed__status">
      <span className="feed__pulse" aria-hidden />
      {camera.status}
    </Badge>
  );
}

export default function CameraInspection({ onBack, onConfirmDetection }) {
  const [status, setStatus] = useState(STATUS_READY);
  const [scanStep, setScanStep] = useState(0);
  const [frames, setFrames] = useState([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (status !== STATUS_ANALYZING) return undefined;

    const timers = [
      setTimeout(() => setScanStep(0), 60),
      setTimeout(() => setScanStep(1), 560),
      setTimeout(() => setScanStep(2), 1060),
      setTimeout(() => setStatus(STATUS_DETECTED), 1560),
    ];

    return () => timers.forEach(clearTimeout);
  }, [status]);

  const handleCapture = () => {
    setFrames((current) => {
      const number = current.length + 1;
      return [
        ...current,
        { id: number, label: `Frame ${String(number).padStart(2, '0')}` },
      ].slice(-3);
    });
  };

  const handleAnalyze = () => {
    setScanStep(0);
    setStatus(STATUS_ANALYZING);
  };

  const handleDismiss = () => {
    setScanStep(0);
    setStatus(STATUS_READY);
  };

  const analyzing = status === STATUS_ANALYZING;

  return (
    <div className="screen camera-screen">
      <header className="screen-head">
        <div className="screen-head__inner">
          <button type="button" className="screen-head__back" onClick={onBack}>
            <IconArrowLeft />
            <span>Back</span>
          </button>

          <div className="screen-head__titles">
            <h1 className="screen-head__title">Camera Inspection</h1>
            <p className="screen-head__meta">
              <IconMapPin aria-hidden />
              <span>{responder.searchArea}</span>
              <span aria-hidden>·</span>
              <span className="mono">Inspection {camera.inspection}</span>
            </p>
          </div>

          <div className="screen-head__aside">
            <span className="conn-indicator">
              <span className="conn-indicator__dot" aria-hidden />
              {camera.connection}
            </span>
            <span className="battery-indicator">
              <IconBattery aria-hidden />
              {camera.battery}
            </span>
            <Badge tone="warning">{camera.status}</Badge>
          </div>
        </div>
      </header>

      <div className="screen-body">
        <div className="camera">
          <section className="panel camera__stage">
            <StateFlow current={status} />

            <div
              className={`feed feed--${status}${paused ? ' feed--paused' : ''}`}
            >
              <div className="feed__scene">
                <DisasterScene
                  detected={status === STATUS_DETECTED}
                  label={detection.cvLabel}
                  confidence={detection.confidence}
                />
              </div>

              <div className="feed__grid" aria-hidden />
              <div className="feed__scan" aria-hidden />

              <div className="feed__bar feed__bar--top">
                <span className="feed__label">
                  <IconCamera />
                  {camera.viewLabel}
                </span>
                <StatusBadge status={status} />
              </div>

              {status === STATUS_READY && (
                <p className="feed__hint">
                  Press <strong>Re-analyze</strong> to scan this frame
                </p>
              )}

              {status === STATUS_ANALYZING && (
                <div className="scan-overlay" role="status" aria-live="polite">
                  <span className="scan-overlay__icon">
                    <IconScan />
                  </span>
                  <p className="scan-overlay__title">Analyzing Camera Frame</p>
                  <p className="scan-overlay__msg">{scanSteps[scanStep]}</p>
                  <div className="scan-progress" aria-hidden>
                    <span />
                  </div>
                </div>
              )}

              {status === STATUS_DETECTED && (
                <div className="detect-banner" role="status" aria-live="polite">
                  <span className="detect-banner__dot" aria-hidden />
                  Possible Person Detected
                  <span className="detect-banner__conf">
                    {detection.confidence}% confidence
                  </span>
                </div>
              )}

              <div className="feed__bar feed__bar--bottom">
                <span className="feed__meta">
                  <IconMapPin />
                  {detection.searchArea}
                </span>
                <span className="feed__meta">{camera.device}</span>
                <span className="feed__meta feed__meta--mono">MOCK · 09:41 AM</span>
              </div>
            </div>

            <div className="camera__frames">
              <span className="camera__frames-label">Captured frames</span>
              {frames.length === 0 ? (
                <span className="camera__frames-empty">
                  None yet — press Capture Frame to mock a frame.
                </span>
              ) : (
                <ul className="frame-strip">
                  {frames.map((frame) => (
                    <li className="frame-thumb" key={frame.id}>
                      <IconScan />
                      {frame.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <aside className="panel panel--dark camera__side">
            <header className="panel__head">
              <h2 className="panel__title">Inspection</h2>
              <span className="panel__hint">Mock data</span>
            </header>

            <ul className="info-list">
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
                  <span className="info-row__label">Camera Status</span>
                  <span className="info-row__value">
                    <Badge tone="warning">{camera.status}</Badge>
                  </span>
                </span>
              </li>
              <li className="info-row">
                <span className="info-row__icon">
                  <IconScan />
                </span>
                <span>
                  <span className="info-row__label">Inspection</span>
                  <span className="info-row__value mono">{camera.inspection}</span>
                </span>
              </li>
            </ul>

            {status === STATUS_READY && (
              <p className="camera__instructions">
                Direct the portable camera into the unsafe area, capture
                reference frames, then run analysis to check for possible
                persons.
              </p>
            )}

            {status === STATUS_ANALYZING && (
              <div className="analyzing" role="status" aria-live="polite">
                <span className="eyebrow">Computer vision</span>
                <h3 className="analyzing__title">Analyzing camera frame…</h3>
                <ul className="analyzing__steps">
                  {scanSteps.map((step, index) => {
                    const state =
                      index < scanStep
                        ? 'is-done'
                        : index === scanStep
                          ? 'is-active'
                          : '';
                    return (
                      <li className={`analyzing__step ${state}`.trim()} key={step}>
                        <span className="analyzing__marker" aria-hidden>
                          {index < scanStep ? <IconCheck /> : <span className="analyzing__dot" />}
                        </span>
                        {step}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {status === STATUS_DETECTED && (
              <>
                <div className="detect-result" role="status" aria-live="polite">
                  <span className="detect-result__eyebrow">
                    Computer vision result
                  </span>
                  <h3 className="detect-result__title">
                    Possible Person Detected
                  </h3>
                  <p className="detect-result__text">
                    Review the detection before recording a casualty report. The
                    system only suggests — you make the final decision.
                  </p>

                  <ul className="detect-result__stats">
                    <li>
                      <span>Label</span>
                      <strong>{detection.cvLabel}</strong>
                    </li>
                    <li>
                      <span>Confidence</span>
                      <strong>{detection.confidence}%</strong>
                    </li>
                    <li>
                      <span>Status</span>
                      <strong>Awaiting verification</strong>
                    </li>
                  </ul>
                </div>

                <div className="camera__actions">
                  <button
                    type="button"
                    className="btn btn--success btn--lg btn--block"
                    onClick={onConfirmDetection}
                  >
                    <IconCheck />
                    Confirm Detection
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost-dark btn--lg btn--block"
                    onClick={handleDismiss}
                  >
                    <IconX />
                    Dismiss
                  </button>
                </div>
              </>
            )}

            <div className="camera__actions">
              <button
                type="button"
                className="btn btn--ghost-dark btn--lg btn--block"
                onClick={() => setPaused((current) => !current)}
                disabled={analyzing}
              >
                {paused ? <IconPlay /> : <IconPause />}
                {paused ? 'Resume Feed' : 'Pause Feed'}
              </button>
              <button
                type="button"
                className="btn btn--ghost-dark btn--lg btn--block"
                onClick={handleCapture}
                disabled={analyzing}
              >
                <IconCamera />
                Capture Frame
              </button>
              <button
                type="button"
                className="btn btn--primary btn--lg btn--block"
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                <IconScan />
                {analyzing ? 'Analyzing…' : 'Re-analyze'}
              </button>
            </div>

            <p className="camera__note">
              <IconAlert />
              {status === STATUS_DETECTED
                ? 'Computer vision suggests, the responder verifies. Not a medical diagnosis.'
                : 'Simulation only — detection is mocked for this prototype.'}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
