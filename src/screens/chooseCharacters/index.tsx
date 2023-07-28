import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import './index.scss';
import { Hero } from '../../models/Hero';
import CardsGrid from "../../components/cardsGrid";
import HeroPreview from "../../components/heroPreview";
import TextBox from '../../components/textBox';
import messages from '../../helpers/messages';

type ChooseCharactersScreenProps = { heroes: Hero[], arenas: string[], defaultHero: Hero, setSelectedHeroes: (selectedHeroes: Hero[]) => void }
type StateType<T> = [T, Dispatch<SetStateAction<T>>];

export const ChooseCharactersScreen: FC<ChooseCharactersScreenProps> = ({ heroes, arenas, defaultHero, setSelectedHeroes }) => {
  
  const playersCount: number = 2; 
  const [playerOneHero, setPlayerOneHero]: StateType<Hero> = useState<Hero>(defaultHero);
  const [playerTwoHero, setPlayerTwoHero]: StateType<Hero> = useState<Hero>(defaultHero);
  const [displayedHero, setDisplayedHero]: StateType<Hero> = useState<Hero>(defaultHero);
  const [temporaryHero, setTemporaryHero]: StateType<Hero> = useState<Hero>(defaultHero);
  const [arena, setArena]: StateType<string> = useState<string>("");
  
  const [selectedHeroesCount, setSelectedHeroesCount]: StateType<number> = useState<number>(0);

  useEffect(() => {
    const randomArena: string = getRandomArrayItem(arenas);
    setArena(randomArena);
  }, []);

  useEffect(() => {
    if (playersCount < 2 && playerOneHero.id !== -1) {
      const randomHero: Hero = getRandomArrayItem(heroes);
      setPlayerTwoHero(randomHero);
      setSelectedHeroes([playerOneHero, randomHero]);
    }
  }, [selectedHeroesCount]);

  const setHero = (hero: Hero): void => {
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
    } else {
      setPlayerOneHero(hero);
      setSelectedHeroesCount(1);
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
        <HeroPreview selectedHero={playerOneHero} firstHeroSelected={playerOneHero.id !== -1} displayedHero={displayedHero} />
        <CardsGrid heroes={heroes} defaultHero={defaultHero} setHero={setHero} setDisplayedHero={setDisplayedHero} setTemporaryHero={setTemporaryHero} playersCount={playersCount} selectedHeroesCount={selectedHeroesCount} />
        <HeroPreview selectedHero={playerTwoHero} firstHeroSelected={playerOneHero.id !== -1} defaultHero={temporaryHero} displayedHero={displayedHero} />
      </div>
      <TextBox message={`${messages.kombatZone.defaultMessage}: ${arena}`}/>
    </div>
  )
}
export default ChooseCharactersScreen;
