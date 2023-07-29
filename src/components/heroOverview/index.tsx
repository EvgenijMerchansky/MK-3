import { FC } from 'react';
import { HeroModel } from '../../models/HeroModel';
import messages from '../../helpers/messages';
import './index.scss';

type HeroOverviewProps = { selectedHero: HeroModel, defaultHero?: HeroModel, displayedHero: HeroModel, firstHeroSelected?: boolean}

const HeroOverview: FC<HeroOverviewProps> = ({selectedHero, defaultHero, displayedHero, firstHeroSelected}) => {
  const heroAlreadySelected: boolean = selectedHero.id !== -1;

  if (defaultHero) {
    const nameCheck: string | undefined = heroAlreadySelected ? selectedHero.name : firstHeroSelected === true ? displayedHero.name : defaultHero?.name;
    return (
        <div className='hero-overview'>
            <h2 className='hero-overview-title'>{messages.player.defaultMessage} 2</h2>
            <img className='hero-overview-img reverse-image' src={heroAlreadySelected ? selectedHero.gif : firstHeroSelected === true ? displayedHero.gif : defaultHero?.gif} alt={nameCheck} />
            <h3 className={`hero-overview-hero-name ${heroAlreadySelected ? 'selected': 'common' }`}>{nameCheck}</h3>
        </div>
    )
  }

  return (
    <div className='hero-overview'>
        <h2 className='hero-overview-title'>{messages.player.defaultMessage} 1</h2>
        <img className='hero-overview-img' src={heroAlreadySelected ? selectedHero.gif : displayedHero.gif} alt={heroAlreadySelected ? selectedHero.name : displayedHero.name} />
        <h3 className={`hero-overview-hero-name ${heroAlreadySelected ? 'selected': 'common' }`}>{heroAlreadySelected ? selectedHero.name : displayedHero.name}</h3>
    </div>
  )
}
export default HeroOverview;