import { FC } from 'react';
import './index.scss';
import { Hero } from '../../models/Hero';

type CardProps = { hero: Hero, markedHeroId: number, playersCount: number, selectedHeroesCount: number }

export const Card: FC<CardProps> = ({ hero, markedHeroId, playersCount, selectedHeroesCount }) => {
  
  const firstHeroNoSeleted: boolean = selectedHeroesCount === 0,
        playerNumber: number | null = markedHeroId === hero.id && firstHeroNoSeleted ? 1 : markedHeroId === hero.id && !firstHeroNoSeleted ? 2 : null,
        playerNumberWithSingleMode: number | null  = playersCount > 1 ? playerNumber : firstHeroNoSeleted ? playerNumber : null;

  return (
    <td key={`${hero.id}${hero.name}`} className='grid-body-row-cell'>
      <img
        src={hero.icon}
        alt={hero.name}
        className={`hero-icon ${markedHeroId === hero.id && selectedHeroesCount === 0 ? 'green-border' : markedHeroId === hero.id && selectedHeroesCount === 1 && playersCount > 1 ? 'red-border' : 'transparent-border' }`}
      />
      <span className={`player-number ${firstHeroNoSeleted ? "player-number-green" : "player-number-red"}`}>
        {selectedHeroesCount !== 2 ? playerNumberWithSingleMode : null}
      </span>
    </td>
  )
}
