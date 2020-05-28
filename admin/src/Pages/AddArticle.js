import React, { useState, useEffect } from 'react';
import marked from 'marked';
import axios from 'axios';
import servicePath from '../config/apiUrl';

import '../static/style/AddArticle.css';

import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
const { Option } = Select;
const { TextArea } = Input;



function AddArticle(props) {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introduce, setIntroduce] = useState()            //简介的markdown内容
  const [introduceHtml, setIntroduceHtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别


  useEffect(() => {
    getTypeInfo()
    // 获取文章id
    let tmpId = props.match.params.id;
    if(tmpId){
      setArticleId(tmpId);
      getArticleById(tmpId)
    }
  }, [])


  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContext = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  }

  const changeIntroduce = (e) => {
    setIntroduce(e.target.value);
    let html = marked(e.target.value);
    setIntroduceHtml(html);
  }

  const getTypeInfo = () => {
    axios(`${servicePath.getTypeInfo}`, { withCredentials: true }).then(res => {
      if (res.data.data === '没有登录') {
        message.error('请先登录');
        localStorage.removeItem('openId');
        props.history.push('/')
      } else {
        setTypeInfo(res.data.data)
      }
    })
  }

  const selectTypeHandler = (value) => {
    setSelectType(value);
  }

  const releaseArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introduce) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    message.success('检验通过')
    let dataProps = {}   //传递到接口的参数
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introduce
    dataProps.addTime = showDate


    if (articleId == 0) {
      console.log('articleId=:' + articleId)
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          setArticleId(res.data.insertId)
          if (res.data.isSuccess) {
            message.success('文章添加成功')
          } else {
            message.error('文章添加失败');
          }
        }
      )
    } else {   // 修改文章
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        header: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.isSuccess) {
            message.success('文章保存成功')
          } else {
            message.error('保存失败');
          }


        }
      )
    }
  }

  const saveArticle = () => {

  }


  // 根据id显示文章内容
  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        //let articleInfo= res.data.data[0]
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        let html = marked(res.data.data[0].article_content)
        setMarkdownContent(html)
        setIntroduce(res.data.data[0].introduce)
        let tmpInt = marked(res.data.data[0].introduce)
        setIntroduceHtml(tmpInt)
        setShowDate(res.data.data[0].addTime)
        setSelectType(res.data.data[0].typeId)

      }
    ).catch(err=>{console.log(err)})
  }




  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="博客标题"
                size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContext}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              >

              </div>

            </Col>
          </Row>

        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large" onClick={saveArticle}>暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={releaseArticle}>发布文章</Button>
              <br />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introduce}
                onChange={changeIntroduce}
              />
              <br /><br />
              <div className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introduceHtml }}
              ></div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>


        </Col>
      </Row>
    </div>
  )
}
export default AddArticle