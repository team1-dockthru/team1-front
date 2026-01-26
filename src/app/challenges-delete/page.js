"use client";

import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import ChallengeStatusContent from "@/components/challenge/ChallengeStatusContent";
import notificationsData from "@/data/notifications.json";
import { notificationsSchema } from "@/schemas/challengeSchemas";

const validatedNotifications = notificationsSchema.parse(notificationsData);

export default function ChallengeDeletePage() {
  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={validatedNotifications} />
      <Container className="py-10 md:py-[60px]">
        <ChallengeStatusContent
          bannerText="삭제된 챌린지입니다."
          bannerClassName="bg-[#6b6b6b] text-white"
          reasonTitle="삭제 사유"
          reasonBody="독스루는 개발 문서 번역 플랫폼으로, 폭력성과 관련된 내용을 포함할 수 없음을 안내드립니다. 감사합니다."
          reasonMeta="독스루 운영진 | 24/02/24 16:38"
        />
      </Container>
    </div>
  );
}
