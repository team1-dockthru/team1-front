// 최다 추천작

'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProfileMember from '@/assets/icons/ic-profile-member.svg';
import HeartActive from '@/assets/icons/ic-heart-active-s.svg';

export default function TopTranslation({ translations }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!translations || translations.length === 0) {
    return null;
  }

  const isMultiple = translations.length > 1;
  const currentTranslation = translations[currentIndex];

  // 이전 추천작으로 이동
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? translations.length - 1 : prev - 1));
  };

  // 다음 추천작으로 이동
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === translations.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-8">
      {/* 제목 */}
      <h2 className="mb-4 text-xl font-semibold text-[#262626]">
        최다 추천 번역
      </h2>

      {/* 추천작 카드 */}
      <div className="relative rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-6">
        {/* 좌우 화살표 (다수일 경우만) */}
        {isMultiple && (
          <>
            {/* 왼쪽 화살표 */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="이전 추천작"
            >
              <ChevronLeft className="h-6 w-6 text-[#262626]" />
            </button>

            {/* 오른쪽 화살표 */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="다음 추천작"
            >
              <ChevronRight className="h-6 w-6 text-[#262626]" />
            </button>
          </>
        )}

        {/* 작성자 정보 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <ProfileMember className="h-full w-full object-contain" />
            </div>
            <span className="text-sm font-medium text-[#262626]">
              {currentTranslation.author.nickname}
            </span>
          </div>

          {/* 좋아요 수 */}
          <div className="flex items-center gap-1">
            <HeartActive className="h-5 w-5" />
            <span className="text-sm font-medium text-[#262626]">
              {currentTranslation.likeCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 작성일시 */}
        <p className="mb-4 text-xs font-medium text-[#a3a3a3]">
          {currentTranslation.createdAt}
        </p>

        {/* 내용 */}
        <div
          className={`whitespace-pre-wrap text-base font-normal leading-relaxed text-[#404040] ${
            !isExpanded ? 'line-clamp-3' : ''
          }`}
        >
          {currentTranslation.content}
        </div>

        {/* 더보기/접기 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm font-semibold text-[#737373] hover:text-[#262626]"
        >
          {isExpanded ? '접기 ↑' : '더보기 ↓'}
        </button>

        {/* 페이지 인디케이터 (다수일 경우만) */}
        {isMultiple && (
          <div className="mt-4 flex justify-center gap-2">
            {translations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-[#262626]' : 'bg-[#d4d4d4]'
                }`}
                aria-label={`${index + 1}번째 추천작`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}