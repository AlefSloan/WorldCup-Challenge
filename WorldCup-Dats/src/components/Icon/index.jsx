import { ReactComponent as backArrow } from './svgs/back-arrow.svg';
import { ReactComponent as leftArrow } from './svgs/left-arrow.svg';
import { ReactComponent as rightArrow } from './svgs/right-arrow.svg';
import { ReactComponent as profile } from './svgs/profile.svg';

const icons = {
  backArrow,
  leftArrow,
  rightArrow,
  profile,
}

export const Icon = ({ name, ...props }) => {
  const Element = icons[name];

  return <Element { ...props } />
}