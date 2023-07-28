import React, { FC, useState, useEffect } from 'react';
import './index.scss';
import { Hero } from '../../models/Hero';
import CardsGrid from "../../components/cardsGrid";

type ChooseCharacterScreenProps = { heroes: Hero[] }
type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const ChooseCharacterScreen: FC<ChooseCharacterScreenProps> = ({ heroes }) => {
  
  const playersCount = 1; 
  const defaultHero: Hero = { id: -1, name: "", icon: "", previewIcon: "" };
  const [playerOneHero, setPlayerOneHero]: StateType<Hero> = useState<Hero>(defaultHero);
  const [playerTwoHero, setPlayerTwoHero]: StateType<Hero> = useState<Hero>(defaultHero);
  const [selectedHeroesCount, setSelectedHeroesCount]: StateType<number> = useState<number>(0);

  useEffect(() => {
    if (playersCount < 2 && playerOneHero.id !== -1) {
      setRandomHero();
    }
  }, [selectedHeroesCount]);

  const setHero = (hero: Hero) => {
    if (playersCount > 1) {
      if (playerOneHero.id === -1) {
        setPlayerOneHero(hero);
        setSelectedHeroesCount(1);
        return;
      }
      if (playerTwoHero.id === -1) {
        setPlayerTwoHero(hero);
        setSelectedHeroesCount(2);
        return;
      }
    } else {
      if (playerOneHero.id === -1) {
        setPlayerOneHero(hero);
        setSelectedHeroesCount(1);
        return;
      }
      setPlayerTwoHero(hero);
      return;
    }
  }

  const setRandomHero = () => {
    const randomHeroIndex = Math.floor(Math.random() * ((heroes.length -1) - 0) + 0);
    setHero(heroes[randomHeroIndex]);
  }

  return (
    <div className='contianer'>
      <div className='static-content'>
        <h1>SELECT YOUR FIGHTER</h1>
      </div>
      <div className='content-wrapper'>
        <div className='player-view'>
          <h2>P1</h2>
          <h4>{playerOneHero.id !== -1 ? `(${playerOneHero.id}) ${playerOneHero.name}` : null}</h4>
        </div>
        <CardsGrid heroes={heroes} defaultHero={defaultHero} setHero={setHero} playersCount={playersCount} selectedHeroesCount={selectedHeroesCount} />
        <div className='player-view'>
          <h2>P2</h2>
          <h4>{playerTwoHero.id !== -1 ? `(${playerTwoHero.id}) ${playerTwoHero.name}` : null}</h4>   
        </div>
      </div>
      <div className='static-content'>
        <h3>KOMBAT ZONE: SOUL CHAMBER</h3>
      </div>
    </div>
  )
}

export default ChooseCharacterScreen;
