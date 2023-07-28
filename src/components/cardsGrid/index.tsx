import { FC, useState, useEffect } from 'react';
import messages from '../../helpers/messages';
import gridMove from '../../assets/sounds/grid_move.mp3';
import selectHero from '../../assets/sounds/select_hero.mp3';
import './index.scss';
import { Hero } from '../../models/Hero';
import { Card } from '../card';

type CardsGridProps = {
  heroes: Hero[],
  selectedHeroesCount: number,
  playersCount: number,
  setHero: (hero: Hero) => void,
  setDisplayedHero: (hero: Hero) => void,
  setTemporaryHero: (hero: Hero) => void,
  defaultHero: Hero
}
type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const CardsGrid: FC<CardsGridProps> = ({ heroes, selectedHeroesCount, playersCount, setHero, setDisplayedHero, setTemporaryHero, defaultHero }) => {

  const arrayIndexBounding: number = 1;
  const [chunks, setChunks]: StateType<Hero[][]> = useState<Hero[][]>([]);
  const [markedHero, setMarkedHero]: StateType<Hero> = useState<Hero>(defaultHero);
  
  useEffect(() => {
    heroesToChunks(heroes);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    setDisplayedHero(markedHero);
    return (): void => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [markedHero]);

  const makeSound = (action: string): any => new Audio(action === messages.gridMove.defaultMessage ? gridMove : selectHero).play();

  const verticalMovement = (vector: string): void => {
    chunks.forEach((chunk: Hero[], matrixIndex: number): void => {
      const matrixArrayHeroIndex: number = chunk.findIndex((hero: Hero): boolean => hero.id === markedHero.id);
      switch (vector) {
        case messages.up.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixIndex - arrayIndexBounding >= 0) {
            setMarkedHero((previousMarked: Hero): Hero => ({ ...previousMarked, ...chunks[matrixIndex - arrayIndexBounding][matrixArrayHeroIndex] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        case messages.down.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixIndex + 1 <= chunks.length - arrayIndexBounding) {
            setMarkedHero((previousMarked: Hero): Hero => ({ ...previousMarked, ...chunks[matrixIndex + arrayIndexBounding][matrixArrayHeroIndex] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        default:
          break;
      }
    });
  }

  const horizontalMovement = (vector: string): void => {
    chunks.forEach((chunk: Hero[]): void => {
      const matrixArrayHeroIndex: number = chunk.findIndex((hero: Hero): boolean => hero.id === markedHero.id);
      switch (vector) {
        case messages.left.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixArrayHeroIndex - 1 >= 0) {
            setMarkedHero((previousMarked: Hero) : Hero => ({ ...previousMarked, ...chunk[matrixArrayHeroIndex - 1] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        case messages.right.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixArrayHeroIndex + 1 <= chunk.length - 1) {
            setMarkedHero((previousMarked: Hero) : Hero => ({ ...previousMarked, ...chunk[matrixArrayHeroIndex + 1] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        default:
          break;
      }
    });
  }

  const handleSetHero = (): void => {
    if (markedHero.id > 0) {
      setHero(markedHero);
      makeSound(messages.selectHero.defaultMessage);
      serDefaultMarker(chunks[Math.round(chunks.length / 2) - arrayIndexBounding]);
      if (selectedHeroesCount === playersCount) {
        setMarkedHero(defaultHero);
      }
    }
  }

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (selectedHeroesCount === playersCount) return;
    
    switch (event.key) {
      case messages.arrowUp.defaultMessage:
        verticalMovement(messages.up.defaultMessage);
        break;
      case messages.arrowDown.defaultMessage:
        verticalMovement(messages.down.defaultMessage);
        break;
      case messages.arrowLeft.defaultMessage:
        horizontalMovement(messages.left.defaultMessage);
        break;
      case messages.arrowRight.defaultMessage:
        horizontalMovement(messages.right.defaultMessage);
        break;
      case messages.enter.defaultMessage:
        handleSetHero();
        break;
      default:
        break;
    }
  };

  const heroesToChunks = (heroes: Hero[]): void => {
    const chunks: Hero[][] = [];
    const rowSize: number = Math.ceil(Math.sqrt(heroes.length) + 1);
    heroes.forEach((_, index): void => {
      if (index % rowSize === 0) {
        chunks.push(heroes.slice(index, index + rowSize));
      }
    });
    setChunks(chunks);
    serDefaultMarker(chunks[Math.round(chunks.length / 2) - arrayIndexBounding]);
  }

  const serDefaultMarker = (matrixCentralChunk: Hero[]): void => {
    if (matrixCentralChunk.length) {
      const centralHeroIndex: number = Math.round(matrixCentralChunk.length / 2);
      setMarkedHero(matrixCentralChunk[centralHeroIndex - arrayIndexBounding]);
      setDisplayedHero(matrixCentralChunk[centralHeroIndex - arrayIndexBounding]);
      setTemporaryHero(matrixCentralChunk[centralHeroIndex - arrayIndexBounding]);
    }
  }

  return  (
      <table className='grid'>
        <tbody>
          {chunks.map((chunk: Hero[], rowIndex: number): any => (
            <tr key={rowIndex}>
              {chunk.map((hero: Hero, index: number): any => (
                <Card key={index} hero={hero} markedHeroId={markedHero.id} playersCount={playersCount} selectedHeroesCount={selectedHeroesCount} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}
export default CardsGrid;
