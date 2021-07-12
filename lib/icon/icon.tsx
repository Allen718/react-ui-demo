import React from 'react';
import './importIcons';
import './icon.scss';
import {classes} from '../helpers/classes';
import './icons/wechat.svg'

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string
  onClick?: React.MouseEventHandler<SVGElement>
  size?: number
  color?: string
  style?: React.CSSProperties
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  const {className, name, size,style, children, ...restProps} = props
  return (
    <svg
      className={classes('icon', className)}
      aria-hidden="true"
      style={Object.assign({}, style, {
      width: size + 'px',
      height: size + 'px'
    })} {...restProps}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
};
export default Icon;