import { FC } from 'react';
import './index.scss';
import messages from '../../helpers/messages';
import { Hero } from '../../models/Hero';

type HeroPreviewProps = { selectedHero: Hero, defaultHero?: Hero, displayedHero: Hero, firstHeroSelected?: boolean}

const HeroPreview: FC<HeroPreviewProps> = ({selectedHero, defaultHero, displayedHero, firstHeroSelected}) => {
  const heroAlreadySelected: boolean = selectedHero.id !== -1;

  if (defaultHero) {
    const nameCheck: string | undefined = heroAlreadySelected ? selectedHero.name : firstHeroSelected === true ? displayedHero.name : defaultHero?.name;
    return (
        <div className='player-view'>
            <h2 className='player-view-title'>{messages.player.defaultMessage} 2</h2>
            <img className='player-view-img reverse-image' src={heroAlreadySelected ? selectedHero.gif : firstHeroSelected === true ? displayedHero.gif : defaultHero?.gif} alt={nameCheck} />
            <h3 className={`player-view-hero-name ${heroAlreadySelected ? 'selected': 'common' }`}>{nameCheck}</h3>
        </div>
    )
  }

  return (
    <div className='player-view'>
        <h2 className='player-view-title'>{messages.player.defaultMessage} 1</h2>
        <img className='player-view-img' src={heroAlreadySelected ? selectedHero.gif : displayedHero.gif} alt={heroAlreadySelected ? selectedHero.name : displayedHero.name} />
        <h3 className={`player-view-hero-name ${heroAlreadySelected ? 'selected': 'common' }`}>{heroAlreadySelected ? selectedHero.name : displayedHero.name}</h3>
    </div>
  )
}
export default HeroPreview;