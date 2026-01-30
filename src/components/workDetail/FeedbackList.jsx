// 댓글 목록

import ProfileMember from '@/assets/icons/ic-profile-member.svg';

export default function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <div
          key={feedback.feedbackId}
          className="rounded-lg bg-[#fafafa] p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-nowrap">
              {/* 프로필 이미지 - 크기 고정 */}
              <div className="flex h-6 w-6 min-h-6 min-w-6 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <ProfileMember className="h-full w-full object-contain" />
              </div>

              {/* 유저명 - 줄바꿈 방지 */}
              <span className="shrink-0 whitespace-nowrap text-sm font-medium text-[#262626]">
                {feedback.author.nickname}
              </span>
            </div>

            {/* 작성 일시 */}
            <span className="text-xs font-medium text-[#a3a3a3]">
              {feedback.createdAt}
            </span>
          </div>

          {/* 댓글 내용 */}
          <p className="whitespace-pre-wrap text-base font-normal leading-relaxed text-[#404040]">
            {feedback.content}
          </p>
        </div>
      ))}
    </div>
  );
}