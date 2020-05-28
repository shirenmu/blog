import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix, Avatar, Comment } from 'antd'
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'

import axios from 'axios'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'

import '../public/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css';


import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import servicePath from '../config/apiUrl'




const Detailed = (props) => {


  const tocify = new Tocify();




  const renderer = new marked.Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content)

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {props.title}
              </div>

              <div className="list-icon center">
                <span><CalendarOutlined /> {props.addTime}</span>
                <span><FolderOpenOutlined /> 视频教程</span>
                <span><FireOutlined /> {props.view_count}</span>
              </div>

              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>
                {/* <ReactMarkdown
                  source={markdown}
                  escapeHtml={false}
                /> */}

              </div>

              <div>
                <Comment
                  actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                  author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      We supply a series of design principles, practical patterns and high quality design
                      resources (Sketch and Axure).
                  </p>
                  }
                >
                  {/* {children} */}
                </Comment>
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {/* <MarkNav
                className="article-menu"
                source={html}
                ordered={false}
              /> */}
              {tocify && tocify.render()}
            </div>
          </Affix>


        </Col>

      </Row>


      <Footer></Footer>

    </>
  )
}

Detailed.getInitialProps = async (context) => {
  let id = context.query.id;

  const promise = new Promise((resolve, reject) => {
    axios(` ${servicePath.getArticleById}${id}`).then(
      res => {
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed

