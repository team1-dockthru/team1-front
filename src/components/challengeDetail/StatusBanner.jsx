// 상단 상태 배너

import DeadlineLargeIcon from '@/assets/icons/ic-deadline-large.svg';
import PersonWhiteIcon from '@/assets/icons/ic-person-s-white.svg';

export default function StatusBanner({ status, deadline, participantCount, maxParticipants = 15 }) {
  // 날짜 기준 마감 여부 판단
  const isDeadlinePassed = () => {
    if (!deadline) return false;
    
    // "2024년 3월 3일 마감" → "2024년 3월 3일" 추출
    const dateString = deadline.replace(' 마감', '');
    
    // "2024년 3월 3일" → Date 객체로 변환
    const match = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    if (!match) return false;
    
    const [_, year, month, day] = match;
    const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    deadlineDate.setHours(23, 59, 59, 999); // 해당일 마지막 시간으로 설정
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 시작 시간으로 설정
    
    return today > deadlineDate;
  };

  // 인원 기준 마감 여부 판단
  const isRecruitFull = participantCount >= maxParticipants;

  // 표시 여부 및 스타일 결정
  let text = '';
  let icon = null;
  let bgColor = '';
  let textColor = '';
  
  if (status === 'closed' || isDeadlinePassed()) {
    text = '챌린지가 마감되었어요';
    icon = <DeadlineLargeIcon />;
    bgColor = 'bg-[#262626]';
    textColor = 'text-white';
  } else if (status === 'recruitClosed' || isRecruitFull) {
    text = '모집이 완료된 상태에요';
    icon = <PersonWhiteIcon />;
    bgColor = 'bg-[#e5e5e5]';
    textColor = 'text-[#262626]';
  }

  // 마감 상태가 아니면 배너 표시 안 함
  if (!text) return null;

  return (
    <div className="mb-4 flex">
      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 ${bgColor}`}>
        {icon}
        <span className={`text-sm font-medium ${textColor}`}>
          {text}
        </span>
      </div>
    </div>
  );
}