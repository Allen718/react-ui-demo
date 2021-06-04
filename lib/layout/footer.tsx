import React from 'react';
import {scopedClassMarker} from "../helpers/classes";
interface Props extends React.HTMLAttributes<HTMLElement>{}
const Footer:React.FunctionComponent<Props>=(props)=>{
 const {className,...rest}=props
 const sc= scopedClassMarker('fui-layout')
  return (<div className={sc('footer',{extra:className})} {...rest}>footer</div>)
};
export default Footer;