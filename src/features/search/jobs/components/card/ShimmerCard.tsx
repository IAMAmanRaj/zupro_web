export function ShimmerCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 overflow-hidden relative">
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-100/80 to-transparent"
        style={{ animation: 'shimmer 1.4s infinite' }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg shrink-0" />
          <div className="h-4 w-28 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-5 w-14 bg-slate-100 rounded-full" />
      </div>
      <div className="h-3.5 w-3/5 bg-slate-100 rounded-lg" />
      <div className="h-3.5 w-2/5 bg-slate-100 rounded-lg" />
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="h-4 w-1/3 bg-slate-100 rounded-lg" />
        <div className="h-3.5 w-16 bg-slate-100 rounded-lg" />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
      </div>
    </div>
  )
}

