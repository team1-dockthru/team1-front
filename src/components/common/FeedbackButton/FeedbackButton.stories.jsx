'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import FeedbackButton from './FeedbackButton';

export default {
  title: 'Atom/FeedbackButton',
  component: FeedbackButton,
};

export function Gray() {
  return (
    <FeedbackButton variant="gray" ariaLabel="좋아요" onClick={() => {}}>
      <ThumbsUp className="h-6 w-6 text-[var(--gray-700)]" />
    </FeedbackButton>
  );
}

export function Dark() {
  return (
    <FeedbackButton variant="dark" ariaLabel="싫어요" onClick={() => {}}>
      <ThumbsDown className="h-6 w-6 text-white" />
    </FeedbackButton>
  );
}

