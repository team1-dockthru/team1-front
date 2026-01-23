// 액션카드 영역

import ActionCard from '@/components/common/ActionCard/ActionCard';

export default function ChallengeSidebar({
  deadline,
  participantCount,
  originalWorkId,
  isParticipating,
  status,
  onJoinChallenge,
  maxParticipants = 15,
}) {
  // "2024년 2월 28일 마감" → "2024년 2월 28일"로 변환
  const deadlineText = deadline.replace(' 마감', '');
  
  // 날짜 기준 마감 여부 판단
  const isDeadlinePassed = () => {
    const match = deadlineText.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    if (!match) return false;
    
    const [_, year, month, day] = match;
    const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    deadlineDate.setHours(23, 59, 59, 999);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return today > deadlineDate;
  };

  // 인원 기준 마감 여부 판단
  const isRecruitFull = participantCount >= maxParticipants;

  // 버튼 비활성화 여부
  const isDisabled = status === 'closed' || status === 'recruitClosed' || isDeadlinePassed() || isRecruitFull;
  
  const handlePrimaryClick = () => {
    window.location.href = `/works/${originalWorkId}`;
  };

  const handleSecondaryClick = () => {
    // disabled 상태에서는 아무 동작 안 함
    if (isDisabled) {
      return;
    }
    onJoinChallenge();
  };

  return (
    <ActionCard
      deadline={deadlineText}
      currentParticipants={participantCount}
      maxParticipants={maxParticipants}
      onPrimaryClick={handlePrimaryClick}
      onSecondaryClick={handleSecondaryClick}
      // TODO: ActionCard에 secondaryButtonText prop 추가 필요
      // secondaryButtonText={isParticipating ? '도전 계속하기' : '작업 도전하기'}
    />
  );
}