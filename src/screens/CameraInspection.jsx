import { useEffect, useState } from 'react';
import Badge from '../components/Badge.jsx';
import DisasterScene from '../components/DisasterScene.jsx';
import {
  IconAlert,
  IconCamera,
  IconCheck,
  IconMapPin,
  IconRadio,
  IconScan,
  IconX,
} from '../components/Icons.jsx';
import { camera, detection, responder, scanSteps } from '../data/mockData.js';
import '../styles/camera.css';

const STATUS_READY = 'ready';
const STATUS_ANALYZING = 'analyzing';
const STATUS_DETECTED = 'detected';

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

export default function CameraInspection({ onConfirmDetection }) {
  const [status, setStatus] = useState(STATUS_READY);
  const [scanStep, setScanStep] = useState(0);
  const [frames, setFrames] = useState([]);

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

  return (
    <div className="camera">
      <section className="panel camera__stage">
        <div className={`feed feed--${status}`}>
          <div className="feed__scene">
            <DisasterScene
              detected={status === STATUS_DETECTED}
              label={detection.cvLabel}
              confidence={detection.confidence}
            />
          </div>

          <div className="feed__grid" aria-hidden />
          <div className="feed__scan" aria-hidden />

          <span className="feed__bracket feed__bracket--tl" aria-hidden />
          <span className="feed__bracket feed__bracket--tr" aria-hidden />
          <span className="feed__bracket feed__bracket--bl" aria-hidden />
          <span className="feed__bracket feed__bracket--br" aria-hidden />

          <div className="feed__bar feed__bar--top">
            <span className="feed__label">
              <IconCamera />
              {camera.viewLabel}
            </span>
            <StatusBadge status={status} />
          </div>

          {status === STATUS_READY && (
            <p className="feed__hint">
              Press <strong>Analyze</strong> to scan this frame
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
              None yet — press Capture to mock a frame.
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

      <aside className="panel camera__side">
        <header className="panel__head">
          <h2 className="panel__title">Inspection</h2>
          <Badge tone="neutral">Step 2 of 4</Badge>
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
        </ul>

        {status === STATUS_READY && (
          <>
            <p className="camera__instructions">
              Direct the portable camera into the unsafe area, capture reference
              frames, then run analysis to check for possible persons.
            </p>

            <div className="camera__actions">
              <button
                type="button"
                className="btn btn--ghost btn--lg btn--block"
                onClick={handleCapture}
              >
                <IconCamera />
                Capture
              </button>
              <button
                type="button"
                className="btn btn--primary btn--lg btn--block"
                onClick={handleAnalyze}
              >
                <IconScan />
                Analyze
              </button>
            </div>

            <p className="camera__note">
              <IconAlert />
              Simulation only — detection is mocked for this prototype.
            </p>
          </>
        )}

        {status === STATUS_ANALYZING && (
          <>
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

            <div className="camera__actions">
              <button type="button" className="btn btn--ghost btn--lg btn--block" disabled>
                <IconCamera />
                Capture
              </button>
              <button type="button" className="btn btn--primary btn--lg btn--block" disabled>
                <IconScan />
                Analyzing…
              </button>
            </div>
          </>
        )}

        {status === STATUS_DETECTED && (
          <div className="detect-result" role="status" aria-live="polite">
            <span className="detect-result__eyebrow">Computer vision result</span>
            <h3 className="detect-result__title">Possible Person Detected</h3>
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

            <div className="camera__actions">
              <button
                type="button"
                className="btn btn--primary btn--lg btn--block"
                onClick={onConfirmDetection}
              >
                <IconCheck />
                Confirm Detection
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--lg btn--block"
                onClick={handleDismiss}
              >
                <IconX />
                Dismiss
              </button>
            </div>

            <p className="camera__note">
              <IconAlert />
              Computer vision suggests, the responder verifies. Not a medical
              diagnosis.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
