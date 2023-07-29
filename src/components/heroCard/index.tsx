import { FC } from 'react';
import { HeroModel } from '../../models/HeroModel';
import './index.scss';

type HeroCardProps = { hero: HeroModel, markedHeroId: number, playersCount: number, selectedHeroesCount: number }

const HeroCard: FC<HeroCardProps> = ({ hero, markedHeroId, playersCount, selectedHeroesCount }) => {
  
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
export default HeroCard;
