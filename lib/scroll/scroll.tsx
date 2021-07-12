import React, { HTMLAttributes, UIEventHandler, useState, useEffect, useRef, MouseEventHandler, TouchEventHandler } from 'react'
import scrollBarWidth from './scroll.widrh'
import './scroll.scss';
import Icon from '../icon/icon';
interface Props extends HTMLAttributes<HTMLDivElement> {
  onPull: () => void
};
//判断是否为触摸屏
// function isTouchDevice() {
//   return (('ontouchstart' in window) ||
//     (navigator.maxTouchPoints > 0) ||
//     (navigator.msMaxTouchPoints > 0));
// }
const Scroll: React.FunctionComponent<Props> = (props) => {

  const { children, ...rest } = props
  const containerRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, setBarTop] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [translate, _setTranslate] = useState(0);
  //关于下拉刷新
  const [translateY, setTranslateY] = useState(0);
  const _setBarTop = (number: number) => {
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight;
    if (number < 0) {
      return
    } else if (number > maxBarTop) {
      number = maxBarTop
      setBarTop(number)
    } else {
      setBarTop(number)
    }
  };
  const setTranslate = (number: number) => {
    if (number > 200) {
      number = 200
      _setTranslate(number)
    } else {
      _setTranslate(number)
    }
  }
  const timeIdRef = useRef<number | null>(null)
  const onScroll: UIEventHandler = (e) => {
    setBarVisible(true)
    if (timeIdRef.current) {
      window.clearTimeout(timeIdRef.current)
    }
    timeIdRef.current = window.setTimeout(() => {
      setBarVisible(false)
    }, 300);
    const scrollHeight = containerRef.current!.scrollHeight;
    const scrollTop = containerRef.current!.scrollTop;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarTop(viewHeight * scrollTop / scrollHeight)

  }
  let draggingRef = useRef(false);
  const firstBarTopRef = useRef(0);
  let firstYRef = useRef(0);
  let lastBarTop = useRef(0);
  const onMouseDownBar: MouseEventHandler = (e) => {
    lastBarTop.current = containerRef.current!.scrollTop
    firstYRef.current = e.clientY
    firstBarTopRef.current = barTop
    draggingRef.current = true
    setBarTop(barTop)
  }

  const onMouseMoveBar = (e: any) => {
    if (draggingRef.current) {
      const moveY = e.clientY - firstYRef.current
      _setBarTop(firstBarTopRef.current + moveY);
      const scrollHeight = containerRef.current!.scrollHeight
      const viewHeight = containerRef.current!.getBoundingClientRect().height
      if (moveY > 0) {
        containerRef.current!.scrollTop = lastBarTop.current + moveY * scrollHeight / viewHeight
      } else if (moveY < 0) {
        // console.log(moveY * scrollHeight / viewHeight)
        containerRef.current!.scrollTop = lastBarTop.current + moveY * scrollHeight / viewHeight
      }

    }
  }
  const onMouseUpBar = (e: any) => {
    0
    draggingRef.current = false
  }
  const onSelect = (e: Event) => {
    if (draggingRef.current) { e.preventDefault(); }
  };
  //关于手机相关
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, []);
  const lastMoveRef = useRef(0)
  const moveCountRef = useRef(0);
  const pullingRef = useRef(false);
  const onTouchStart: TouchEventHandler = (e) => {
    moveCountRef.current = 0
    const scrollTop = containerRef.current!.scrollTop
    if (scrollTop > 0) { return }
    pullingRef.current = true
    lastMoveRef.current = e.touches[0].clientY
  }
  const onTouchMove: TouchEventHandler = (e) => {
    moveCountRef.current++
    const touchMoveY = e.touches[0].clientY - lastMoveRef.current
    if (moveCountRef.current === 1 && touchMoveY < 0) {
      pullingRef.current = false
      return
    }
    if (!pullingRef.current) {
      return
    }
    setTranslate(translate + touchMoveY)
    lastMoveRef.current = e.touches[0].clientY;
    setTranslateY(200)
  }
  const onTouchEnd: TouchEventHandler = () => {
    if (pullingRef.current) {
      setTranslate(0);
      setTranslateY(0)
      props.onPull && props.onPull();
      pullingRef.current = false;
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMoveBar)
    document.addEventListener('mouseup', onMouseUpBar)
    document.addEventListener('selectstart', onSelect);
    return () => {
      document.removeEventListener('mousemove', onMouseMoveBar)
      document.removeEventListener('mouseup', onMouseUpBar)
      document.removeEventListener('selectstart', onSelect);
    }
  }, []);

  return (
    <div className='fui-scroll' {...rest} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>

      <div className="fui-scroll-inner" style={{ right: -scrollBarWidth(), transform: `translateY(${translate}px)` }} onScroll={onScroll} ref={containerRef}>
        {children}
      </div>
      {barVisible && <div className="fui-scroll-track">
        <div className="fui-scroll-bar"
          style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
          onMouseDown={onMouseDownBar}
        >
        </div>
      </div>}
      <div className="fui-scroll-pulling" style={{ height: translateY }}>
        {translateY === 200 ?
          <span className="fui-scroll-pulling-text"><Icon name='loading' /></span> :
          <span className="fui-scroll-pulling-icon">
            <Icon name='down' />
          </span>
        }
      </div>
    </div>
  )
};
export default Scroll;