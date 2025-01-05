import { createUserPayload, credentialPayload, UserService } from "../../services/user";

const queries = {
  getUsers: async () => await UserService.findAllUsers(),
};

const mutations = {
  createUser: async (_: any, payload: createUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },

  userLogin: async (_: any, payload: credentialPayload) => {
    return await UserService.login(payload);
  },

  getCurrentUser: async(_: any, parameters: any, context: any) => {
    return await context.user;
  },
};


export const resolvers = { queries, mutations };
