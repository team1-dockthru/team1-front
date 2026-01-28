"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import Popup from "@/components/common/Popup/Popup";
import RejectSampleImage from "@/assets/images/img_reject_sample_1.svg";
import DeadlineIcon from "@/assets/icons/ic-deadline-s.svg";
import PeopleIcon from "@/assets/icons/ic-person-s-yellow.svg";
import ArrowClickIcon from "@/assets/icons/ic-arrow-click.svg";
import CheckIcon from "@/assets/icons/ic-check-round.svg";
import { getChallengeRequestDetail, processChallengeRequest } from "@/services/challenge/apiChallengeService";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/services/user/apiUserService";
import RejectModal from "@/components/common/RejectModal/RejectModal";
import AdminDecisionActions from "@/components/admin/AdminDecisionActions";

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

const STATUS_CONFIG = {
  pending: {
    bannerText: "승인 대기 중입니다.",
    bannerClassName: "bg-[#fff8dc] text-[#f0b400]",
    showCancel: true,
  },
  rejected: {
    bannerText: "신청이 거절되었습니다.",
    bannerClassName: "bg-[#fff1f1] text-[var(--error)]",
    showReason: true,
    reasonTitle: "신청 거절 사유",
    reasonBody:
      "독스루는 개발 문서 번역 플랫폼으로, 다른 종류의 번역 챌린지를 개최할 수 없음을 알려드립니다. 감사합니다.",
    reasonMeta: "독스루 운영진 | 24/02/24 16:38",
  },
  approved: {
    bannerText: "신청이 승인되었습니다.",
    bannerClassName: "bg-[#dff0ff] text-[#2f80ed]",
  },
  deleted: {
    bannerText: "삭제된 챌린지입니다.",
    bannerClassName: "bg-[#6b6b6b] text-white",
    showReason: true,
    reasonTitle: "삭제 사유",
    reasonBody:
      "독스루는 개발 문서 번역 플랫폼으로, 폭력성과 관련된 내용을 포함할 수 없음을 안내드립니다. 감사합니다.",
    reasonMeta: "독스루 운영진 | 24/02/24 16:38",
  },
};

const MOCK_CHALLENGE_DETAIL = {
  title: "Next.js - App Router : Routing Fundamentals",
  description:
    "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등을 공부할 수 있을 것 같아요. 다들 챌린지 많이 참여해 주세요 :)",
  deadline: "2024년 3월 3일 마감",
  participants: "5명",
  sourceUrl: "",
  tags: [
    { text: "Next.js", className: "bg-[#79e16a] text-[var(--gray-900)]" },
    { text: "공식문서", className: "border border-[var(--gray-300)] bg-white text-[var(--gray-800)]" },
  ],
};

const DOC_TYPE_LABEL_MAP = {
  OFFICIAL_DOCUMENT: "공식문서",
  BLOG: "블로그",
  REFERENCE: "레퍼런스",
  ARTICLE: "아티클",
};

const FIELD_CLASS_MAP = {
  "프론트엔드": "bg-[#fae444] text-[var(--gray-900)]",
  "백엔드": "bg-[#ff905e] text-[var(--gray-900)]",
  "커리어": "bg-[#7eb2ee] text-[var(--gray-900)]",
  "Next.js": "bg-[#79e16a] text-[var(--gray-900)]",
  "API": "bg-[#ff905e] text-[var(--gray-900)]",
  "Modern JS": "bg-[#f66e6b] text-[var(--gray-900)]",
  "Modern.js": "bg-[#f66e6b] text-[var(--gray-900)]",
  "Web": "bg-[#fae444] text-[var(--gray-900)]",
};

const DOC_TYPE_CLASS_MAP = {
  OFFICIAL_DOCUMENT: "border border-[var(--gray-300)] bg-white text-[var(--gray-800)]",
  BLOG: "border border-[var(--gray-300)] bg-white text-[var(--gray-800)]",
  REFERENCE: "border border-[var(--gray-300)] bg-white text-[var(--gray-800)]",
  ARTICLE: "border border-[var(--gray-300)] bg-white text-[var(--gray-800)]",
};

const formatDeadline = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일 마감`;
};

const normalizeSourceUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^www\./i.test(url)) return `https://${url}`;
  return "";
};

