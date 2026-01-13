import './FeedbackButton.css';

export default function FeedbackButton({ variant = 'gray', children, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className={['fbBtn', `fbBtn--${variant}`].join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
