let myPromise = new Promise(function(resolve,reject){
    const a = 4
    const b = 5

    setTimeout(() => {
        if(a===b){
            resolve("The Valaues are eqaul")
        }
        else{
            reject("The Valaues are not eqaul")
        }
    },2000)
})
// //Pending State
 console.log(myPromise)



// Fullfilled State - then method
myPromise.then(function(result){
console.log(result)
})

// Rejcted State - catch method
myPromise.catch(function(result){
    console.log("rejetc state",result)
    })


 // your promise will get settled