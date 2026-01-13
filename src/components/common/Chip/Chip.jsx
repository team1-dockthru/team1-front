// src/components/common/Chip/Chip.jsx
import './Chip.css';

export default function Chip({
  children,
  variant = 'type-nextjs', // type-nextjs | type-api | category-doc | status-pending ...
  className = '',
  ...props
}) {
  return (
    <span
      className={['chip', `chip--${variant}`, 'font-13-semibold', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
