import { FC } from 'react';
import { HeroModel } from '../../models/HeroModel';
import './index.scss';

type HeroPreviewProps = { hero: HeroModel, shouldBeReverse: Boolean }

const HeroPreview: FC<HeroPreviewProps> = ({ hero, shouldBeReverse }) => {
    return (
        <div className='hero-preview'>
            <h3 className='hero-preview-name'>{hero.name}</h3>
            <img src={hero.previewIcon} alt={hero.name} className={`hero-preview-img ${shouldBeReverse ? 'hero-preview-img-reverse' : ''}`} />
        </div>
    )
}
export default HeroPreview;