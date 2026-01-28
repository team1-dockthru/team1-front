'use client';

import Button from '@/components/common/Button/Button';

export default function AdminDecisionActions({
  onApprove,
  onReject,
  isSubmitting = false,
}) {
  return (
    <div className="mt-8 flex items-center justify-end gap-3">
      <Button
        variant="filled-tonal"
        size="lg"
        disabled={isSubmitting}
        onClick={onReject}
        className="min-w-[120px]"
      >
        거절하기
      </Button>
      <Button
        variant="solid"
        size="lg"
        disabled={isSubmitting}
        onClick={onApprove}
        className="min-w-[120px]"
      >
        승인하기
      </Button>
    </div>
  );
}
