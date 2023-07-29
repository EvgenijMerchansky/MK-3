import { FC } from 'react';
import './index.scss';

type TextBoxProps = { message: string, classNames?: string }

const TextBox: FC<TextBoxProps> = ({ message, classNames }) => {
  return (
    <div className='content'>
        <h1 className={`content-title ${classNames}`}>{message}</h1>
    </div>
  )
}
export default TextBox;