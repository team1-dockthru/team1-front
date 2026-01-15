export default function PageButton({ page, active = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-12 w-12 items-center justify-center rounded-xl border-0 font-14-semibold",
        "bg-[var(--gray-800)] text-[var(--gray-400)]",
        active ? "bg-[var(--gray-900)] text-[var(--brand-yellow)]" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {page}
    </button>
  );
}
