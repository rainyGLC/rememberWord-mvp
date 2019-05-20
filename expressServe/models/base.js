const knex=require('./knex');
class Base{
  constructor(props) {
    this.table=props;
  }
  knex(){
    return knex(this.table)
  }
  where(params){
    return knex(this.table).where(params)
  }
  all(){
    return knex(this.table).select()
  }
  select(params){
    return knex(this.table).select().where(params);
  }
  insert(params){
    return knex(this.table).insert(params)
  }
  update(id,params){
    return knex(this.table).where('id','=',id).update(params)
  }
  delete(id){
    return knex(this.table).where('id','=',id).del()
  }
  count(params) {
    return knex(this.table).where(params).count('id as sum');
  }
}
module.exports=Base;