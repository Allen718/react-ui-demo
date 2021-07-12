export default function scrollBarWidth() {
  const body = document.body;
  const box = document.createElement('div')
  const boxStyle = box.style;
  boxStyle.position = 'absolute'
  //把div放到屏幕之外
  boxStyle.top = boxStyle.left = '-9999px'
  boxStyle.width = boxStyle.height = '100px'
  boxStyle.overflow = "scroll"
  body.appendChild(box)
  //获取宽度
  const width = box.offsetWidth - box.clientWidth
  body.removeChild(box)
  return width
}