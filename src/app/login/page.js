"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--gray-50)] px-4">
      <main className="flex w-full max-w-[375px] flex-col items-center">
        {/* Logo */}
        <div className="mb-10 inline-flex items-center gap-2">
          <Logo className="h-[36px] w-[36px]" />
          <span className="font-logo text-[40px] leading-none tracking-normal text-[var(--gray-700)]">Docthru</span>
        </div>

        {/* Login Form */}
        <div className="w-full space-y-6">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-2">
            <Button fullWidth size="lg">
              로그인
            </Button>
          </div>
        </div>

        {/* Signup Link */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--gray-600)]">
          <span>회원이 아니신가요?</span>
          <Link href="/signup" className="font-medium underline hover:text-[var(--gray-900)]">
            회원가입하기
          </Link>
        </div>
      </main>
    </div>
  );
}
