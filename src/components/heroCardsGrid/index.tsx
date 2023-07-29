import { FC, useState, useEffect } from 'react';
import { HeroModel } from '../../models/HeroModel';
import HeroCard from '../heroCard';
import messages from '../../helpers/messages';
import constants from '../../helpers/constants';
import gridMove from '../../assets/sounds/grid_move.mp3';
import selectHero from '../../assets/sounds/select_hero.mp3';
import './index.scss';

type HeroCardsGridProps = {
  heroes: HeroModel[],
  selectedHeroesCount: number,
  playersCount: number,
  setHero: (hero: HeroModel) => void,
  setDisplayedHero: (hero: HeroModel) => void,
  setTemporaryHero: (hero: HeroModel) => void,
  defaultHero: HeroModel
}
type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const HeroCardsGrid: FC<HeroCardsGridProps> = ({ heroes, selectedHeroesCount, playersCount, setHero, setDisplayedHero, setTemporaryHero, defaultHero }) => {

  const [chunks, setChunks]: StateType<HeroModel[][]> = useState<HeroModel[][]>([]);
  const [markedHero, setMarkedHero]: StateType<HeroModel> = useState<HeroModel>(defaultHero);
  
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

  const verticalMovement = (direction: string): void => {
    chunks.forEach((chunk: HeroModel[], matrixIndex: number): void => {
      const matrixArrayHeroIndex: number = chunk.findIndex((hero: HeroModel): boolean => hero.id === markedHero.id);
      switch (direction) {
        case messages.up.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixIndex - constants.arrayOutboundBorder >= 0) {
            setMarkedHero((previousMarked: HeroModel): HeroModel => ({ ...previousMarked, ...chunks[matrixIndex - constants.arrayOutboundBorder][matrixArrayHeroIndex] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        case messages.down.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixIndex + 1 <= chunks.length - constants.arrayOutboundBorder) {
            setMarkedHero((previousMarked: HeroModel): HeroModel => ({ ...previousMarked, ...chunks[matrixIndex + constants.arrayOutboundBorder][matrixArrayHeroIndex] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        default:
          break;
      }
    });
  }

  const horizontalMovement = (direction: string): void => {
    chunks.forEach((chunk: HeroModel[]): void => {
      const matrixArrayHeroIndex: number = chunk.findIndex((hero: HeroModel): boolean => hero.id === markedHero.id);
      switch (direction) {
        case messages.left.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixArrayHeroIndex - constants.arrayOutboundBorder >= 0) {
            setMarkedHero((previousMarked: HeroModel) : HeroModel => ({ ...previousMarked, ...chunk[matrixArrayHeroIndex - constants.arrayOutboundBorder] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        case messages.right.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixArrayHeroIndex + 1 <= chunk.length - constants.arrayOutboundBorder) {
            setMarkedHero((previousMarked: HeroModel) : HeroModel => ({ ...previousMarked, ...chunk[matrixArrayHeroIndex + constants.arrayOutboundBorder] }));
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
      serDefaultMarker(chunks[Math.round(chunks.length / 2) - constants.arrayOutboundBorder]);
      if (selectedHeroesCount === playersCount) {
        setMarkedHero(defaultHero);
      }
    }
  }

  const handleKeyPress = ({ key }: KeyboardEvent): void => {
    if (selectedHeroesCount === playersCount) return;
    
    switch (key) {
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

  const heroesToChunks = (heroes: HeroModel[]): void => {
    const chunks: HeroModel[][] = [];
    const rowSize: number = Math.ceil(Math.sqrt(heroes.length) + 1);
    heroes.forEach((_, index): void => {
      if (index % rowSize === 0) {
        chunks.push(heroes.slice(index, index + rowSize));
      }
    });
    setChunks(chunks);
    serDefaultMarker(chunks[Math.round(chunks.length / 2) - constants.arrayOutboundBorder]);
  }

  const serDefaultMarker = (matrixCentralChunk: HeroModel[]): void => {
    if (matrixCentralChunk.length) {
      const centralHeroIndex: number = Math.round(matrixCentralChunk.length / 2);
      setMarkedHero(matrixCentralChunk[centralHeroIndex - constants.arrayOutboundBorder]);
      setDisplayedHero(matrixCentralChunk[centralHeroIndex - constants.arrayOutboundBorder]);
      setTemporaryHero(matrixCentralChunk[centralHeroIndex - constants.arrayOutboundBorder]);
    }
  }

  return  (
      <table className='hero-grid'>
        <tbody>
          {chunks.map((chunk: HeroModel[], rowIndex: number): any => (
            <tr key={rowIndex}>
              {chunk.map((hero: HeroModel, index: number): any => (
                <HeroCard key={index} hero={hero} markedHeroId={markedHero.id} playersCount={playersCount} selectedHeroesCount={selectedHeroesCount} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}
export default HeroCardsGrid;
