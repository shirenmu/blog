'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let result = await this.app.mysql.get('article', {});
    ctx.body = result;
  }

  async getArticleList() {
    const { ctx } = this;
    // let sql = 'SELECT article.id as id,'+
    //           'article.title as title,'+
    //           'article.introduce as introduce,'+
    //           "DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    //           'article.view_count as view_count,'+
    //           'type.typeName as typeName '+
    //           'FROM article LEFT JOIN type ON article.type_id = type.Id'

    let sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
              article.view_count as view_count,
              type.typeName as typeName  
              FROM article LEFT JOIN type ON article.type_id = type.Id`

    // let sql = 'SELECT id as id,title FROM article'

    const results = await this.app.mysql.query(sql)

    ctx.body = {
      data: results
    }
  }

  async getArticleById() {
    const { ctx } = this;
    let id = ctx.params.id;
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

    const results = await this.app.mysql.query(sql)

    ctx.body = {
      data: results
    }

  }

}

module.exports = HomeController;
