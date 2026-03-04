import type { HomeFeature } from '../constants'

type FeatureCardsProps = {
  features: HomeFeature[]
}

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <div className="mt-6 w-[85%] cascadia-mono-light max-w-[1200px] grid grid-cols-3 gap-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white hover:cursor-pointer rounded-xl px-6 py-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
            <feature.Icon
              className={feature.iconClassName}
              size={feature.iconSize}
            />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[15px] leading-tight">
              {feature.title}
            </p>
            <p className="text-slate-500 text-sm mt-0.5">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
