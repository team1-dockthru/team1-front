"use client";

import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import ChallengeStatusContent from "@/components/challenge/ChallengeStatusContent";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    content:
      "'신청한 챌린지 이름'/'챌린지 이름'에 도전한 작업물에/'챌린지 이름'의 작업물에 작성한 피드백이 수정/삭제되었어요",
    date: "2024.04.01",
  },
  {
    id: 2,
    content: "'신청한 챌린지 이름'이 승인/거절되었어요",
    date: "2024.04.01",
  },
];

export default function ChallengeRejectPage() {
  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={MOCK_NOTIFICATIONS} />
      <Container className="py-10 md:py-[60px]">
        <ChallengeStatusContent
          bannerText="신청이 거절되었습니다."
          bannerClassName="bg-[#fff1f1] text-[var(--error)]"
          reasonTitle="신청 거절 사유"
          reasonBody="독스루는 개발 문서 번역 플랫폼으로, 다른 종류의 번역 챌린지를 개최할 수 없음을 알려드립니다. 감사합니다."
          reasonMeta="독스루 운영진 | 24/02/24 16:38"
        />
      </Container>
    </div>
  );
}
