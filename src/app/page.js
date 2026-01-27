"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Gnb from "@/components/common/GNB/Gnb";
import Button from "@/components/common/Button/Button";
import Container from "@/components/common/Container/Container";
import { getCurrentUser } from "@/services/user";

import TrophyIcon from "@/assets/icons/ic-trophy.svg";
import HeartIcon from "@/assets/icons/ic-heart-inactive-l.svg";
import FeedbackIcon from "@/assets/icons/ic-landing-feedback.svg";

import LandingImage1 from "@/assets/images/img_landing_1.svg";
import LandingImage1Sm from "@/assets/images/img_landing_1_sm.svg";
import LandingImage2 from "@/assets/images/img_landing_2.svg";
import LandingImage2Sm from "@/assets/images/img_landing_2_sm.svg";
import LandingImage3 from "@/assets/images/img_landing_3.svg";
import LandingImage3Sm from "@/assets/images/img_landing_3_sm.svg";
import HeroBgLg from "@/assets/images/img_bg_lg.svg";
import HeroBgMd from "@/assets/images/img_bg_md.svg";
import HeroBgSm from "@/assets/images/img_bg_sm.svg";
import Logo from "@/assets/icons/ic-logo.svg";

export default function Home() {
  const [user, setUser] = useState({ isLoggedIn: false, role: "guest" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        setUser({ isLoggedIn: false, role: "guest" });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--gray-50)] text-[var(--gray-900)]">
      <Gnb
        isLoggedIn={user?.isLoggedIn || false}
        role={user?.role || "guest"}
        user={user?.user}
      />

      <main>
        <section className="relative overflow-hidden bg-[var(--gray-900)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <HeroBgSm className="h-full w-full object-cover md:hidden" />
            <HeroBgMd className="hidden h-full w-full object-cover md:block lg:hidden" />
            <HeroBgLg className="hidden h-full w-full object-cover lg:block" />
          </div>
          <Container className="relative flex flex-col items-center py-20 text-center text-white">
            <div className="inline-flex items-center gap-2">
              <Logo className="h-[20.25px] w-[17.55px]" />
              <span className="font-logo text-[22.68px]">Docthru</span>
            </div>
            <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              함께 번역하며 성장하는
              <br />
              개발자의 새로운 영어 습관
            </h1>
            <div className="mt-8">
              <Link href="/login">
                <Button variant="outline" size="lg">
                  번역 시작하기
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:gap-[64px]">
              <div className="max-w-xl text-left">
                <TrophyIcon className="h-6 w-6" />
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  혼자서는 막막했던 번역,
                  <br />
                  챌린지로 함께 완성하기
                </h2>
                <p className="mt-3 text-sm text-[var(--gray-500)] sm:text-base">
                  중요한 건 꺾이지 않는 마음! 동료들과 함께
                  <br />
                  기술 문서를 번역해 보세요.
                </p>
              </div>
              <div className="flex w-full justify-start lg:w-[570px]">
                <LandingImage1Sm className="block h-auto w-[343px] max-w-full m-0 lg:hidden" />
                <LandingImage1 className="hidden h-auto lg:block lg:w-[570px]" />
              </div>
            </div>
          </Container>
        </section>

        <div className="border-t border-dashed border-[var(--gray-200)]" />

        <section className="py-16">
          <Container>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:gap-[64px]">
              <div className="max-w-xl text-left">
                <HeartIcon className="h-6 w-6" />
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  내가 좋아하는 기술 번역,
                  <br />
                  내가 필요한 기술 번역
                </h2>
                <p className="mt-3 text-sm text-[var(--gray-500)] sm:text-base">
                  이미 진행 중인 번역 챌린지에 참여하거나,
                  <br />
                  새로운 번역 챌린지를 시작해 보세요.
                </p>
              </div>
              <div className="flex w-full justify-start lg:w-[570px]">
                <LandingImage2Sm className="block h-auto w-[343px] max-w-full m-0 lg:hidden" />
                <LandingImage2 className="hidden h-auto lg:block lg:w-[570px]" />
              </div>
            </div>
          </Container>
        </section>

        <div className="border-t border-dashed border-[var(--gray-200)]" />

        <section className="py-16">
          <Container>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:gap-[64px]">
              <div className="max-w-xl text-left">
                <FeedbackIcon className="h-[19px] w-5" />
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  피드백으로 함께 성장하기
                </h2>
                <p className="mt-3 text-sm text-[var(--gray-500)] sm:text-base">
                  번역 작업물에 대한 피드백을 주고 받으며
                  <br />
                  영어 실력은 물론, 개발 실력까지 키워 보세요
                </p>
              </div>
              <div className="flex w-full justify-start lg:w-[570px]">
                <LandingImage3Sm className="block h-auto w-[343px] max-w-full m-0 lg:hidden" />
                <LandingImage3 className="hidden h-auto lg:block lg:w-[570px]" />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16">
          <Container className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-[var(--gray-900)]">
              함께 번역하고 성장하세요!
            </h3>
            <Link href="/login">
              <Button className="mt-6" size="lg">
                번역 시작하기
              </Button>
            </Link>
          </Container>
        </section>
      </main>
    </div>
  );
}
