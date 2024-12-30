function random(resolve) {
  console.log(resolve())
  return resolve;
}

let p = new Promise(random);

function print() {
  console.log("Hello world");
}

p.then(print);
