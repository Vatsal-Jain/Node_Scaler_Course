const fs = require('fs')

//read a file
// let fileContent = fs.readFileSync('xyz.txt')
// console.log("" +fileContent)

// //writtig=ng a file
// fs.writeFileSync('xyz.txt',"adding a data")


// //apend a file
// fs.appendFileSync('xyz.txt'," added sapce while appending")

// // delete a file

// fs.unlinkSync('xyz.txt')



//Directories

//create a directory

// fs.mkdirSync('myDIrectory')

// check content inside directory
let folderPath = '/Users/vatsal/Desktop/nodejs/node_module_system/myDIrectory'
// let folderContent = fs.readdirSync(folderPath)
// console.log(folderContent)

// to check directory exists or not
// let directExists = fs.existsSync('cp.js')
// console.log(directExists)

//Delete a directory

fs.rmdirSync('myDirectory')