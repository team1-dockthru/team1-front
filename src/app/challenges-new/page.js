"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import Input from "@/components/common/Input/Input";
import CategoryDropdown from "@/components/common/CategoryDropdown/CategoryDropdown";
import TextBox from "@/components/common/TextBox/TextBox";
import Button from "@/components/common/Button/Button";
import challengesNewData from "@/data/challenges-new.json";
import notificationsData from "@/data/notifications.json";
import { notificationsSchema } from "@/schemas/challengeSchemas";
import { challengeNewFormSchema } from "@/schemas/challengeSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createChallengeRequest } from "@/services/challenge";
import { getCurrentUser } from "@/services/user/apiUserService";
import { toast } from "@/hooks/use-toast";
import CalendarIcon from "@/assets/icons/ic-deadline-date.svg";

const FIELD_OPTIONS = challengesNewData.fieldOptions;
const DOC_TYPE_OPTIONS = challengesNewData.docTypeOptions;

export default function ChallengeApplyPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const validatedNotifications = useMemo(() => {
    try {
      return notificationsSchema.parse(notificationsData);
    } catch {
      return notificationsData;
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(challengeNewFormSchema),
  });

  const formData = watch();

  const mapDocTypeToApi = (value) => {
    const map = {
      공식문서: "OFFICIAL_DOCUMENT",
      블로그: "BLOG",
      레퍼런스: "REFERENCE",
      아티클: "ARTICLE",
    };
    return map[value] || value;
  };

  const mapFieldToApi = (value) => {
    const map = {
      Career: "커리어",
      "Modern JS": "모던JS",
      Web: "프론트엔드",
      "Next.js": "Next.js",
      API: "API",
    };
    return map[value] || value;
  };

  const formatDeadlineToIso = (value) => {
    if (!value) return null;
    if (value.includes("-")) {
      const [year, month, day] = value.split("-").map(Number);
      if (!year || !month || !day) return null;
      return new Date(year, month - 1, day, 23, 59, 59, 999).toISOString();
    }
    if (value.includes("/")) {
      const [yy, mm, dd] = value.split("/").map(Number);
      if (!yy || !mm || !dd) return null;
      const year = yy + 2000;
      return new Date(year, mm - 1, dd, 23, 59, 59, 999).toISOString();
    }
    return null;
  };

  if (!mounted) {
    return null;
  }

  const handleFormSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userResponse = await getCurrentUser();
      const userId = userResponse?.user?.id;

      const deadlineAt = formatDeadlineToIso(data.deadline);
      if (!deadlineAt) {
        throw new Error("마감일 형식이 올바르지 않습니다.");
      }

      const payload = {
        userId,
        title: data.title,
        sourceUrl: data.link,
        field: mapFieldToApi(data.field),
        docType: mapDocTypeToApi(data.docType),
        deadlineAt,
        maxParticipants: data.participants,
        content: data.content,
      };
      await createChallengeRequest(payload);
      toast({
        title: "신청 완료",
        description: "챌린지 신청이 접수되었습니다.",
      });
      router.push("/challenges-my");
    } catch (error) {
      toast({
        title: "신청 실패",
        description: error.message || "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={validatedNotifications} />
      <Container className="py-10 md:py-[60px]">
        <div className="mx-auto flex w-full max-w-[570px] flex-col gap-6">
          <h1 className="font-24-bold text-[var(--gray-900)]">신규 챌린지 신청</h1>

          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <Input
              label="제목"
              placeholder="제목을 입력해주세요"
              value={formData.title || ""}
              onChange={(e) => setValue("title", e.target.value)}
              errorText={errors.title?.message}
            />

            <Input
              label="원문 링크"
              placeholder="원문 링크를 입력해주세요"
              value={formData.link || ""}
              onChange={(e) => setValue("link", e.target.value)}
              errorText={errors.link?.message}
            />

            <div className="flex flex-col gap-2">
              <span className="font-14-medium text-[var(--gray-800)]">분야</span>
              <CategoryDropdown
                options={FIELD_OPTIONS}
                value={formData.field || ""}
                onChange={(value) => setValue("field", value)}
                placeholder="카테고리"
              />
              {errors.field && (
                <span className="text-sm text-red-500">{errors.field.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-14-medium text-[var(--gray-800)]">문서 타입</span>
              <CategoryDropdown
                options={DOC_TYPE_OPTIONS}
                value={formData.docType || ""}
                onChange={(value) => setValue("docType", value)}
                placeholder="카테고리"
              />
              {errors.docType && (
                <span className="text-sm text-red-500">{errors.docType.message}</span>
              )}
            </div>

            <Input
              label="마감일"
              type="date"
              rightIconLabel="날짜 선택"
              value={formData.deadline || ""}
              onChange={(e) => setValue("deadline", e.target.value)}
              rightIcon={<CalendarIcon className="size-8" />}
              errorText={errors.deadline?.message}
            />

            <Input
              label="최대 인원"
              placeholder="인원을 입력해주세요"
              value={formData.participants || ""}
              onChange={(e) => setValue("participants", e.target.value)}
              errorText={errors.participants?.message}
            />

            <div className="flex flex-col gap-2">
              <span className="font-14-medium text-[var(--gray-800)]">내용</span>
              <TextBox
                placeholder="내용을 입력해주세요"
                rows={6}
                value={formData.content || ""}
                onChange={(e) => setValue("content", e.target.value)}
              />
              {errors.content && (
                <span className="text-sm text-red-500">{errors.content.message}</span>
              )}
            </div>

            <Button
              fullWidth
              size="lg"
              type="submit"
              className="font-16-semibold"
              disabled={isSubmitting}
            >
              신청하기
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
