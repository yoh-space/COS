export default function SectionLoader() {
  return (
    <div className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="animate-pulse space-y-8">
          <div className="flex justify-center">
            <div className="h-8 w-48 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-white dark:bg-gray-dark shadow-one p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
