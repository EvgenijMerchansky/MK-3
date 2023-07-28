import { FC } from 'react';
import './index.scss';

type TextBoxProps = { message: string }

const TextBox: FC<TextBoxProps> = ({ message }) => {
  return (
    <div className='content'>
        <h1 className='content-title'>{message}</h1>
    </div>
  )
}
export default TextBox;