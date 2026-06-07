export default function LoadingState() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-1">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
        <p className="text-slate-400 text-sm tracking-wide">กำลังค้นหา insight สำหรับคุณ...</p>
      </div>

      <div className="space-y-4">
        {/* Skeleton sections */}
        {[
          { h: "h-24", label: "คำถามวันนี้" },
          { h: "h-40", label: "บทสนทนา / มุมมอง" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-5 bg-charcoal-700 border border-charcoal-600">
            <div className="h-3 w-24 bg-charcoal-500 rounded animate-pulse mb-4" />
            <div className={`${s.h} bg-charcoal-600 rounded-lg animate-pulse-slow`} />
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Mental Model", "ตัวอย่างจากโลกจริง"].map((label) => (
            <div key={label} className="rounded-xl p-5 bg-charcoal-700 border border-charcoal-600">
              <div className="h-3 w-20 bg-charcoal-500 rounded animate-pulse mb-4" />
              <div className="h-20 bg-charcoal-600 rounded-lg animate-pulse-slow" />
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5 bg-charcoal-800 border border-charcoal-500">
          <div className="h-3 w-32 bg-charcoal-600 rounded animate-pulse mb-3" />
          <div className="h-6 bg-charcoal-700 rounded animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
}
