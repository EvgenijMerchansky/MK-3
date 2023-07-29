import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import './index.scss';
import { HeroModel } from '../../models/HeroModel';
import CardsGrid from "../../components/heroCardsGrid";
import HeroOverview from "../../components/heroOverview";
import TextBox from '../../components/textBox';
import messages from '../../helpers/messages';
import constants from '../../helpers/constants';

type ChooseHeroScreenProps = { heroes: HeroModel[], arenas: string[], defaultHero: HeroModel, setSelectedHeroes: (selectedHeroes: HeroModel[]) => void }
type StateType<T> = [T, Dispatch<SetStateAction<T>>];

const ChooseHeroScreen: FC<ChooseHeroScreenProps> = ({ heroes, arenas, defaultHero, setSelectedHeroes }) => {
  
  const playersCount: number = constants.playersCount; 
  const [arena, setArena]: StateType<string> = useState<string>("");
  const [selectedHeroesCount, setSelectedHeroesCount]: StateType<number> = useState<number>(0);
  const [playerOneHero, setPlayerOneHero]: StateType<HeroModel> = useState<HeroModel>(defaultHero);
  const [playerTwoHero, setPlayerTwoHero]: StateType<HeroModel> = useState<HeroModel>(defaultHero);
  const [displayedHero, setDisplayedHero]: StateType<HeroModel> = useState<HeroModel>(defaultHero);
  const [temporaryHero, setTemporaryHero]: StateType<HeroModel> = useState<HeroModel>(defaultHero);
  
  useEffect(() => {
    arenaAutoset();
  }, []);

  useEffect(() => {
    secondHeroAutoset();
  }, [selectedHeroesCount]);

  const setHero = (hero: HeroModel): void => {
    if (playersCount > 1) {
      if (playerOneHero.id === -1) {
        setPlayerOneHero(hero);
        setSelectedHeroesCount(1);
        return;
      }
      if (playerTwoHero.id === -1) {
        setPlayerTwoHero(hero);
        setSelectedHeroesCount(2);
        setSelectedHeroes([playerOneHero, hero]);
        return;
      }
    } 
    setPlayerOneHero(hero);
    setSelectedHeroesCount(1);
  }

  const arenaAutoset = (): void => {
    const randomArena: string = getRandomArrayItem(arenas);
    setArena(randomArena);
  }

  const secondHeroAutoset = (): void => {
    if (playersCount < 2 && playerOneHero.id !== -1) {
      const randomHero: HeroModel = getRandomArrayItem(heroes);
      setPlayerTwoHero(randomHero);
      setSelectedHeroes([playerOneHero, randomHero]);
    }
  }

  const getRandomArrayItem = (array: any[]): any => {
    const randomIndex: number = Math.floor(Math.random() * ((array.length -1) - 0) + 0);
    return array[randomIndex];
  }

  return (
    <div className='contianer'>
      <TextBox message={messages.selectFighter.defaultMessage}/>
      <div className='content-wrapper'>
        <HeroOverview selectedHero={playerOneHero} firstHeroSelected={playerOneHero.id !== -1} displayedHero={displayedHero} />
        <CardsGrid heroes={heroes} defaultHero={defaultHero} setHero={setHero} setDisplayedHero={setDisplayedHero} setTemporaryHero={setTemporaryHero} playersCount={playersCount} selectedHeroesCount={selectedHeroesCount} />
        <HeroOverview selectedHero={playerTwoHero} firstHeroSelected={playerOneHero.id !== -1} defaultHero={temporaryHero} displayedHero={displayedHero} />
      </div>
      <TextBox message={`${messages.kombatZone.defaultMessage}: ${arena}`}/>
    </div>
  )
}
export default ChooseHeroScreen;
