// Callback hell
// setTimeout(() => {
//   console.log("Hi");
//   setTimeout(() => {
//     console.log("Hello");
//     setTimeout(() => {
//       console.log("Hello there");
//     }, 5000);
//   }, 3000);
// }, 1000);

// using promises
// const wait = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// };

// wait(1000).then(() => {
//   console.log("Hi");
//   wait(3000).then(() => {
//     console.log("Hello");
//     wait(5000).then(() => {
//       console.log("Hello there");
//     });
//   });
// });

// Use async await
const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
    resolve()
  });
};

function callback(){
  console.log("Completed above one")
}
const printGreeting = async () => {
  await wait(1000);
  console.log("Hi");
  await wait(3000);
  console.log("Hello");
  await wait(5000).then(callback);
  console.log("Hello there");
};

printGreeting();
