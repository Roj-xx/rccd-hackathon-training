import { LogoMark, IconArrowLeft } from './Icons.jsx';

export default function AppHeader({ steps, currentStepId, onBack, backLabel }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <header className="appbar">
      <div className="appbar__inner">
        {onBack && (
          <button type="button" className="appbar__back" onClick={onBack}>
            <IconArrowLeft />
            <span>{backLabel}</span>
          </button>
        )}

        <div className="brand">
          <span className="brand__mark">
            <LogoMark />
          </span>
          <span className="brand__text">
            <span className="brand__title">Remote Camera Casualty Detection</span>
            <span className="brand__meta">Visual prototype · Mock data only</span>
          </span>
        </div>

        <nav className="steps" aria-label="Prototype flow">
          <ol className="steps__list">
            {steps.map((step, index) => {
              const state =
                index === currentIndex
                  ? 'is-current'
                  : index < currentIndex
                    ? 'is-done'
                    : 'is-todo';
              return (
                <li key={step.id} className={`steps__item ${state}`} aria-current={state === 'is-current' ? 'step' : undefined}>
                  <span className="steps__dot">{index + 1}</span>
                  <span className="steps__label">{step.short}</span>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}
