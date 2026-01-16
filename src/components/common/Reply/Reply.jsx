'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import MeatballsIcon from '@/assets/icons/ic-meatballs-menu.svg';
import PersonIcon from '@/assets/icons/ic-person-s-yellow.svg';

/**
 * 댓글 컴포넌트
 * @param {string} nickname - 사용자 닉네임
 * @param {string} date - 작성 일자
 * @param {string} content - 댓글 내용
 * @param {function} onUpdate - 수정 완료 시 콜백 (내용 전달)
 * @param {function} onDelete - 삭제 클릭 시 콜백
 */
export default function Reply({
  nickname = '럽윈즈올',
  date = '24/01/17 15:38',
  content = '일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 → 일반적으로 개발자는 개인이 갖고 있는 스킬셋에 대한 전문성이 있어야 커리어에서 유망하다고 여겨집니다. 라고 바꾸는게 더 자연스러운 말일 것 같아요',
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEditOpen = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(content);
  };

  const handleComplete = () => {
    onUpdate?.(editValue);
    setIsEditing(false);
  };

  return (
    <div className="flex w-full gap-3 rounded-2xl bg-white p-4 shadow-sm sm:gap-4 sm:p-6">
      {/* 왼쪽: 프로필 아이콘 */}
      <div className="shrink-0">
        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--gray-50)] sm:size-12">
          <PersonIcon className="size-6 sm:size-8" />
        </div>
      </div>

      {/* 오른쪽: 정보 및 본문 */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* 헤더: 닉네임, 날짜, 메뉴 */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-14-bold text-[var(--gray-900)] sm:font-16-bold">
              {nickname}
            </span>
            <span className="font-12-regular mt-0.5 text-[var(--gray-400)] sm:font-14-regular">
              {date}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="font-14-medium text-[var(--gray-500)] hover:text-[var(--gray-700)] sm:font-16-medium"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleComplete}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--gray-900)] px-6 font-14-bold text-white hover:bg-black sm:h-12 sm:font-16-bold"
                >
                  수정 완료
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex size-6 items-center justify-center rounded-full hover:bg-[var(--gray-50)]"
              >
                <MeatballsIcon className="size-5 text-[var(--gray-400)]" />
              </button>
            )}
          </div>
        </div>

        {/* 본문 */}
        <div className="mt-4">
          {isEditing ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="font-14-regular w-full resize-none rounded-lg border border-[var(--gray-200)] p-3 text-[var(--gray-900)] focus:border-[var(--gray-400)] focus:outline-none sm:font-16-regular"
              rows={3}
            />
          ) : (
            <p className="font-14-regular text-[var(--gray-900)] whitespace-pre-wrap sm:font-16-regular">
              {content}
            </p>
          )}
        </div>

        {/* 드롭다운 메뉴 (임시 구현) */}
        {!isEditing && isMenuOpen && (
          <div className="absolute right-0 top-8 z-10 w-32 overflow-hidden rounded-lg border border-[var(--gray-200)] bg-white shadow-lg">
            <button
              type="button"
              onClick={handleEditOpen}
              className="font-14-medium flex h-11 w-full items-center justify-center border-b border-[var(--gray-100)] text-[var(--gray-800)] hover:bg-[var(--gray-50)]"
            >
              수정하기
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete?.();
                setIsMenuOpen(false);
              }}
              className="font-14-medium flex h-11 w-full items-center justify-center text-[var(--gray-800)] hover:bg-[var(--gray-50)]"
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
