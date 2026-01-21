"use client";

import { useState } from "react";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import Input from "@/components/common/Input/Input";
import CategoryDropdown from "@/components/common/CategoryDropdown/CategoryDropdown";
import TextBox from "@/components/common/TextBox/TextBox";
import Button from "@/components/common/Button/Button";
import CalendarIcon from "@/assets/icons/ic-deadline-date.svg";

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

const FIELD_OPTIONS = ["Career", "Modern JS", "Web", "Next.js", "API"];
const DOC_TYPE_OPTIONS = ["공식문서", "블로그", "레퍼런스", "아티클"];

export default function ChallengeApplyPage() {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    field: "",
    docType: "",
    deadline: "",
    participants: "",
    content: "",
  });

  const handleInputChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Challenge apply:", formData);
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={MOCK_NOTIFICATIONS} />
      <Container className="py-10 md:py-[60px]">
        <div className="mx-auto flex w-full max-w-[570px] flex-col gap-6">
          <h1 className="font-24-bold text-[var(--gray-900)]">신규 챌린지 신청</h1>

          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              label="제목"
              placeholder="제목을 입력해주세요"
              value={formData.title}
              onChange={handleInputChange("title")}
            />

            <Input
              label="원문 링크"
              placeholder="원문 링크를 입력해주세요"
              value={formData.link}
              onChange={handleInputChange("link")}
            />

            <div className="flex flex-col gap-2">
              <span className="font-14-medium text-[var(--gray-800)]">분야</span>
              <CategoryDropdown
                options={FIELD_OPTIONS}
                value={formData.field}
                onChange={(value) => setFormData((prev) => ({ ...prev, field: value }))}
                placeholder="카테고리"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-14-medium text-[var(--gray-800)]">문서 타입</span>
              <CategoryDropdown
                options={DOC_TYPE_OPTIONS}
                value={formData.docType}
                onChange={(value) => setFormData((prev) => ({ ...prev, docType: value }))}
                placeholder="카테고리"
              />
            </div>

            <Input
              label="마감일"
              placeholder="YY/MM/DD"
              value={formData.deadline}
              onChange={handleInputChange("deadline")}
              rightIcon={<CalendarIcon width={32} height={32} />}
            />

            <Input
              label="최대 인원"
              placeholder="인원을 입력해주세요"
              value={formData.participants}
              onChange={handleInputChange("participants")}
            />

            <div className="flex flex-col gap-2">
              <span className="font-14-medium text-[var(--gray-800)]">내용</span>
              <TextBox
                placeholder="내용을 입력해주세요"
                rows={6}
                value={formData.content}
                onChange={handleInputChange("content")}
              />
            </div>

            <Button fullWidth size="lg" type="submit" className="font-16-semibold">
              신청하기
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
