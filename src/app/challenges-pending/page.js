import { redirect } from "next/navigation";

export default function ChallengesPendingRedirect({ searchParams }) {
  const id = searchParams?.id || "0";
  redirect(`/challenges-status/pending/${id}`);
}
