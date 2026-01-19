'use client';

import Popup from '../Popup/Popup';
import CheckIcon from '@/assets/icons/ic-check-round.svg';

export default function DeleteModal({ 
  isOpen, 
  onClose, 
  onDelete, 
  forceMobile = true // 항상 모바일 크기 유지 (요청사항 반영)
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onDelete}
      message="정말 삭제하시겠어요?"
      buttonText="네"
      cancelText="아니오"
      onCancel={onClose}
      icon={CheckIcon}
      forceMobile={forceMobile}
      // DeleteModal의 버튼: 아니오/네 (기본 120px 크기 유지)
    />
  );
}
