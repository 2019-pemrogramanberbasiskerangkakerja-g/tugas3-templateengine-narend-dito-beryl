
var util = require('util'),
    fs = require('fs'),
    haml = require('hamljs')
    
var options = {
  filename: 'page.haml',
  locals: {
    title: 'Welcome',
    body: 'wahoo',
    usersOnline: 15
  }
}

let data = haml.render(fs.readFileSync('page.haml'), options)

fs.writeFile('tes.html', data, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 