import type { IconType } from 'react-icons'
import { PiHandshakeBold } from 'react-icons/pi'
import { TbCurrentLocation } from 'react-icons/tb'
import { FaPeopleArrows } from "react-icons/fa";

export type HomeFeature = {
  Icon: IconType
  iconClassName: string
  iconSize: number
  title: string
  subtitle: string
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
    title: 'Jobs for All',
    subtitle: 'Daily & skilled work',
  },
  {
    Icon: TbCurrentLocation,
    iconClassName: 'text-[#3F51B5]',
    iconSize: 32,
    title: 'Near you',
    subtitle: `Looking for Job or Work ?. Zupro is here for you.`,
  },
  {
    Icon: FaPeopleArrows,
    iconClassName: 'text-[#3F51B5]',
    iconSize: 28,
    title: 'Connecting People',
    subtitle: 'With Zupro, finding work or job becomes easier than ever !',
  },
]

export const SEEKER_PERKS = [
  'Get hired same day',
  'Start working and earning',
  'No experience needed !',
]

export const HIRER_PERKS = [
  'Find people',
  'Pay on project completion',
  'Get help, for all your needs !',
]
