import './page-button.css';

export default function PageButton({ page, active = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      className={[
        'page-button',
        active ? 'page-button--active' : '',
        disabled ? 'page-button--disabled' : '',
        'font-14-semibold',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {page}
    </button>
  );
}
