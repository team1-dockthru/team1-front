"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import Popup from "@/components/common/Popup/Popup";
import RejectSampleImage from "@/assets/images/img_reject_sample_1.svg";
import DeadlineIcon from "@/assets/icons/ic-deadline-s.svg";
import PeopleIcon from "@/assets/icons/ic-person-s-yellow.svg";
import ArrowClickIcon from "@/assets/icons/ic-arrow-click.svg";
import CheckIcon from "@/assets/icons/ic-check-round.svg";

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

export default function ChallengePendingPage() {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={MOCK_NOTIFICATIONS} />
      <Container className="py-10 md:py-[60px]">
        <div className="flex flex-col gap-6">
          <div className="rounded-full bg-[#fff8dc] px-6 pt-[8px] pb-[8px] text-center font-14-semibold text-[#f0b400]">
            승인 대기 중입니다.
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-20-bold text-[var(--gray-900)]">
                Next.js - App Router : Routing Fundamentals
              </h1>
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(true)}
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-xl border border-[var(--gray-300)] bg-white px-6 font-14-regular text-[var(--gray-700)] hover:border-[var(--gray-400)]"
              >
                취소하기
              </button>
            </div>

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
              있을 것 같아요. 다들 챌린지 많이 참여해 주세요 :)
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

      <Popup
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => setIsCancelModalOpen(false)}
        message="정말 취소하시겠어요?"
        buttonText="네"
        cancelText="아니오"
        onCancel={() => setIsCancelModalOpen(false)}
        icon={CheckIcon}
        forceMobile
      />
    </div>
  );
}
