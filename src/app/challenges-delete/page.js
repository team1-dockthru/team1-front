import { redirect } from "next/navigation";

export default function ChallengesDeleteRedirect({ searchParams }) {
  const id = searchParams?.id || "0";
  redirect(`/challenges-status/deleted/${id}`);
}
