import React, {ReactElement} from 'react';
import Input from "../input/Input";
import './form.scss';
import {scopedClassMarker} from "../helpers/classes";


interface FormValue {
  [A: string]: any
};

interface Props {
  value: FormValue;
  field: Array<{ name: string, label: string, input: { type: string } }>;
  buttons: ReactElement,
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onChange: (value: FormValue) => void
  errors: { [key: string]: string[] }
  transformError:(message:string)=>string;
}

const Form: React.FunctionComponent<Props> = (props) => {
  
  const sc = scopedClassMarker('fui')
  const {errors} = props
  console.log('error123', errors);
  const formData = props.value;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(e)
  };
  const onInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValue = {...formData, [name]: e.target.value}
    props.onChange(newFormValue);
  };
  const transformError = (message: string) => {
    const map: any = {
      required: '必填',
      minLength: '太短',
      maxLength: '太长',
    };
    return props.transformError && props.transformError(message) || map[message] || '未知错误';
  };
  return (
    <form onSubmit={submit}>
      <table className={sc('form')}>
        <tbody>
        {props.field.map(i => {
            return <tr key={i.name} className={sc('form-tr')}>
              <td className={sc('form-td')}> {i.label}</td>
              <td className={sc('form-td')}>
                <Input type={i.input.type}
                       value={formData[i.name]}
                       onChange={onInputChange.bind(null, i.name)}
                />
                <div className="fui-form-error">{
                  errors[i.name] ?
                    errors[i.name].map(i=>transformError(i)).join(' '):
                    <span>&nbsp;</span>
                } </div>
              </td>
            </tr>
          }
        )}
        
        <tr>
          <td></td>
          <td>{props.buttons}</td>
        </tr>
        </tbody>
      </table>
    </form>
  )
};
export default Form;
export {FormValue}