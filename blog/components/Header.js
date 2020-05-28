import React from 'react';
import Router from 'next/router'
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, VideoCameraOutlined, UserOutlined } from '@ant-design/icons'

const Header = () => {
  const typeLink = (e) => {
    if (e.key === 'home') {
      Router.push('/index')
    } else if (e.key === 'video') {
      Router.push('/list')
    } else if (e.key === 'life') {

    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <span className="header-logo">Dobry</span>
          <span className="header-txt">个人博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">

            <Menu.Item key="home" onClick={typeLink}>
              <HomeOutlined />
                  博客首页
            </Menu.Item>

            <Menu.Item key="video" onClick={typeLink}>
              <VideoCameraOutlined />
                  视频视频
            </Menu.Item>

            <Menu.Item key="life" onClick={typeLink}>
              <UserOutlined />
                  快乐生活
            </Menu.Item>
            
          </Menu>
        </Col>
      </Row>
    </div>
  )


}

export default Header