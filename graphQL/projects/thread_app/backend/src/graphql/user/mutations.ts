export const mutations = `#graphql
  createUser(firstName: String!, lastName: String!, email: String!, password: String!): Int,
  userLogin(email: String!, password: String!): String,
  getCurrentUser: User
`