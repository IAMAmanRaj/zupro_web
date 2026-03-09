import type { IconType } from 'react-icons'
import { PiHandshakeBold } from 'react-icons/pi'
import { TbCurrentLocation } from 'react-icons/tb'
import { FaPeopleArrows } from "react-icons/fa";

export type HomeFeature = {
  Icon: IconType
  iconClassName: string
  iconSize: number
  titleKey: string
  subtitleKey: string
}

export const HOME_SLIDES = [
  '/images/home/image_1.webp',
  '/images/home/image_2.webp',
  '/images/home/image_3.webp',
  '/images/home/image_4.webp',
]

export const FEATURES: HomeFeature[] = [
  {
    Icon: PiHandshakeBold,
    iconClassName: 'text-amber-500',
    iconSize: 30,
    titleKey: 'features.jobs.title',
    subtitleKey: 'features.jobs.subtitle',
  },
  {
    Icon: TbCurrentLocation,
    iconClassName: 'text-[#3F51B5]',
    iconSize: 32,
    titleKey: 'features.nearYou.title',
    subtitleKey: 'features.nearYou.subtitle',
  },
  {
    Icon: FaPeopleArrows,
    iconClassName: 'text-[#3F51B5]',
    iconSize: 28,
    titleKey: 'features.connectingPeople.title',
    subtitleKey: 'features.connectingPeople.subtitle',
  },
]

export const SEEKER_PERKS = [
  'seekerPerks.jobs',
  'seekerPerks.hired',
  'seekerPerks.startWorking',
  'seekerPerks.buildTrust',
]

export const HIRER_PERKS = [
  'hirerPerks.findWorkers',
  'hirerPerks.reviewProfiles',
  'hirerPerks.payOnCompletion',
  'hirerPerks.instantHelp',
]
