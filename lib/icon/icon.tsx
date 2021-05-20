import React from 'react';
import './importIcons';
import './icon.scss';
import classes from '../helpers/classes';

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string,
  onClick: React.MouseEventHandler<SVGElement>,
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { className, name, children, ...restProps } = props
  return (
      <svg className={classes('icon', className)} aria-hidden="true"  {...restProps}>
        <use xlinkHref={name}></use>
      </svg>
  )
};
export default Icon;