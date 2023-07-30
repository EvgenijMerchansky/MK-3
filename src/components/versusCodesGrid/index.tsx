import { FC, useEffect, useState, useMemo } from 'react';
import { VersusCodeModel } from '../../models/VersusCodeModel';
import messages from '../../helpers/messages';
import constants from '../../helpers/constants';
import rotationSound from '../../assets/sounds/secret_code_rotation.mp3';
import VersusCode from '../versusCode';
import './index.scss';

type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type VersusCodesGridProps = { versusCodes: VersusCodeModel[], defaultVersusCode: VersusCodeModel }

const VersusCodesGrid: FC<VersusCodesGridProps> = ({ versusCodes, defaultVersusCode }) => {
    const rotationClassNames = 'rotation-active rotation-reverse-active';
    const [key, setKey]: StateType<string> = useState<string>('');
    const [rotation, setRotation]: StateType<boolean> = useState<boolean>(false);
    const [selectedVersusCode, setSelectedVersusCode]: StateType<VersusCodeModel> = useState<VersusCodeModel>(defaultVersusCode);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return (): void => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

    useEffect(() => {
        if (key === '') return;
        if (rotation) return;
        setKey(key);
        setRotation(rotation);
        rotateVersusCode();
    }, [key, rotation]);

    useEffect(() => {
        setSelectedVersusCode(selectedVersusCode);
    }, [selectedVersusCode]);

    const makeSound = (): any => new Audio(rotationSound).play();

    const rotateVersusCode = (): void => {
        versusCodes.forEach((versusCode: VersusCodeModel) => {
            if (versusCode.key === key && versusCode.id !== selectedVersusCode.id && !rotation) {
                setRotation(true);
                setSelectedVersusCode(versusCode);
                makeSound();
                setTimeout((): void => {
                    setRotation(false);
                }, constants.versusCodeRotationMilliseconds);
            }
        });
    }

    const handleKeyPress = ({ key }: KeyboardEvent): void => {
        key = key.toLowerCase();
        switch(key) {
            case messages.q.defaultMessage:
            case messages.w.defaultMessage:
            case messages.e.defaultMessage:
            case messages.r.defaultMessage:
            case messages.t.defaultMessage:
            case messages.y.defaultMessage:
                setKey(key);
            break;
            default:
            break;
        }
    }

    // console.log('click', rotation);


    // console.log(selectedVersusCode, 'selVerCode')

    return (
        <ul className='versus-codes'>
            {versusCodes.map((versusCode: VersusCodeModel) => 
                <VersusCode key={`${versusCode.id}${versusCode.key}`} versusCode={versusCode} className={`versus-code ${selectedVersusCode.id === versusCode.id && rotation ? rotationClassNames : ''}`} />
            )}
        </ul>
    );
}
export default VersusCodesGrid;