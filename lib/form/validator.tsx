import {FormValue} from "./form";

interface FormRules {
  key: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  validator?: (name: string) => Promise<string>
}

type OneError = string | Promise<string>


export interface FormErrors {
  [key: string]: OneError[]
}

function isEmpty(value: any) {
  if (value === '' || value === undefined || value == null) {
    return true
  } else {
    return false
  }
}

export function noError(errors: FormErrors) {
  return Object.keys(errors).length === 0;
};

const validator = (formValue: FormValue, rules: Array<FormRules>, callback: (errors: FormErrors) => void): FormErrors => {
  let errors: {[key:string]:OneError[]} = {};
  
  function addError(key: string, error: OneError) {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(error)
  }
  
  rules.map((rule) => {
    const value = formValue[rule.key]
    if (rule.validator) {
      const promise = rule.validator(value)
      addError(rule.key, promise)
    }
    
    if (rule.required && isEmpty(value)) {
      addError(rule.key, 'required')
    }
    if (rule.maxLength && value!.length > rule.maxLength) {
      addError(rule.key, 'maxLength')
      
    }
    if (rule.minLength && value!.length < rule.minLength) {
      addError(rule.key, 'minlength')
    }
    if (rule.pattern) {
      if (!(rule.pattern.test(value))) {
        addError(rule.key, 'pattern')
      }
    }
  })
  //关于泛型守卫
  function hasError(item: [string, undefined] | [string, string]): item is [string, string] {
    return typeof item[1] === 'string';
  }
  const flattenErrors = flat<[string,OneError]>(Object.keys(errors).map(
    key => errors[key].map<[string,OneError]>((error: OneError) => [key, error])));
  const promiseAllErrors = flattenErrors.map(([key, promiseOrString]) => {
    const promise = promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString)
    return promise.then<[string, undefined], [string, string]>(
      () =>
        [key, undefined]
      , (reason) =>
        [key, reason]
    )
  })
  
  
  Promise.all(promiseAllErrors).then(results =>
    callback(zip(results.filter<[string,string]>(hasError)))
  )
  return errors
};

function zip(array: Array<[string, string]>) {
  const result: { [key: string]: string[] } = {};
  array.map(([key, value]) => {
      result[key] = result[key] || [];
      result[key].push(value);
    }
  )
  return result
}

function flat<T>(array: Array<T|T[]>) {
  const result:T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      result.push(...array[i] as T[])
    } else {
      result.push(array[i] as T)
    }
  }
  return result
};

// function fromEntries(array: Array<[string, string[]]>) {
//   const result: { [key: string]: string[] } = {}
//   for (let i = 0; i < array.length; i++) {
//     console.log(array[i][1])
//     result[array[i][0]] = array[i][1]
//   }
//   return result
// }

export default validator;