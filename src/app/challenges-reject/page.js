import { redirect } from "next/navigation";

export default function ChallengesRejectRedirect({ searchParams }) {
  const id = searchParams?.id || "0";
  redirect(`/challenges-status/rejected/${id}`);
}
