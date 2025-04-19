export const routes = {
  home: '/',
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgot: "/auth/forgot-password",
    reset: "/auth/reset-password",
  },
  cofrinho: {
    home: "/cofrinho",
    category: {
      list: "/cofrinho/category",
      create: "/cofrinho/category/create",
    },
    extract: "/cofrinho/extract",
  }
};
