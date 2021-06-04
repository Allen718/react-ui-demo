import {classes,scopedClassMarker} from '../classes'

describe('classes', () => {
    it('接受一个参数', () => {
      expect(classes('a')).toEqual('a')
    })
    it('接受两个参数', () => {
      expect(classes('a','12')).toEqual('a 12')
    })
    it('接受undefined', () => {
      expect(classes('a',undefined)).toEqual('a')
    })
    it('接受多个参数', () => {
      expect(classes('a',undefined,null,'你好')).toEqual('a 你好')
    })
    it('接受0参数', () => {
      expect(classes()).toEqual('')
    })
})
describe('scopedClassMarker', () => {
  const sc=scopedClassMarker('fui-dialog')
    it('接受字符串或对象', () => {
     const sc=scopedClassMarker('fui-layout');
     expect(sc('header')).toEqual('fui-layout-header')
     expect(sc('undefined')).toEqual('fui-layout')
     expect(sc({x:true})).toEqual('fui-layout-x')
     expect(sc({x:true,y:false})).toEqual('fui-layout-x')
     expect(sc({x:true,y:true})).toEqual('fui-layout-x fui-layout-y')

    })

})