import { FC } from 'react';
import './index.scss';

type BannerProps = { imageSrc: string, imageAlt: string }

const Banner: FC<BannerProps> = ({ imageSrc, imageAlt }) => {
    return (
        <div className='banner'>
            <img src={imageSrc} alt={imageAlt} />
        </div>
    )
}
export default Banner;