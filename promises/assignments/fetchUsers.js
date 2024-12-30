function fetchUsers(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((data) => resolve(data.json()))
      .catch((error) => reject(error));
  });
}

fetchUsers("https://dummyjson.com/users")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
