import "./App.css";
import { gql, useQuery } from "@apollo/client";

function App() {
  const query = gql`
    query getTodosWithUser {
      getTodos {
        id
        title
        completed
        user {
          name
          email
          website
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (!loading && !error) {
    console.log("Data: ", JSON.stringify(data));
  }

  return (
    <>
      <h1>Hello GraphQL</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {data.getTodos.map((todo) => (
            <li key={todo.id}>
              <span>Name: {todo.user.name}</span><br />
              <span>Email: {todo.user.email}</span><br />
              <span>Website: {todo.user.website}</span><br />
              <span>Todos Title: {todo.title}</span><br />
              <span>IsComplete?: {todo.completed ? "Yes" : "No"}</span><br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
