// 최다 추천작

'use client';

import { useState, useEffect } from 'react';
import ProfileMember from '@/assets/icons/ic-profile-member.svg';
import HeartActive from '@/assets/icons/ic-heart-active-s.svg';
import MedalIcon from '@/assets/icons/ic-medal.svg';
import RightArrowIcon from '@/assets/icons/ic-btn-right-l.svg';
import ArrowDownIcon from '@/assets/icons/ic-arrow-round-down.svg';
import ArrowUpIcon from '@/assets/icons/ic-arrow-round-up.svg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';

export default function TopTranslation({ translations }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});

  // Carousel API가 준비되면 이벤트 리스너 등록
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!translations || translations.length === 0) {
    return null;
  }

  const isMultiple = translations.length > 1;

  // 카드별 더보기/접기 토글
  const toggleExpanded = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // 단일 카드 렌더링 함수
  const renderCard = (translation, cardIndex, isCurrentCard = true) => {
    const isExpanded = expandedCards[cardIndex] || false;
    
    // 텍스트가 7줄을 초과하는지 확인 (대략 350자 이상이면 7줄 초과)
    const needsExpand = translation.content && translation.content.length > 350;
    
    return (
      <div className={`relative rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-6 ${
        isExpanded ? 'min-h-[324px]' : 'h-[324px]'
      }`}>
      {/* 최다 추천 번역 배지 */}
      {isCurrentCard && (
        <div className="absolute left-0 top-0 flex h-[34px] items-center gap-1.5 whitespace-nowrap rounded-tl-2xl rounded-br-2xl bg-[#262626] px-4 py-2">
          <MedalIcon className="h-4 w-4 shrink-0" />
          <span className="text-sm font-medium text-white">최다 추천 번역</span>
        </div>
      )}

      {/* 작성자 정보 */}
      <div className="mb-4 mt-6 flex items-center justify-between">
        {/* 좌측: 프로필 + 닉네임 + 서브타이틀 + 하트 + 좋아요 수 */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <ProfileMember className="h-full w-full object-contain" />
          </div>
          <span className="text-sm font-medium text-[#262626]">
            {translation.author.nickname}
          </span>
          <span className="text-sm font-normal text-[#737373]">
            {translation.author.role || '일반'}
          </span>
          <div className="flex items-center gap-1">
            <HeartActive />
            <span className="text-sm font-medium text-[#262626]">
              {translation.likeCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 우측: 작성일자 */}
        <span className="text-sm font-normal text-[#737373]">
          {translation.createdAt}
        </span>
      </div>

      {/* 구분선 */}
      <div className="mb-4 h-px bg-[#e5e5e5]"></div>

      {/* 내용 */}
      <div
        className={`whitespace-pre-wrap text-base font-normal leading-relaxed text-[#404040] ${
          !isExpanded ? 'line-clamp-7' : ''
        }`}
        style={{ minHeight: isExpanded ? 'auto' : '188px' }}
      >
        {translation.content}
      </div>

      {/* 더보기/접기 버튼 (중앙) - 텍스트가 길 때만 표시 */}
      {isCurrentCard && needsExpand && (
        <div className={`flex justify-center ${isExpanded ? 'mt-3' : 'absolute bottom-6 left-0 right-0'}`}>
          <button
            onClick={() => toggleExpanded(cardIndex)}
            className="flex items-center gap-1 text-sm font-semibold text-[#737373] hover:text-[#262626]"
          >
            <span>{isExpanded ? '접기' : '더보기'}</span>
            {isExpanded ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

  // 단일 카드
  if (!isMultiple) {
    return <div className="mb-8">{renderCard(translations[0], 0)}</div>;
  }

  // 다중 카드 (Carousel)
  return (
    <div className="mb-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent className="-ml-4">
          {translations.map((translation, index) => (
            <CarouselItem 
              key={index} 
              className="basis-[calc(100%-120px)] pl-4"
            >
              <div 
                className={`h-full transition-opacity duration-300 ${
                  index === current ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="h-full">
                  {renderCard(translation, index)}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 커스텀 화살표 버튼 */}
        <button
          onClick={() => {
            const nextButton = document.querySelector('[data-carousel-next]');
            if (nextButton) nextButton.click();
          }}
          className="absolute right-[92px] top-1/2 z-20 -translate-y-1/2"
          aria-label="다음 추천작"
        >
          <RightArrowIcon className="h-12 w-12" />
        </button>

        {/* Carousel 기본 버튼 숨김 */}
        <CarouselNext className="hidden" data-carousel-next />
      </Carousel>
    </div>
  );
}