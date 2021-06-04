import React from 'react';
import {scopedClassMarker} from "../helpers/classes";
interface Props extends React.HTMLAttributes<HTMLElement>{}
const Header:React.FunctionComponent<Props>=(props)=>{
  const {className,...rest}=props
  const sc=scopedClassMarker('fui-layout')
  return(<div className={sc('header',{extra:className})} {...rest}>{props.children}</div>)
};
export default Header;