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
    subtitle: 'Find daily & skilled workers',
  },
  {
    Icon: TbCurrentLocation,
    iconClassName: 'text-[#3F51B5]',
    iconSize: 32,
    title: 'Near you',
    subtitle: `We connect workers to nearby employers. No hassle !`,
  },
  {
    Icon: FaPeopleArrows,
    iconClassName: 'text-[#3F51B5]',
    iconSize: 28,
    title: 'Connecting People',
    subtitle: 'With Zupro, finding a worker becomes easier & faster !',
  },
]

export const SEEKER_PERKS = [
  '100+ Nearby jobs posted, daily',
  'Get hired same day',
  'Start working and earning',
  'Build Trust, and Grow !',
]

export const HIRER_PERKS = [
  'Find nearby workers, faster',
  'Review profiles, hire wisely',
  'Pay on project completion',
  'Get help, at your doorstep !',
]