export default function ChallengeStatusPage({ params }) {
  const router = useRouter();
  const { status, challengeId } = use(params);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [challengeDetail, setChallengeDetail] = useState(MOCK_CHALLENGE_DETAIL);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isAdmin =
    String(currentUser?.role || "").toLowerCase() === "admin" ||
    currentUser?.role === "ADMIN";

  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;

  useEffect(() => {
    let isActive = true;
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (!isActive) return;
        setCurrentUser(response?.user || null);
      } catch {
        if (!isActive) return;
        setCurrentUser(null);
      }
    };
    fetchUser();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchDetail = async () => {
      try {
        const data = await getChallengeRequestDetail(challengeId);
        if (!isActive || !data) return;

        const fieldText = data.field || "";
        const docTypeText = DOC_TYPE_LABEL_MAP[data.docType] || data.docType || "";
        const rawSourceUrl =
          data.sourceUrl ||
          data.sourceURL ||
          data.source_url ||
          data.link ||
          data.sourceLink ||
          data.originUrl ||
          "";

        setChallengeDetail({
          title: data.title || MOCK_CHALLENGE_DETAIL.title,
          description: data.content || "",
          deadline: formatDeadline(data.deadlineAt),
          participants: data.maxParticipants ? `${data.maxParticipants}명` : "",
          sourceUrl: normalizeSourceUrl(rawSourceUrl),
          tags: [
            {
              text: fieldText,
              className: FIELD_CLASS_MAP[fieldText] || "bg-[#fae444] text-[var(--gray-900)]",
            },
            {
              text: docTypeText,
              className:
                DOC_TYPE_CLASS_MAP[data.docType] ||
                "border border-[var(--gray-300)] bg-white text-[var(--gray-800)]",
            },
          ],
        });
      } catch {
        if (!isActive) return;
        setChallengeDetail(MOCK_CHALLENGE_DETAIL);
      }
    };

    if (challengeId) {
      fetchDetail();
    }

    return () => {
      isActive = false;
    };
  }, [challengeId]);

  const handleApprove = async () => {
    if (!challengeId || isProcessing) return;
    setIsProcessing(true);
    try {
      await processChallengeRequest(challengeId, { status: "APPROVED" });
      setCurrentStatus("approved");
      toast({
        title: "승인 완료",
        description: "챌린지 신청이 승인되었습니다.",
      });
    } catch (error) {
      toast({
        title: "승인 실패",
        description: error.message || "승인에 실패했습니다.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (reason) => {
    if (!challengeId || isProcessing) return;
    setIsProcessing(true);
    try {
      await processChallengeRequest(challengeId, { status: "REJECTED", reason });
      setCurrentStatus("rejected");
      toast({
        title: "거절 완료",
        description: "챌린지 신청이 거절되었습니다.",
      });
      setIsProcessModalOpen(false);
    } catch (error) {
      toast({
        title: "거절 실패",
        description: error.message || "거절에 실패했습니다.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenSource = () => {
    if (!challengeDetail.sourceUrl) {
      toast({
        title: "원문 링크 없음",
        description: "등록된 원문 링크가 없습니다.",
      });
      return;
    }
    window.open(challengeDetail.sourceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb
        notifications={MOCK_NOTIFICATIONS}
        useUserDropdown
        user={
          currentUser
            ? { name: currentUser.nickname || currentUser.name || "사용자", role: "일반" }
            : { name: "사용자", role: "일반" }
        }
        onMyChallenge={() => router.push("/challenges-my")}
      />
      <Container className="py-10 md:py-[60px]">
        <div className="flex flex-col gap-6">
          <div className={`rounded-full px-6 pt-[8px] pb-[8px] text-center font-14-semibold ${config.bannerClassName}`}>
            {config.bannerText}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-20-bold text-[var(--gray-900)]">
                {challengeDetail.title}
              </h1>
              {config.showCancel ? (
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(true)}
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-xl border border-[var(--gray-300)] bg-white px-6 font-14-regular text-[var(--gray-700)] hover:border-[var(--gray-400)]"
                >
                  취소하기
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {challengeDetail.tags.map((tag) => (
                <span
                  key={tag.text}
                  className={`rounded-[8px] px-3 py-[3px] text-[13px] font-13-semibold ${tag.className}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
            <p className="font-16-regular-160 text-[var(--gray-700)]">
              {challengeDetail.description}
            </p>
            <div className="flex items-center gap-4 text-[var(--gray-600)]">
              <span className="inline-flex items-center gap-2 font-14-regular">
                <DeadlineIcon className="size-4" />
                {challengeDetail.deadline}
              </span>
              <span className="inline-flex items-center gap-2 font-14-regular">
                <PeopleIcon className="size-4" />
                {challengeDetail.participants}
              </span>
            </div>
          </div>

          <div className="border-t border-[var(--gray-200)] pt-4">
            <div className="mb-3 font-16-bold text-[var(--gray-900)]">원문 링크</div>
            <div className="overflow-hidden bg-black">
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={handleOpenSource}
                  disabled={!challengeDetail.sourceUrl}
                  className="absolute right-4 top-4 z-10 inline-flex h-8 w-24 items-center justify-center gap-0.5 whitespace-nowrap rounded-[10px] bg-[var(--gray-100)]/80 px-1.5 text-[14px] font-bold leading-[26px] tracking-[0.28px] text-[var(--gray-700)] hover:bg-[var(--gray-200)]/80"
                >
                  링크 열기
                  <ArrowClickIcon className="size-[14px] shrink-0" />
                </button>
                <RejectSampleImage
                  className="block h-auto w-full max-w-none"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="mt-4 border-t border-[var(--gray-200)]" />
          </div>

          {config.showReason ? (
            <div className="rounded-2xl border border-[var(--gray-200)] bg-white p-6">
              <div className="mb-2 font-16-semibold text-[var(--gray-900)]">
                {config.reasonTitle}
              </div>
              <p className="font-14-regular text-[var(--gray-700)]">
                {config.reasonBody}
              </p>
              <p className="mt-3 font-12-regular text-[var(--gray-500)]">
                {config.reasonMeta}
              </p>
            </div>
          ) : null}

          {isAdmin && currentStatus === "pending" ? (
            <AdminDecisionActions
              onReject={() => setIsProcessModalOpen(true)}
              onApprove={handleApprove}
              isSubmitting={isProcessing}
            />
          ) : null}
        </div>
      </Container>

      <RejectModal
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        onSubmit={handleReject}
        title="거절 사유"
        placeholder="거절 사유를 입력해주세요"
        submitLabel="전송"
      />

      <Popup
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => setIsCancelModalOpen(false)}
        message={`정말 취소하시겠어요? (ID: ${challengeId})`}
        buttonText="네"
        cancelText="아니오"
        onCancel={() => setIsCancelModalOpen(false)}
        icon={CheckIcon}
        forceMobile
      />
    </div>
  );
}
