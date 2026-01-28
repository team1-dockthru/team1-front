import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.number(),
  content: z.string(),
  date: z.string(),
});

export const notificationsSchema = z.array(notificationSchema);

export const challengeTagSchema = z.object({
  text: z.string(),
  variant: z.string(),
});

export const challengeShowSchema = z.object({
  id: z.number(),
  title: z.string(),
  tags: z.array(challengeTagSchema),
  deadline: z.string(),
  participants: z.string(),
  statusText: z.string().optional(),
  isClosed: z.boolean().optional(),
});

export const challengesShowSchema = z.array(challengeShowSchema);

export const challengeMySchema = z.object({
  id: z.number(),
  tab: z.enum(['participating', 'completed', 'applied']),
  title: z.string(),
  tags: z.array(challengeTagSchema),
  deadline: z.string(),
  participants: z.string(),
  statusText: z.string().optional(),
  isClosed: z.boolean().optional(),
});

export const challengeAppliedSchema = z.object({
  id: z.number(),
  docType: z.string(),
  category: z.string(),
  title: z.string(),
  capacity: z.number(),
  appliedAt: z.string(),
  deadline: z.string(),
  status: z.enum(['승인 대기', '신청 거절', '신청 승인', '챌린지 삭제']),
});

export const challengesMySchema = z.object({
  participating: z.array(challengeMySchema),
  completed: z.array(challengeMySchema),
  applied: z.array(challengeAppliedSchema),
});

export const adminChallengeSchema = z.object({
  id: z.number(),
  field: z.string(),
  category: z.string(),
  title: z.string(),
  quota: z.number(),
  applicationDate: z.string(),
  deadline: z.string(),
  status: z.enum(['pending', 'approved', 'rejected', 'deleted']),
});

export const adminChallengesSchema = z.object({
  challenges: z.array(adminChallengeSchema),
  sortOptions: z.array(z.string()),
});

export const challengePendingSchema = z.object({
  challenge: z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(),
    docType: z.string(),
    description: z.string(),
    deadline: z.string(),
    participants: z.number(),
    sourceLink: z.string(),
  }),
});

export const challengeNewFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  link: z.string().url('올바른 URL을 입력해주세요'),
  field: z.string().min(1, '분야를 선택해주세요'),
  docType: z.string().min(1, '문서 타입을 선택해주세요'),
  deadline: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{2}$|^\d{4}-\d{2}-\d{2}$/, 'YY/MM/DD 또는 YYYY-MM-DD 형식으로 입력해주세요'),
  participants: z.string().regex(/^\d+$/, '숫자만 입력해주세요').transform(Number),
  content: z.string().min(1, '내용을 입력해주세요'),
});

