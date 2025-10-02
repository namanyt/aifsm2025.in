import { WorkInProgress } from "@/components/work_in_progress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Schedule of AIFSM 2025 - All India Forest Sports Meet 2025",
};

export default function SchedulePage() {
  return <WorkInProgress />;
}
