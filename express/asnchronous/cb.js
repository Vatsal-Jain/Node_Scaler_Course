const fs = require('fs')


console.log('before')

// let data =fs.readFileSync('f1.txt')
// console.log('read file data ' + data)

// let data2 =fs.readFileSync('f2.txt')
// console.log('read file 2 data ' + data2)



fs.readFile('f1.txt',cb1)

function cb1(err,data){
    if(err){
        console.log(err)
    }
    console.log("file 1 data" + data)
    fs.readFile('f2.txt',cb2)
}



function cb2(err,data){
    if(err){
        console.log(err)
    }
    console.log("file 2 data" +data)
}



console.log('after')