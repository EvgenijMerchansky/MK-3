import { FC, useEffect } from 'react';
import { Hero } from '../../models/Hero';
import TextBox from '../../components/textBox';
import vsSound from '../../assets/sounds/vs_screen.mp3';
import constants from '../../constants';
import './index.scss';

type ReviewCharactersProps = { heroes: Hero[], setSecondScreenToggled: (value: boolean) => void };

const ReviewCharacters: FC<ReviewCharactersProps> = ({ heroes, setSecondScreenToggled }) => {
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
    <div>
      <TextBox message='Screen two'/>
    </div>
  )
}
export default ReviewCharacters;
