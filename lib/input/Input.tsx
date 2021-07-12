import React, { InputHTMLAttributes } from "react";
import { scopedClassMarker } from "../helpers/classes";
import './input.scss'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  addBefore?: string;
  addAfter?:string;

}
const Input: React.FunctionComponent<Props> = (props) => {
  const sc = scopedClassMarker('fui')
  const { className, addBefore, addAfter, ...rest } = props
  return (<label>{addBefore && (
    <div className="addon-before-wrapper">
      {typeof addBefore === 'string' ? (
        <span className="before-string">{addBefore}</span>
      ) : (
        addBefore
      )}
    </div>
  )}<input className={sc('input')} {...rest} />
  </label>)
};
export default Input;