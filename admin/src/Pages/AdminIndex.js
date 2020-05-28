import React, { useState, useEffect } from 'react';
import '../static/style/AdminIndex.css'


import { Route } from "react-router-dom";
import Loadable from "react-loadable"

// import AddArticle from './AddArticle';
// import ArticleList from './ArticleList';
// import Comment from './Comment';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const routersConfig = [
  {
    name: 'AddArticle',
    path: '/index',
    exact: true,
    component: Loadable({
      loader: () => import('./AddArticle'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    name: 'editArticle',
    path: '/index/add/:id',
    exact: true,
    component: Loadable({
      loader: () => import('./AddArticle'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    name: 'ArticleList',
    path: '/index/list',
    exact: false,
    component: Loadable({
      loader: () => import('./ArticleList'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    name: 'comment',
    path: '/index/comment',
    exact: false,
    component: Loadable({
      loader: () => import('./Comment'),
      loading: () => <div>Loading...</div>
    })
  }
]


function AdminIndex(props) {

  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState('addArticle')

  useEffect(() => {
    console.log(localStorage.getItem('navSelected'))
    setSelectedKeys(localStorage.getItem('navSelected'));
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };


  const handleClickArticle = e => {
    switch (e.key) {
      case 'addArticle':
        props.history.push('/index')
        localStorage.setItem('navSelected', e.key)
        setSelectedKeys(e.key);
        break;
      case 'articleList':
        props.history.push('/index/list')
        localStorage.setItem('navSelected', e.key)
        setSelectedKeys(e.key);
        break;
      case 'comment':
        props.history.push('/index/Comment')
        localStorage.setItem('navSelected', e.key)
        setSelectedKeys(e.key);
    }
  }



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >Blog</div>
        <Menu theme="dark" selectedKeys={[selectedKeys]} mode="inline" onClick={handleClickArticle}>
          <Menu.Item key="addArticle">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            onClick={handleClickArticle}
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>

          </SubMenu>

          <Menu.Item key="comment">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              {/* <Route path="/index" exact component={AddArticle} />
              <Route path="/index/list" exact component={ArticleList} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/comment" exact component={Comment} /> */}
              {routersConfig.map((r, key) => <Route component={r.component} exact={r.exact} key={key} path={r.path} />)}

            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Dobry.com</Footer>
      </Layout>
    </Layout>
  )

}

export default AdminIndex