import { FC } from 'react';
import './App.scss';
import ChooseCharacterScreen from './screens/chooseCharacters';
import { Hero } from './models/Hero';
import heroesData from './data/heroes.json';

const heroes: Hero[] = heroesData;
const App: FC = () => {
  return (
    <div className="App">
      <ChooseCharacterScreen heroes={heroes}/>
    </div>
  );
}

export default App;
