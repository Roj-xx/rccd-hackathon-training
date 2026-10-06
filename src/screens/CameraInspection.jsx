import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import {
  IconAlert,
  IconCamera,
  IconMapPin,
  IconRadio,
  IconScan,
} from '../components/Icons.jsx';
import { camera, detection, responder } from '../data/mockData.js';
import '../styles/camera.css';

export default function CameraInspection({ onAnalyze }) {
  const [frames, setFrames] = useState([]);

  const handleCapture = () => {
    setFrames((current) => {
      const number = current.length + 1;
      return [
        ...current,
        { id: number, label: `Frame ${String(number).padStart(2, '0')}` },
      ].slice(-3);
    });
  };

  return (
    <div className="camera">
      <section className="panel camera__stage">
        <div className="feed">
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
            <Badge tone="warning" className="feed__status">
              <span className="feed__pulse" aria-hidden />
              {camera.status}
            </Badge>
          </div>

          <div className="feed__placeholder">
            <div className="feed__frame">
              <span className="feed__frame-icon">
                <IconScan />
              </span>
              <p className="feed__frame-title">Disaster Scene Preview</p>
              <p className="feed__frame-text">
                Simulated camera feed of the search area will appear here.
                Detection behavior is added in Milestone 2.
              </p>
            </div>
          </div>

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
            onClick={onAnalyze}
          >
            <IconScan />
            Analyze
          </button>
        </div>

        <p className="camera__note">
          <IconAlert />
          Simulation only — Analyze continues the prototype flow. Real
          detection arrives in Milestone 2.
        </p>
      </aside>
    </div>
  );
}
