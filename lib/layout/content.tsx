import React from 'react';
import {scopedClassMarker} from "../helpers/classes";
interface Props extends React.HTMLAttributes<HTMLElement>{}
const Content:React.FunctionComponent<Props>=(props)=>{
  const {className,...rest}=props
  const sc=scopedClassMarker('fui-layout')
  return(
    <div className={sc('content',{extra:className})} {...rest}>{props.children}</div>
  );
}

export default Content;