import { FC, useState, useEffect } from 'react';
import messages from '../../helpers/messages';
import gridMove from '../../assets/sounds/grid_move.mp3';
import selectHero from '../../assets/sounds/select_hero.mp3';
import './index.scss';
import { Hero } from '../../models/Hero';

type CardsGridProps = { heroes: Hero[], selectedHeroesCount: number, playersCount: number, setHero: (hero: Hero) => void, defaultHero: Hero }
type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const CardsGrid: FC<CardsGridProps> = ({ heroes, selectedHeroesCount, playersCount, setHero, defaultHero }) => {

  const arrayIndexBounding = 1;
  const [chunks, setChunks]: StateType<Hero[][]> = useState<Hero[][]>([]);
  const [markedHero, setMarkedHero]: StateType<Hero> = useState<Hero>(defaultHero);
  
  useEffect(() => {
    heroesToChunks(heroes);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [markedHero]);

  const makeSound = (action: string) => new Audio(action === messages.gridMove.defaultMessage ? gridMove : selectHero).play();

  const verticalMovement = (vector: string) => {
    chunks.forEach((chunk: Hero[], matrixIndex: number) => {
      const matrixArrayHeroIndex = chunk.findIndex(hero => hero.id === markedHero.id);
      switch (vector) {
        case messages.up.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixIndex - arrayIndexBounding >= 0) {
            setMarkedHero((previousMarked: Hero) => ({ ...previousMarked, ...chunks[matrixIndex - arrayIndexBounding][matrixArrayHeroIndex] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        case messages.down.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixIndex + 1 <= chunks.length - arrayIndexBounding) {
            setMarkedHero((previousMarked: Hero) => ({ ...previousMarked, ...chunks[matrixIndex + arrayIndexBounding][matrixArrayHeroIndex] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        default:
          break;
      }
    });
  }

  const horizontalMovement = (vector: string) => {
    chunks.forEach((chunk: Hero[]) => {
      const matrixArrayHeroIndex = chunk.findIndex(hero => hero.id === markedHero.id);
      switch (vector) {
        case messages.left.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixArrayHeroIndex >= 0) {
            setMarkedHero((previousMarked: Hero) => ({ ...previousMarked, ...chunk[matrixArrayHeroIndex - arrayIndexBounding] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        case messages.right.defaultMessage:
          if (matrixArrayHeroIndex !== -1 && matrixArrayHeroIndex <= chunk.length -1) {
            setMarkedHero((previousMarked: Hero) => ({ ...previousMarked, ...chunk[matrixArrayHeroIndex + arrayIndexBounding] }));
            makeSound(messages.gridMove.defaultMessage);
          }
          break;
        default:
          break;
      }
    });
  }

  const handleSetHero = () => {
    if (markedHero.id > 0) {
      setHero(markedHero);
      makeSound(messages.selectHero.defaultMessage);
      serDefaultMarker(chunks[Math.round(chunks.length / 2) - arrayIndexBounding]);
      if (selectedHeroesCount === playersCount) {
        setMarkedHero(defaultHero);
      }
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
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

  const heroesToChunks = (heroes: Hero[]) => {
    const chunks: Hero[][] = [];
    const rowSize = Math.ceil(Math.sqrt(heroes.length) + 1);
    heroes.forEach((_, index) => {
      if (index % rowSize === 0) {
        chunks.push(heroes.slice(index, index + rowSize));
      }
    });
    setChunks(chunks);
    serDefaultMarker(chunks[Math.round(chunks.length / 2) - arrayIndexBounding]);
  }

  const serDefaultMarker = (matrixCentralChunk: Hero[]) => {
    if (matrixCentralChunk.length) {
      const centralHeroIndex = Math.round(matrixCentralChunk.length / 2)
      setMarkedHero(matrixCentralChunk[centralHeroIndex - arrayIndexBounding]);
    }
  }

  return  (
      <table className='grid'>
        <tbody>
          {chunks.map((heroArray: Hero[], rowIndex: number) => {
            return (
              <tr key={rowIndex} color='green' style={{ margin: "15px" }}>
                {heroArray.map((hero: Hero, colIndex) => (
                  <td key={colIndex} style={{ backgroundColor: "green", color: "white", margin: 5, padding: 10, border: markedHero.id === hero.id ? `solid 5px ${selectedHeroesCount === 0 ? "red" : selectedHeroesCount === 1 && playersCount > 1 ? "blue" : "transparent" }` : "solid 5px transparent" }}>
                    {`(${hero.id}) ${hero.name} | row: ${rowIndex + 1} col: ${colIndex + 1}`}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
  )
}
export default CardsGrid;
