function chipTone(option) {
  if (option === 'High') return 'chip--danger';
  if (option === 'Medium') return 'chip--warning';
  return '';
}

export default function ChipGroup({ legend, value, options, onChange }) {
  return (
    <fieldset className="chip-group">
      <legend className="chip-group__legend">{legend}</legend>
      <div className="chip-row">
        {options.map((option) => {
          const isActive = option === value;
          const tone = chipTone(option);
          return (
            <button
              key={option}
              type="button"
              className={`chip ${isActive ? 'is-active' : ''} ${isActive ? tone : ''}`.trim()}
              aria-pressed={isActive}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
