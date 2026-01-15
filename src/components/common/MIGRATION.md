# Common components -> shadcn/ui migration notes

이 문서는 `src/components/common` 공통 컴포넌트들을 Tailwind + shadcn/ui 기반으로 정리할 때의 매핑/규칙을 기록합니다.

## 원칙

- `common/*` 컴포넌트는 **UI 프리미티브(`src/components/ui/*`)를 감싸는 얇은 래퍼**로 유지합니다.
- 기존 per-component `.css`는 제거하고 Tailwind class + `cva` + `cn()`으로 스타일을 표현합니다.
- 컬러 토큰은 현재 프로젝트의 CSS 변수(`--gray-*`, `--brand-yellow`, `--error`)를 유지하기 위해 Tailwind의 arbitrary value (`bg-[var(--gray-900)]`)를 사용합니다.

## 매핑

- `common/Button/Button.jsx` -> `ui/button.jsx`
- `common/Input/Input.jsx` -> `ui/input.jsx` (+ 아이콘/에러 래핑은 common에서 처리)
- `common/Chip/Chip.jsx` -> `ui/badge.jsx` (기존 variant 이름을 그대로 유지)
- `common/PageButton/*` -> `ui/pagination.jsx` + `ui/button.jsx` 기반으로 정리
- `common/Checkbox/Checkbox.jsx`, `common/Radio/Radio.jsx` -> Radix 도입 전까지는 native input + Tailwind로 스타일링

