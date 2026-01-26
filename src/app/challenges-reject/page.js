"use client";

import { useMemo } from "react";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import ChallengeStatusContent from "@/components/challenge/ChallengeStatusContent";
import notificationsData from "@/data/notifications.json";
import { notificationsSchema } from "@/schemas/challengeSchemas";

export default function ChallengeRejectPage() {
  const validatedNotifications = useMemo(() => {
    try {
      return notificationsSchema.parse(notificationsData);
    } catch {
      return notificationsData;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={validatedNotifications} />
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
