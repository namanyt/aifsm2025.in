import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Committee - AIFSM 2025",
  description: "Committee of AIFSM 2025 - All India Forest Sports Meet 2025",
};

export default function CommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
