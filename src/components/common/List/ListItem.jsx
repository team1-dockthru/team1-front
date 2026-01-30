import { cn } from "@/lib/utils";

export default function ListItem({
  left, // 왼쪽: 뱃지/프로필 등
  title,
  subtitle,
  meta, // 좋아요 숫자 같은 보조 정보
  action, // "작업물 보기 >" 같은 액션 영역
  onClick,
}) {
  const clickable = typeof onClick === "function";

  return (
    <li className="border-b border-[var(--gray-200)]">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between bg-transparent px-4 py-3 text-left",
          clickable ? "cursor-pointer" : "cursor-default transition-colors hover:bg-[var(--gray-50)]"
        )}
        onClick={onClick}
        disabled={!clickable}
      >
        <div className="flex min-w-0 items-center gap-[14px]">
          {left}
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="font-16-semibold truncate text-[var(--gray-900)]">
              {title}
            </div>
            {subtitle ? (
              <div className="font-14-regular text-[var(--gray-500)]">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {meta ? (
            <div className="font-14-regular flex items-center gap-1 text-[var(--gray-500)]">
              {meta}
            </div>
          ) : null}
          {action ? (
            <div className="font-14-medium flex items-center gap-1 text-[var(--gray-500)]">
              {action}
            </div>
          ) : null}
        </div>
      </button>
    </li>
  );
}
