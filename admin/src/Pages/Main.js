import React from 'react';
import {BrowserRouter ,Route} from 'react-router-dom'
import 'antd/dist/antd.css';

import Loadable from "react-loadable"

const routersConfig = [
  {
      name: '/',
      path: '/',
      exact: true,
      component: Loadable({
          loader: () => import('./Login'),
          loading: () => <div />
      })
  },
  {
      name: 'index',
      path: '/index',
      exact: false,
      component: Loadable({
          loader: () => import('./AdminIndex'),
          loading: () => <div>Loading...</div>
      })
  }
]

function Main(){
  return (
    <BrowserRouter>
    {routersConfig.map((r, key) => <Route component={r.component} exact={r.exact} key={key} path={r.path} />)}
    </BrowserRouter>
  )
}

export default Main;