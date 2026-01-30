import { cn } from "@/lib/utils";
import DeadlineIcon from "@/assets/icons/ic-deadline-m.svg";
import PersonIcon from "@/assets/icons/ic-person-s-yellow.svg";

export default function ActionCard({
  deadline = "",
  currentParticipants = 0,
  maxParticipants = 0,
  onPrimaryClick,
  onSecondaryClick,
  secondaryButtonText = "작업 도전하기",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-[var(--gray-200)] bg-white p-6 shadow-sm",
        className
      )}
    >
      {/* 정보 영역 */}
      <div className="flex items-center justify-center gap-4 text-[var(--gray-600)]">
        <div className="flex items-center gap-1.5">
          <DeadlineIcon className="h-5 w-5" />
          <span className="font-14-medium">{deadline} 마감</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PersonIcon className="h-5 w-5" />
          <span className="font-14-medium">
            {currentParticipants}/{maxParticipants}
          </span>
        </div>
      </div>

      {/* 액션 버튼 영역 (반응형: 모바일/태블릿 flex-col, PC sm 이상일 때 flex-row) */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onPrimaryClick}
          className={cn(
            "flex-1 rounded-[var(--radius-md)] bg-[var(--brand-yellow)] py-3",
            "font-16-bold text-[var(--gray-900)]",
            "transition-opacity hover:opacity-90 active:opacity-100"
          )}
        >
          원문 보기
        </button>
        <button
          type="button"
          onClick={onSecondaryClick}
          className={cn(
            "flex-1 rounded-[var(--radius-md)] bg-[var(--brand-black)] py-3",
            "font-16-bold text-white",
            "transition-opacity hover:opacity-90 active:opacity-100"
          )}
        >
          {secondaryButtonText}
        </button>
      </div>
    </div>
  );
}
