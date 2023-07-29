import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import './App.scss';
import ChooseHeroScreen from './screens/chooseHero';
import ReviewHeroScreen from './screens/reviewHero';
import { HeroModel } from './models/HeroModel';
import { VersusCodeModel } from './models/VersusCodeModel';
import heroesData from './data/heroes.json';
import arenasData from './data/arenas.json';
import VersusCodesData from './data/versusCodes.json';
import constants from './helpers/constants';

type StateType<T> = [T, Dispatch<SetStateAction<T>>];

const defaultHero: HeroModel = { id: -1, name: "", icon: "", previewIcon: "" };
const defaultVersusCode: VersusCodeModel = { id: -1, icon: "", key: "" };

const heroes: HeroModel[] = heroesData;
const arenas: string[] = arenasData;
const versusCodes: VersusCodeModel[] = VersusCodesData;

const App: FC = () => {
  const [selectedHeroes, setSelectedHeroes]: StateType<HeroModel[]> = useState<HeroModel[]>([]);
  const [secondScreenToggled, setSecondScreenToggled]: StateType<boolean> = useState<boolean>(false);

  useEffect(() => {
    if (selectedHeroes.length === constants.heroesCountCanBeSelected) {
      setTimeout((): void => {
        setSecondScreenToggled(true);
      }, constants.toggleToSecondScreenMilliseconds);
    }
  }, [selectedHeroes])

  return (
    <div className="App">
      {
        !secondScreenToggled ?
          <ChooseHeroScreen heroes={heroes} arenas={arenas} defaultHero={defaultHero} setSelectedHeroes={setSelectedHeroes}/> :
          <ReviewHeroScreen heroes={selectedHeroes} setSecondScreenToggled={setSecondScreenToggled} vesusCodes={versusCodes} defaultVersusCode={defaultVersusCode} />
      }
    </div>
  );
}

export default App;
