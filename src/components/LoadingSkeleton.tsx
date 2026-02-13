export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-4 bg-gray-800 rounded" />
              <div className="w-40 h-5 bg-gray-800 rounded" />
              <div className="w-20 h-5 bg-gray-800 rounded-full" />
            </div>
            <div className="flex gap-6">
              <div className="w-24 h-4 bg-gray-800 rounded" />
              <div className="w-24 h-4 bg-gray-800 rounded" />
            </div>
          </div>
          <div className="border-t border-gray-800">
            {[1, 2, 3].map(j => (
              <div key={j} className="px-5 py-3 border-t border-gray-800/50 flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="w-32 h-4 bg-gray-800 rounded" />
                  <div className="w-20 h-3 bg-gray-800 rounded" />
                </div>
                <div className="w-16 h-4 bg-gray-800 rounded" />
                <div className="w-14 h-4 bg-gray-800 rounded" />
                <div className="w-20 h-4 bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
