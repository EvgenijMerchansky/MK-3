import { FC } from 'react';
import './App.scss';
import ChooseCharacterScreen from './screens/chooseCharacters';
import { Hero } from './models/Hero';
import heroesData from './data/heroes.json';
import arenasData from './data/arenas.json';

const heroes: Hero[] = heroesData;
const arenas: string[] = arenasData;
const App: FC = () => {
  return (
    <div className="App">
      <ChooseCharacterScreen heroes={heroes} arenas={arenas} />
    </div>
  );
}

export default App;
