import { useQualitySettings } from '../../core/preferences/QualityContext';

const choices = [
  { value: 'auto', label: 'Auto' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
] as const;

/** Lets visitors trade visual fidelity for battery life and smoother rendering. */
export default function QualitySettings() {
  const { preference, quality, setPreference } = useQualitySettings();
  return (
    <fieldset className="quality-settings" aria-label="3D graphics quality">
      <legend>3D quality</legend>
      <div className="quality-options">
        {choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            className={preference === choice.value ? 'is-selected' : undefined}
            aria-pressed={preference === choice.value}
            onClick={() => setPreference(choice.value)}
          >
            {choice.label}
          </button>
        ))}
      </div>
      <span className="quality-current" aria-live="polite">Rendering: {quality.tier}</span>
    </fieldset>
  );
}
