'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'main';
  }


  //判断用户名密码是否正确
  async checkLogin() {
    const { ctx } = this;
    let userName = ctx.request.body.userName
    let password = ctx.request.body.password
    const sql = `SELECT userName FROM admin_user WHERE userName='${userName}' and password=${password};`;

    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {

      //登录成功,进行session缓存
      let openId = new Date().getTime()
      this.ctx.session.openId = { 'openId': openId }
      ctx.body = { 'data': '登录成功', 'openId': openId }

    } else {
      ctx.body = { data: '登录失败' }
    }
  }

  // 获取文章类别信息
  async getTypeInfo() {
    const { ctx } = this;
    const res = await this.app.mysql.select('type')
    ctx.body = { data: res }
  }

  // 添加文章
  async addArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article', tmpArticle)
    console.log(result)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId
    }
  }

  // 修改文章
  async updateArticle() {
    let tmpArticle = this.ctx.request.body

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess)
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }

  // 显示文章列表
  async getArticleList() {
    let sql = `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
    article.view_count as view_count,
    type.typeName as typeName  
    FROM article LEFT JOIN type ON article.type_id = type.Id order by article.id desc`;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { list: results };
  }


  //删除文章
  async delArticle() {
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article', { 'id': id })
    this.ctx.body = { data: res }
  }

  //根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    let id = this.ctx.params.id

    let sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              article.article_content as article_content,
              DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
              article.view_count as view_count,
              type.typeName as typeName,
              type.id as typeId
              FROM article LEFT JOIN type ON article.type_id = type.Id 
              WHERE article.id = ${id};`
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

}

module.exports = MainController;