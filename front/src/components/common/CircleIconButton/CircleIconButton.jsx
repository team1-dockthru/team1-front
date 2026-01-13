import './CircleIconButton.css';

export default function CircleIconButton({ children, size = 'lg', onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className={['circleBtn', `circleBtn--${size}`].join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
