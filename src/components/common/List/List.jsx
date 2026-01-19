export default function List({ children, className = '' }) {
  return (
    <ul className={["m-0 list-none p-0", className].filter(Boolean).join(" ")}>
      {children}
    </ul>
  );
}
