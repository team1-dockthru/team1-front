"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/ic-logo.svg";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center bg-[var(--gray-50)] px-4 max-md:pt-[84.5px] md:justify-center">
      <main className="flex w-full max-w-[343px] flex-col items-center md:max-w-[518px]">
        {/* Logo */}
        <Link href="/" className="mb-[40px] inline-flex items-center gap-3 md:mb-[60px]">
          <Logo className="h-[40.5px] w-[35.1px] md:h-[54px] md:w-[46.8px]" />
          <span className="font-logo text-[43.2px] leading-none tracking-normal text-[var(--gray-700)] md:text-[57.6px]">
            Docthru
          </span>
        </Link>

        {/* Signup Form */}
        <div className="flex w-full flex-col gap-6">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div>
            <Button fullWidth size="lg">
              회원가입
            </Button>
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--gray-600)]">
          <span>회원이신가요?</span>
          <Link href="/login" className="font-medium underline hover:text-[var(--gray-900)]">
            로그인하기
          </Link>
        </div>
      </main>
    </div>
  );
}
