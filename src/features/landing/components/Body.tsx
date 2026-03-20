import { LandingClosingCTABlock } from './ClosingCTABlock'
import { LandingHowItWorksBlock } from './HowItWorksBlock'
import { LandingInsightBlock } from './InsightBlock'
import { LandingProblemBlock } from './ProblemBlock'
import { LandingSolutionBlock } from './LandingSolutionBlock'
import { LandingTeamBlock } from './LandingTeamBlock'

export function LandingBody() {
  return (
    <section className="bg-white w-full">
      <LandingProblemBlock />
      <LandingInsightBlock />
      <LandingSolutionBlock />
      <LandingHowItWorksBlock />
      <LandingTeamBlock />
      <LandingClosingCTABlock />
    </section>
  )
}

