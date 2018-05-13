// function Async1(){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			console.log("async1");
// 			resolve("return async1");
// 		},1000);
// 	});
// };
// function Async2(){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			console.log("async2");
// 			resolve("return async2");
// 		},1000);
// 	});
// };
// function Async3(){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			console.log("async3");
// 			resolve("return async3");
// 		},1000);
// 	});
// }
// function init(){
// 		Async1().then((data)=>{
// 			console.log("cb1" + data);
// 			if(0){
// 				console.log("if");
// 				return Async2()
// 			}else{
// 				console.log("else");
// 			}
// 		}).then((data)=>{
// 			console.log("cb2 " + data);
// 		}).then((data)=>{
// 			console.log("cb3 " + data);
// 		});
// };

// init();


Promise.resolve('foo')
  // 1. Receive "foo", concatenate "bar" to it, and resolve that to the next then
  .then(function(string) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
      	console.log(string);
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  // 2. receive "foobar", register a callback function to work on that string
  // and print it to the console, but not before returning the unworked on
  // string to the next then
  .then(function(string) {
    setTimeout(function() {
      string += 'baz';
      console.log(string);
    }, 1)
    return string;
  })
  // 3. print helpful messages about how the code in this section will be run
  // before the string is actually processed by the mocked asynchronous code in the
  // previous then block.  
  .then(function(string) {
    console.log("Last Then:  oops... didn't bother to instantiate and return " +
                "a promise in the prior then so the sequence may be a bit " +
                "surprising");

    // Note that `string` will not have the 'baz' bit of it at this point. This 
    // is because we mocked that to happen asynchronously with a setTimeout function
    console.log(string);
  });