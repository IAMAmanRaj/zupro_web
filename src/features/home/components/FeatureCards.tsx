import type { HomeFeature } from '../constants'

type FeatureCardsProps = {
  features: HomeFeature[]
}

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <div className="mt-4 md:mt-6 w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 px-1">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="cascadia-mono-light bg-white hover:cursor-pointer rounded-xl px-5 md:px-6 py-4 md:py-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-slate-50 flex items-center justify-center">
            <feature.Icon
              className={feature.iconClassName}
              size={feature.iconSize}
            />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[14px] md:text-[15px] leading-tight">
              {feature.title}
            </p>
            <p className="text-slate-500 text-xs md:text-sm mt-0.5">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}