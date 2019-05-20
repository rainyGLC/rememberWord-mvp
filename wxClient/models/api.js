module.exports = {
  classify:'http://localhost:3000/api/classify',
  word:'http://localhost:3000/api/word',
  wordId:(id)=>`http://localhost:3000/api/word/${id}`
}