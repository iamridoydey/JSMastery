function fetchDataA(){
  return fetch('https://dummyjson.com/users').then((data)=>{
    return data.json()
  }).catch((error)=> console.log(error))
}

function fetchDataB(){
  return fetch('https://dummyjson.com/users/9').then((data)=>{
    return data.json()
  }).catch((error)=> console.log(error))
}

function fetchDataC(){
  return fetch('https://dummyjson.com/users/3').then((data)=>{
    return data.json()
  }).catch((error)=> console.log(error))
}

Promise.all([fetchDataA(),fetchDataB(),fetchDataC()]).then(data=> console.log(data)).catch((error)=> console.log(error))