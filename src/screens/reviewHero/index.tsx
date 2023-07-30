import { FC, useEffect } from 'react';
import { HeroModel } from '../../models/HeroModel';
import { VersusCodeModel } from '../../models/VersusCodeModel';
import VersusCodesGrid from '../../components/versusCodesGrid';
import HeroPreview from '../../components/heroPreview';
import TextBox from '../../components/textBox';
import Banner from '../../components/banner';
import vsSound from '../../assets/sounds/vs_screen.mp3';
import constants from '../../helpers/constants';
import messages from '../../helpers/messages';
import './index.scss';

type ReviewHeroScreenProps = { heroes: HeroModel[], setSecondScreenToggled: (value: boolean) => void, vesusCodes: VersusCodeModel[], defaultVersusCode: VersusCodeModel };

const ReviewHeroScreen: FC<ReviewHeroScreenProps> = ({ heroes, setSecondScreenToggled, vesusCodes, defaultVersusCode }) => {

  useEffect(() => {
    makeSound();
    returnToStartScreen();
  }, []);

  const makeSound = (): any => new Audio(vsSound).play();

  const returnToStartScreen = (): void => {
    setTimeout((): void => {
      setSecondScreenToggled(false);
    }, constants.ToggleToFirstScreenMilliseconds);
  }

  return (
    <div className='review-hero'>
      <TextBox message={`${messages.battle.defaultMessage} - ${constants.battleRound}`}/>
      <div className='review-hero-heroes-wrapper'>
        <Banner imageSrc={constants.bannerIcon} imageAlt={constants.bannerIconAlt} />
        {heroes.map((hero: HeroModel, index: number) => <HeroPreview key={`${hero.id}${index}`} hero={hero} shouldBeReverse={index === heroes.length - constants.arrayOutboundBorder}/>)}
      </div>
      <VersusCodesGrid versusCodes={vesusCodes} defaultVersusCode={defaultVersusCode}/>
    </div>
  )
}
export default ReviewHeroScreen;
