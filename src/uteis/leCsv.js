const { readFileSync } = require('fs');

module.exports = (path, isHeader = true) => {
  let arrayCsv = []
  let conteudo = readFileSync(path, { encoding: 'utf-8' })
  let header = ''
  if (isHeader) {
    header = conteudo.split('\n')[0].split(',')
  }
  conteudo.split('\n').splice(1).forEach((item) => {
    let obj = {}
    item.split(',').map((value, index) => {
      obj[header ? header[index] : String.fromCharCode(index + 97)] = value
    })
    arrayCsv.push(obj)
  })
  return {arrayCsv, header}
}; 
