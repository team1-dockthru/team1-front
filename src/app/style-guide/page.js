"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Gnb from "@/components/common/GNB/Gnb";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

// 이 페이지로의 직접 접근을 차단하고 메인 페이지로 리다이렉트
const BLOCK_ACCESS = true;

const COLORS = [
  {
    category: "Gray Scale",
    items: [
      { name: "gray900", variable: "--gray-900", hex: "#171717" },
      { name: "gray800", variable: "--gray-800", hex: "#262626" },
      { name: "gray700", variable: "--gray-700", hex: "#404040" },
      { name: "gray600", variable: "--gray-600", hex: "#525252" },
      { name: "gray500", variable: "--gray-500", hex: "#737373" },
      { name: "gray400", variable: "--gray-400", hex: "#A3A3A3" },
      { name: "gray300", variable: "--gray-300", hex: "#D4D4D4" },
      { name: "gray200", variable: "--gray-200", hex: "#E5E5E5" },
      { name: "gray100", variable: "--gray-100", hex: "#E8EBED" },
      { name: "gray50", variable: "--gray-50", hex: "#FAFAFA" },
    ],
  },
  {
    category: "Brand",
    items: [
      { name: "brand-black", variable: "--brand-black", hex: "#262626" },
      { name: "brand-yellow", variable: "--brand-yellow", hex: "#FFC117" },
      { name: "brand-light", variable: "--brand-light", hex: "#F1F2F5" },
    ],
  },
  {
    category: "Semantic",
    items: [{ name: "error", variable: "--error", hex: "#EB3E3E" }],
  },
];

const TYPOGRAPHY = [
  { size: 24, weights: ["bold", "semibold"] },
  { size: 22, weights: ["bold", "semibold"] },
  { size: 20, weights: ["bold", "semibold", "medium"] },
  { size: 18, weights: ["bold", "semibold", "medium", "regular"] },
  { size: 16, weights: ["bold", "semibold", "medium", "regular"] },
  { size: 14, weights: ["bold", "semibold", "medium", "regular"] },
  { size: 13, weights: ["bold", "semibold", "medium", "regular"] },
  { size: 12, weights: ["bold", "medium", "regular"] },
];

export default function StyleGuidePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  useEffect(() => {
    if (BLOCK_ACCESS) {
      router.replace("/");
      return;
    }
    setMounted(true);
  }, [router]);

  if (BLOCK_ACCESS || !mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb isLoggedIn={false} />
      <div className="container mx-auto px-4 py-10">
        <h1 className="mb-10 text-3xl font-bold">Style Guide</h1>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left Column: Colors (Fixed width on large screens) */}
          <section className="w-full lg:w-1/3">
            <h2 className="mb-6 text-2xl font-bold text-[var(--gray-900)]">Colors</h2>
            <div className="flex flex-col gap-6">
              {COLORS.map((group) => (
                <div key={group.category} className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold">{group.category}</h3>
                  <div className="flex flex-col gap-2">
                    {group.items.map((color) => (
                      <div
                        key={color.name}
                        className="flex items-center justify-between rounded-md p-3 transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: `var(${color.variable})` }}
                      >
                        <span
                          className={cn(
                            "font-mono text-sm font-medium",
                            ["gray900", "gray800", "gray700", "brand-black", "error"].includes(color.name)
                              ? "text-white"
                              : "text-[var(--gray-900)]"
                          )}
                        >
                          {color.hex}
                        </span>
                        <span
                          className={cn(
                            "text-sm",
                            ["gray900", "gray800", "gray700", "brand-black", "error"].includes(color.name)
                              ? "text-white/80"
                              : "text-[var(--gray-500)]"
                          )}
                        >
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column: Components */}
          <div className="flex w-full flex-col gap-20 lg:w-2/3">
            
            {/* Components Section */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-[var(--gray-900)]">Components</h2>
              
              {/* Buttons */}
              <div className="mb-10 rounded-xl border bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold">Buttons</h3>
                <div className="space-y-6">
                  {/* Solids */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg">Large Solid</Button>
                    <Button size="md">Medium Solid</Button>
                    <Button size="sm">Small Solid</Button>
                  </div>
                  {/* Outlines */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="outline" size="lg">Large Outline</Button>
                    <Button variant="outline" size="md">Medium Outline</Button>
                    <Button variant="outline" size="sm">Small Outline</Button>
                  </div>
                  {/* Ghost */}
                   <div className="flex flex-wrap items-center gap-4">
                    <Button variant="ghost" size="lg">Large Ghost</Button>
                    <Button variant="ghost" size="md">Medium Ghost</Button>
                    <Button variant="ghost" size="sm">Small Ghost</Button>
                  </div>
                  {/* States */}
                  <div className="flex flex-wrap items-center gap-4 border-t pt-6">
                    <Button disabled>Disabled</Button>
                     <Button isLoading>Loading</Button>
                    <Button fullWidth>Full Width Button</Button>
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold">Inputs</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Default Input"
                    placeholder="Placeholder text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    label="Password Input"
                    type="password"
                    placeholder="Enter password"
                  />
                  <Input
                    label="Error State"
                    placeholder="Error input"
                    errorText="This field has an error"
                  />
                  <Input
                    label="Read Only"
                    value="Read only value"
                    readOnly
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <hr className="my-20 border-[var(--gray-200)]" />

        {/* Typography Section (Full Width, 2 Columns) */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-[var(--gray-900)]">Typography</h2>
          <div className="rounded-xl bg-[#333] p-8 text-white shadow-sm">
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
              {TYPOGRAPHY.map((typo) => (
                <div key={typo.size} className="space-y-4 border-b border-gray-700 pb-8 last:border-0 last:pb-0 md:border-b-0 md:pb-0">
                  {typo.weights.map((weight) => {
                    const className = `font-${typo.size}-${weight}`;
                    return (
                      <div key={className} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className={className}>
                            Pretendard / {weight.charAt(0).toUpperCase() + weight.slice(1)} / {typo.size}pt
                          </span>
                        </div>
                        <div className="flex gap-4 font-mono text-sm text-gray-400">
                          <span>{className}</span>
                          <span>{typo.size}px</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
