import { ClosingCTA } from './ClosingCTA'
import { HowItWorks } from './HowItWorks'
import { Insights } from './Insights'
import { Problem } from './Problem'
import { Solution } from './Solution'
import { Team } from './Team'

export function LandingBody() {
  return (
    <section className="bg-white w-full">
      <Problem />
      <Insights />
      <Solution />
      <HowItWorks />
      <Team/>
      <ClosingCTA/>
    </section>
  )
}

