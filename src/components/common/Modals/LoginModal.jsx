'use client';

import Popup from '../Popup/Popup';
import CheckIcon from '@/assets/icons/ic-check-round.svg';

export default function LoginModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  forceMobile = true // 항상 모바일 크기 유지 (요청사항 반영)
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onLogin}
      message={`로그인이 필요한 기능이에요,\n로그인 하시겠어요?`}
      buttonText="로그인하러 가기"
      icon={CheckIcon}
      forceMobile={forceMobile}
      confirmButtonClassName="w-[153px] h-[40px] px-0 py-[10.5px] whitespace-nowrap" // 패딩을 줄여 텍스트 공간 확보
    />
  );
}
