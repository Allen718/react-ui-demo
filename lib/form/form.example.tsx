import React, {useState} from 'react';
import Form, {FormValue} from './form'
import Validator, {FormErrors} from "./validator";
import Button from "../button/button";

const userName = ['frank', 'jack', 'alice', 'andy']
const checkUserName = (name: string, success: () => void, fail: () => void) => {
  setTimeout(() => {
    if (userName.indexOf(name) >= 0) {
      fail()
      
    } else {
      success()
    }
  }, 3000)
};
export default () => {
  //初始数据值
  const [formData, setFormData] = useState<FormValue>({
    username: 'frank',
    password: 123456,
  })
  const [field] = useState([
    {name: 'username', label: '营业执照', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}}
  ]);
  //关于错误的展示
  const [errors, setErrors] = useState({});
  //翻译错误
  const transformError = (message: string) => {
    const mention: any = {
      unique: '用户名已经存在',
      require: '必传',
      minlength: '太短',
      maxlength: '太长',
    }
    return mention[message] || '未知错误';
  };
  const validator = (name: string) => {
    return new Promise<string>((resolve, reject) => {
      checkUserName(name, resolve, () => {
        reject('unique')
      })
    })
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 9, maxLength: 18},
      {key: "username", pattern: /^[A-Za-z0-9]+$/},
      {key: 'username', validator},
      {key: 'username', validator},
      {key: 'password', validator},
      {key: 'password', validator},
      
      {key: 'password', required: true}]
    const error = Validator(formData, rules, (errors: FormErrors) => {
      setErrors(errors)
    });
    console.log(error)
    // if (noError()) {
    //   证明没有错
    // }
    
  };
  const onChange = (newFormData: FormValue) => {
    setFormData(newFormData);
  };
  const buttons = (
    <>
      <Button type={"submit"} Type={'primary'}>提交</Button>
      <Button>取消</Button>
    </>
  )
  return (
    <Form
      value={formData}
      field={field}
      errors={errors}
      buttons={buttons}
      transformError={transformError}
      onSubmit={onSubmit}
      onChange={onChange}/>
  )
};
