export function WorkInProgress() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-r from-sky-700 to-cyan-600 py-20">
      <div className="bg-white/90 rounded-2xl shadow-lg px-10 py-12 flex flex-col items-center gap-6 border border-blue-200">
        <svg width="80" height="80" fill="none" viewBox="0 0 24 24" className="mb-2">
          <circle cx="12" cy="12" r="10" fill="#38bdf8" />
          <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h1 className="text-4xl font-bold text-sky-800 mb-2">Work in Progress</h1>
        <p className="text-lg text-sky-900 text-center max-w-md">
          This page is currently under construction.
          <br />
          Please check back soon for updates!
        </p>
      </div>
    </div>
  );
}
