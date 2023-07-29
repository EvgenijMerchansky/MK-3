import { FC } from 'react';
import { VersusCodeModel } from '../../models/VersusCodeModel';
import './index.scss';

type VersusCodeProps = { versusCode: VersusCodeModel, className: string }

const VersusCode: FC<VersusCodeProps> = ({ versusCode, className }) => {
    return (
        <li className={className}>
            <img src={versusCode.icon} alt="versus_code" className='versus-code-img' />
        </li>
    );
}
export default VersusCode;