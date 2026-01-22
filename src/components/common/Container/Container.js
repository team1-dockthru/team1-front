import { cn } from "@/lib/utils";

/**
 * 프로젝트 전반에서 사용되는 공통 컨테이너 컴포넌트입니다.
 * 기기별(Mobile, Tablet, PC)로 정의된 가로 폭을 유지하며 중앙에 정렬됩니다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 컨테이너 내부에 렌더링할 자식 요소
 * @param {string} [props.className] - 추가적인 CSS 클래스명
 */
export default function Container({ children, className }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[343px] md:max-w-[570px] lg:max-w-[990px]",
        className
      )}
    >
      {children}
    </div>
  );
}
