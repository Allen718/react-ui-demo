

import React from 'react';
import ReactDom from 'react-dom';
import Icon from './icon/icon';
const fn: React.MouseEventHandler = (e) => {
  console.log(e.target)
}
ReactDom.render(<div>
  <Icon name='wechat'
    className="wechat"
    onClick={fn}
    onMouseEnter={() => {
      console.log('enter')
    }}
    onMouseLeave={() => {
      console.log('leave')
    }}
  />
</div>, document.querySelector('#root'));
