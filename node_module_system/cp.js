const cp = require('child_process')

console.log("who is this " +cp.execSync('node demo.js'))