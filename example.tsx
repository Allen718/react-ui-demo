import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import FormExample from './lib/form/form.example';
import InputExample from './lib/input/input.example';
import ScrollExample from './lib/scroll/scroll.example'
import logo from './lib/assets/logo.png';
import text from './lib/assets/text.png'
import './example.scss';
import { Header, Footer, Content, Aside, Layout } from './lib/layout/layout';

ReactDOM.render(
  <Router>
    <Layout className={'site-page'}>
      <Header className={'site-header'}>
        <div className="logo">
          <img src={logo} />
        </div>
        <div className={'text'}>
          <img src={text} />
        </div>
      </Header>
      <Layout>
        <Aside className={'site-aside'}>
          <h2>组件</h2>
          <ul>
            <li>
              <NavLink to="/icon">Icon</NavLink>
            </li>
            <li>
              <NavLink to="/button">Button</NavLink>
            </li>
            <li>
              <NavLink to="/input">Input</NavLink>
            </li>
            <li>
              <NavLink to="/dialog">dialog</NavLink>
            </li>
            <li>
              <NavLink to="/layout">layout</NavLink>
            </li>
            <li>
              <NavLink to="/form">form</NavLink>
            </li>
            <li>
              <NavLink to="/scroll">scroll</NavLink>
            </li>
          </ul>

        </Aside>
        <Content className={'site-main'}>
          <Route path="/icon" component={IconExample} />
          <Route path="/button" component={ButtonExample} />
          <Route path="/input" component={InputExample} />
          <Route path="/dialog" component={DialogExample} />
          <Route path="/layout" component={LayoutExample} />
          <Route path="/form" component={FormExample} />
          <Route path="/scroll" component={ScrollExample} />
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; 方应杭
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));