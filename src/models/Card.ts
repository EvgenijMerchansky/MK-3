import { Hero } from './Hero';

export interface Card {
  hero: Hero,
  isMarked?: boolean,
  icon?: string
}
