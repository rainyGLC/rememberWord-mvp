const Knex = require('./knex.js');
const Base = require('./base.js');
class Word extends Base{
  constructor(props='word') {
    super(props);
  }
  joinClassify(params={},pagination={}) {
    let page = pagination.page || 1;
    let limit = pagination.limit || 10;
    let offset = (page - 1) * limit;
    return Knex('word')
    .leftJoin('classify','word.classify_id', '=', 'classify.id')
    .select('word.id','word.name','word.title','word.classify_id',
      {classify_name:'classify.name'},
      'word.description','word.zn_display','word.en_display')
    .where(params)
    .orderBy('name','asc')
    .offset(offset)
    .limit(limit)//如果limit为5，则获取5条
  }
}
module.exports = Word;