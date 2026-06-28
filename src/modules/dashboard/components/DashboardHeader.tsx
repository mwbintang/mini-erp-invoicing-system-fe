export function DashboardHeader() {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-base text-gray-500">
          Monitor your business metrics at a glance.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Placeholder for future actions like date picker or export */}
      </div>
    </div>
  );
}
