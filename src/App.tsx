import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import './App.scss';
import ChooseCharacterScreen from './screens/chooseCharacters';
import ReviewCharacters from './screens/reviewCharacters';
import { Hero } from './models/Hero';
import heroesData from './data/heroes.json';
import arenasData from './data/arenas.json';
import constants from './constants';

type StateType<T> = [T, Dispatch<SetStateAction<T>>];

const defaultHero: Hero = { id: -1, name: "", icon: "", previewIcon: "" };
const heroes: Hero[] = heroesData;
const arenas: string[] = arenasData;
const App: FC = () => {
  const [selectedHeroes, setSelectedHeroes]: StateType<Hero[]> = useState<Hero[]>([]);
  const [secondScreenToggled, setSecondScreenToggled]: StateType<boolean> = useState<boolean>(false);

  useEffect(() => {
    if (selectedHeroes.length == 2) {
      setTimeout((): void => {
        setSecondScreenToggled(true);
      }, constants.toggleToSecondScreenMilliseconds);
    }
  }, [selectedHeroes])

  return (
    <div className="App">
      {
        !secondScreenToggled ?
          <ChooseCharacterScreen heroes={heroes} arenas={arenas} defaultHero={defaultHero} setSelectedHeroes={setSelectedHeroes}/> :
          <ReviewCharacters heroes={selectedHeroes} setSecondScreenToggled={setSecondScreenToggled} />
      }
    </div>
  );
}

export default App;
