export function ShimmerCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 overflow-hidden relative">
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-100/80 to-transparent"
        style={{ animation: 'shimmer 1.4s infinite' }}
      />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 w-28 bg-slate-100 rounded-lg" />
          <div className="h-3 w-20 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-5 w-14 bg-slate-100 rounded-full" />
      </div>
      <div className="h-3.5 w-3/5 bg-slate-100 rounded-lg" />
      <div className="h-3.5 w-2/5 bg-slate-100 rounded-lg" />
      <div className="h-3.5 w-1/2 bg-slate-100 rounded-lg" />
      <div className="pt-3 border-t border-slate-50 flex gap-2">
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
      </div>
    </div>
  )
}

