import Image from "next/image";

export function WorkInProgress() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
      <div className="rounded-2xl px-10 py-12 flex flex-col items-center gap-6">
        <Image src="/ui/wip.svg" alt="Work in Progress" width={695 * 0.7} height={427 * 0.7} />
        <h1 className="text-4xl font-bold text-sky-800 mb-2">The Games Are Coming!</h1>
        <p className="text-lg text-sky-900 text-center max-w-md">
          The stage is being set, the teams are preparing,
          <br />
          and the energy is building up. It’s your time to shine!
        </p>
      </div>
    </div>
  );
}
