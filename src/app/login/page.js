"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import GoogleIcon from "@/assets/icons/ic-google.svg";
import Logo from "@/assets/icons/ic-logo.svg";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import Container from "@/components/common/Container/Container";
import { login } from "@/services/user";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 양식이 아닙니다"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(20, "비밀번호는 최대 20자 이하이어야 합니다")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "특수문자를 최소 1개 이상 포함해야 합니다"
    ),
});

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const result = await login(data);
      const token = result?.data?.token;
      if (token) {
        setToken(token);
      }
      router.push("/");
    } catch (error) {
      setSubmitError(error.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--gray-50)] max-md:pt-[84.5px] md:justify-center">
      <Container className="flex flex-col items-center">
        <main className="flex w-full max-w-full flex-col items-center md:max-w-[518px]">
          {/* Logo */}
          <Link href="/" className="mb-[40px] inline-flex items-center gap-3 md:mb-[60px]">
            <Logo className="h-[40.5px] w-[35.1px] md:h-[54px] md:w-[46.8px]" />
            <span className="font-logo text-[43.2px] leading-none tracking-normal text-[var(--gray-700)] md:text-[57.6px]">
              Docthru
            </span>
          </Link>

          {/* Login Form */}
          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="이메일"
              placeholder="이메일을 입력해주세요"
              errorText={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              errorText={errors.password?.message}
              {...register("password")}
            />
            {submitError ? (
              <p className="text-sm text-[var(--error)]">{submitError}</p>
            ) : null}
            <div>
              <Button fullWidth size="lg" type="submit">
                로그인
              </Button>
              {/* Google Login Button */}
              <Button
                variant="outline"
                fullWidth
                leftIcon={<GoogleIcon className="h-6 w-6" />}
                className="mt-6 border-gray-200"
                type="button"
              >
                Google로 시작하기
              </Button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--gray-600)]">
            <span>회원이 아니신가요?</span>
            <Link href="/signup" className="font-medium underline hover:text-[var(--gray-900)]">
              회원가입하기
            </Link>
          </div>
        </main>
      </Container>
    </div>
  );
}
