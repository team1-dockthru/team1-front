'use client';

import { cn } from '@/lib/utils';

export default function NotificationModal({
  notifications = [],
  className,
}) {
  return (
    <div className={cn(
      "flex flex-col bg-white overflow-hidden",
      "w-[343px]", // Fixed width
      "border-2 border-[var(--brand-purple)] rounded-lg", // 이미지의 보라색 테두리 반영 (Frame 2609793 etc 색상 참고, 일단 var(--brand-purple) 없으면 hex or gray-200? 이미지1은 보라색 border가 있는 것 처럼 보임 -> 사용자가 업로드한 이미지 'Rectangle 4214'가 보라색 테두리임. 그러나 보통 이건 Selection Box일 수 있음. 
      // 하지만 사용자 요청 "전체 크기 343 x 541 ... border: 2px solid var(--gray-gray200, #E5E5E5);" 은 FilterModal 요청이었음.
      // NotificationModal 요청에는 별도 border 언급 없으나, FilterModal과 유사성을 고려하여 gray-200 border 적용. 이미지의 보라색은 Figma Selection으로 보임.
      "border border-[var(--gray-200)]", 
      className
    )}>
      {/* 헤더 */}
      <div className="px-4 py-4 border-b border-[var(--gray-200)]">
        <h2 className="font-20-bold text-[var(--gray-900)]">알림</h2>
      </div>

      {/* 알림 목록 */}
      <div className="flex flex-col max-h-[400px] overflow-y-auto scrollbar-hide">
        {notifications.length > 0 ? (
          notifications.map((noti, index) => (
            <div 
              key={noti.id || index}
              className={cn(
                "flex flex-col gap-2 p-4", // 좌우 16px(px-4), 상하 12px? p-4는 16px. 상하 12px 요청이었으니 py-3 px-4가 맞음.
                "py-3 px-4",
                "border-b border-[var(--gray-100)] last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
              )}
            >
              <p className="font-14-medium text-[var(--gray-900)] leading-normal whitespace-pre-wrap break-keep">
                {noti.content}
              </p>
              <span className="font-12-regular text-[var(--gray-400)]">
                {noti.date}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-10 text-[var(--gray-500)] font-14-regular">
            새로운 알림이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
