// 상단 상태 배너
// "챌린지가 마감되었어요" / "모집이 마감되었어요"

export default function StatusBanner({ status }) {
  if (status !== 'closed' && status !== 'recruitClosed') {
    return null;
  }

  const text = status === 'closed' 
    ? '챌린지가 마감되었어요' 
    : '모집이 마감되었어요';

  return (
    <div className="mb-4 rounded-lg bg-[#f5f5f5] px-4 py-3">
      <p className="text-sm font-medium text-[#737373]">
        {text}
      </p>
    </div>
  );
}