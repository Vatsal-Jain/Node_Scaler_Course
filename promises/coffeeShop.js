function placeOrder(drink) {
  return new Promise(function (resolve, reject) {
    if (drink === "coffee") {
      resolve("order for cofee received");
    } else {
      reject("order rejected");
    }
  });
}

function processOrder(order) {
  return new Promise(function (resolve) {
    console.log("order is being prepraerde");
    resolve("Order is prepared");
  });
}

// chaining of promise
// solution with promise
// placeOrder("coffee").then(function(orderPlaced){
//     console.log(orderPlaced)
//     let orderIsProcessed = processOrder(orderPlaced)
//     return orderIsProcessed
// }).then(function(processedOrder){console.log(processedOrder)}).catch(function(err){
//     console.log(err)
// })

// Async Await

// Solution with async/await

async function serveOrder() {
  try {
    let orderPlaced = await placeOrder("tea");
    console.log(orderPlaced);
    let processOrdered = await processOrder(orderPlaced);
    console.log(processOrdered);
  } catch (e) {
    console.log(e);
  }
}

serveOrder();
