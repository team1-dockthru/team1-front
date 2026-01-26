"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import notificationsData from "@/data/notifications.json";
import { notificationsSchema } from "@/schemas/challengeSchemas";
import RejectSampleImage from "@/assets/images/img_reject_sample_1.svg";
import DeadlineIcon from "@/assets/icons/ic-deadline-s.svg";
import PeopleIcon from "@/assets/icons/ic-person-s-yellow.svg";
import ArrowClickIcon from "@/assets/icons/ic-arrow-click.svg";

export default function ChallengeDeletePage() {
  const router = useRouter();
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
        <div className="flex flex-col gap-6">
          <div className="rounded-full px-6 pt-[8px] pb-[8px] text-center font-14-semibold bg-[#6b6b6b] text-white">
            삭제된 챌린지입니다.
          </div>

          <div className="rounded-2xl border border-[var(--gray-200)] bg-[var(--gray-50)] p-6 text-center">
            <div className="font-14-semibold text-[var(--gray-800)]">삭제 사유</div>
            <p className="mt-3 font-14-regular text-[var(--gray-700)]">
              독스루는 개발 문서 번역 플랫폼으로, 폭력성과 관련된 내용을 포함할 수 없음을 안내드립니다. 감사합니다.
            </p>
            <div className="mt-4 font-12-regular text-[var(--gray-400)] text-right">
              독스루 운영진 | 24/02/24 16:38
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-20-bold text-[var(--gray-900)]">
              Next.js - App Router : Routing Fundamentals
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[8px] bg-[#79e16a] px-3 py-[3px] text-[13px] font-13-semibold text-[var(--gray-900)]">
                Next.js
              </span>
              <span className="rounded-[8px] border border-[var(--gray-300)] bg-white px-[7px] py-[5px] text-[13px] font-13-semibold text-[var(--gray-800)]">
                공식문서
              </span>
            </div>
            <p className="font-16-regular-160 text-[var(--gray-700)]">
              Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다!
              라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등을 공부할 수
              있을 것 같아요. 다들 챌린지 많이 참여해 주세요 :
            </p>
            <div className="flex items-center gap-4 text-[var(--gray-600)]">
              <span className="inline-flex items-center gap-2 font-14-regular">
                <DeadlineIcon className="size-4" />
                2024년 3월 3일 마감
              </span>
              <span className="inline-flex items-center gap-2 font-14-regular">
                <PeopleIcon className="size-4" />
                5명
              </span>
            </div>
          </div>

          <div className="border-t border-[var(--gray-200)] pt-4">
            <div className="mb-3 font-16-bold text-[var(--gray-900)]">원문 링크</div>
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative mx-auto w-full max-w-[890px]">
                <button
                  type="button"
                  onClick={() => router.push("/wip")}
                  className="absolute right-4 top-4 z-10 inline-flex h-8 w-24 items-center justify-center gap-0.5 whitespace-nowrap rounded-[10px] bg-[var(--gray-100)]/80 px-1.5 text-[14px] font-bold leading-[26px] tracking-[0.28px] text-[var(--gray-700)] hover:bg-[var(--gray-200)]/80"
                >
                  링크 열기
                  <ArrowClickIcon className="size-[14px] shrink-0" />
                </button>
                <RejectSampleImage className="block h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
