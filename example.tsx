import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route,NavLink} from 'react-router-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import logo from './lib/assets/logo.png' ;
import text from './lib/assets/text.png'
import './example.scss';
import {Header, Footer, Content, Aside, Layout} from './lib/layout/layout';

ReactDOM.render(
  <Router>
    <Layout className={'site-page'}>
      <Header className={'site-header'}>
        <div className="logo">
          <img src={logo}/>
        </div>
        <div className={'text'}>
          <img src={text}/>
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
              <NavLink to="/dialog">dialog</NavLink>
            </li>
            <li>
              <NavLink to="/layout">layout</NavLink>
            </li>
          </ul>
        
        </Aside>
        <Content className={'site-main'}>
          <Route path="/icon" component={IconExample}/>
          <Route path="/button" component={ButtonExample}/>
          <Route path="/dialog" component={DialogExample}/>
          <Route path="/layout" component={LayoutExample}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; 方应杭
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));