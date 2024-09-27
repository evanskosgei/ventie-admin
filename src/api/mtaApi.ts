import { del, get, post } from "./base";

const mtaApi = {
  auth: {
    login: (data: any) => post("/admin/login", data),
  },
};

export default mtaApi;
