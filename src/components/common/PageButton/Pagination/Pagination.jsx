"use client";

import PageButton from "../PageButton";

import {
  Pagination as UiPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i += 1) arr.push(i);
  return arr;
}

// 화면에 보여줄 페이지 목록 만들기: [1, '...', 4,5,6, '...', 10] 같은 형태
function getPaginationItems(currentPage, totalPages, siblingCount = 1) {
  if (totalPages <= 1) return [1];

  const totalNumbersToShow = siblingCount * 2 + 5; // 처음,끝,현재 주변 + ... 2개
  if (totalPages <= totalNumbersToShow) return range(1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + siblingCount * 2);
    return [...leftRange, '...', totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = range(totalPages - (3 + siblingCount * 2) + 1, totalPages);
    return [1, '...', ...rightRange];
  }

  // 양쪽 다 ... 필요한 경우
  const middleRange = range(leftSibling, rightSibling);
  return [1, '...', ...middleRange, '...', totalPages];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  disabled = false,
}) {
  const safeTotal = Math.max(1, totalPages || 1);
  const safeCurrent = clamp(currentPage || 1, 1, safeTotal);

  const items = getPaginationItems(safeCurrent, safeTotal, siblingCount);

  const canPrev = safeCurrent > 1 && !disabled;
  const canNext = safeCurrent < safeTotal && !disabled;

  const handlePage = (p) => {
    if (disabled) return;
    if (p === safeCurrent) return;
    onPageChange?.(p);
  };

  return (
    <UiPagination aria-label="페이지네이션">
      <PaginationPrevious
        disabled={!canPrev}
        onClick={() => handlePage(safeCurrent - 1)}
        className="font-14-semibold bg-[var(--gray-800)] text-[var(--gray-200)] disabled:opacity-50"
      />

      <PaginationContent>
        {items.map((item, idx) => {
          if (item === "...") {
            return (
              <PaginationItem key={`dots-${idx}`}>
                <PaginationEllipsis className="font-14-medium" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item}>
              <PageButton
                page={item}
                active={item === safeCurrent}
                onClick={() => handlePage(item)}
                disabled={disabled}
              />
            </PaginationItem>
          );
        })}
      </PaginationContent>

      <PaginationNext
        disabled={!canNext}
        onClick={() => handlePage(safeCurrent + 1)}
        className="font-14-semibold bg-[var(--gray-800)] text-[var(--gray-200)] disabled:opacity-50"
      />
    </UiPagination>
  );
}
