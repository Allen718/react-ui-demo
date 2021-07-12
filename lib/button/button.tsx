import React, {ButtonHTMLAttributes} from 'react';
import './button.scss'
import {classes, classGroup, scopedClassMarker} from "../helpers/classes";
import Icon from "../icon/icon";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Type?:'default'| 'primary' | 'disabled' | 'dashed' | 'danger' | 'warning'
  icon?: string
  position?: 'left' | 'right'
  loading?: boolean
  size?:'large'|'middle'|'small'
  
}

const Button: React.FunctionComponent<Props> = (props) => {
    const sc=scopedClassMarker('fui-button')
  
  const cg=classGroup('fui-button')
 
  
  const {className, children, Type, position, icon, loading,size, ...rest} = props
  // console.log(x({position, Type}));
  return (
      <button className={classes(className,'fui-button',cg({Type, position,size}))} {...rest}>
        {loading ? (
          <Icon name="loading" className={sc({icon:true,loading:loading})}/>
        ) : (
          icon && <Icon name={icon} className={`fui-button-icon `}/>
        )}
        <span className={'fui-button-content'}>{children}</span>
      </button>
    )
  }
;
Button.defaultProps = {
  // Type:'default',
  position: 'left',
  loading:false,
  size:'middle',
};
export default Button;