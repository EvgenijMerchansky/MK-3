import { FC, useEffect, useState } from 'react';
import { VersusCodeModel } from '../../models/VersusCodeModel';
import constants from '../../helpers/constants';
import rotationSound from '../../assets/sounds/secret_code_rotation.mp3';
import VersusCode from '../versusCode';
import './index.scss';

type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type VersusCodesGridProps = { versusCodes: VersusCodeModel[], defaultVersusCode: VersusCodeModel, keyCode: string }

const VersusCodesGrid: FC<VersusCodesGridProps> = ({ versusCodes, defaultVersusCode, keyCode }) => {
    const rotationClassNames = 'rotation-active rotation-reverse-active';
    const [rotation, setRotation]: StateType<boolean> = useState<boolean>(false);
    const [selectedVersusCode, setSelectedVersusCode]: StateType<VersusCodeModel> = useState<VersusCodeModel>(defaultVersusCode);

    useEffect(() => {
        if (keyCode === '') return;
        if (rotation) return;
        setRotation(rotation);
        rotateVersusCode();
    }, [keyCode, rotation]);

    useEffect(() => {
        setSelectedVersusCode(selectedVersusCode);
    }, [selectedVersusCode]);

    const makeSound = (): any => new Audio(rotationSound).play();

    const rotateVersusCode = (): void => {
        versusCodes.forEach((versusCode: VersusCodeModel) => {
            if (versusCode.key === keyCode && versusCode.id !== selectedVersusCode.id && !rotation) {
                setRotation(true);
                setSelectedVersusCode(versusCode);
                makeSound();
                setTimeout((): void => {
                    setRotation(false);
                }, constants.versusCodeRotationMilliseconds);
            }
        });
    }

    return (
        <ul className='versus-codes'>
            {versusCodes.map((versusCode: VersusCodeModel) => 
                <VersusCode key={`${versusCode.id}${versusCode.key}`} versusCode={versusCode} className={`versus-code ${selectedVersusCode.id === versusCode.id && rotation ? rotationClassNames : ''}`} />
            )}
        </ul>
    );
}
export default VersusCodesGrid;