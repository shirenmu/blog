import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios'

import '../public/style/pages/index.css'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'

import servicePath from '../config/apiUrl'

const Home = (list) => {
  const [myList, SetMyList] = useState(list.data)

  const renderer = new marked.Renderer();
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

  useEffect(
    ()=>{
      axios.get("http://rap2.taobao.org:38080/app/mock/234831/test1").then(res=>console.log(res))
    }
  )



  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={
                      {
                        pathname:'/detailed',
                        query:{id:item.id}
                      }
                    }>
                      <a>{item.title}</a>
                    </Link>
                    </div>
                  <div className="list-icon">
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><FolderOpenOutlined /> {item.typeName}</span>
                    <span><FireOutlined /> {item.view_count}</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: item.introduce }}></div>
                </List.Item>
              )}
            />
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
          </Col>
        </Row>

      </main>

      <footer>
        <Footer />
      </footer>

      {/* <style jsx>{
     }</style> */}

      <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  )

}


Home.getInitialProps = async()=>{
    const promise = new Promise((resolve,reject)=>{
      axios(`${servicePath.getArticleList}`).then(
        (res)=>{
          console.log(res.data)
          resolve(res.data)
        }
      )
    })
    return await promise
}

export default Home
