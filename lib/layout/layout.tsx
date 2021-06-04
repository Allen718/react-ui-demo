import React, {ReactElement} from 'react';
import {scopedClassMarker} from "../helpers/classes";
import './layout.scss'
import Aside from "./aside";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}

const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props
  const children = props.children as Array<ReactElement>;
  const hasAside = children.length > 0 && children.reduce((result, node) => result || node.type === Aside
    , false)
  const sc = scopedClassMarker('fui-layout')

  return (<div className={sc({'':true,hasAside}, {extra: className})} {...rest}>
    {props.children}
  </div>)
};
export {Layout};
export {default as Header} from './header';
export {default as Aside} from './aside';
export {default as Content} from './content';
export {default as Footer} from './footer';
export default Layout;