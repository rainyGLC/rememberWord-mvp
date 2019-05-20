const Knex = require('./knex.js');
const Base = require('./base.js');
class Collect_word extends Base{
  constructor(props='collect_word') {
    super(props);
  }
  joinWord(params) {
    return Knex('collect_word')
    .leftJoin('word','collect_word.word_id', '=', 'word.id')
    .select('collect_word.id',{word_name:'word.name'},{word_title:'word.title'},
    {word_zn_display:'word.zn_display'},'collect_word.word_id')
    .where(params)
  }
}
module.exports = Collect_word;
