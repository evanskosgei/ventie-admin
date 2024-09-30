import Post from "./base/post";
import get from "./base/get";
import Delete from "./base/delete";

const mtaApi = {
  auth: {
    login: (data) => Post("/admin/login", data),
  },
  creators:{
    fetch_creators: (data) => Post('admin/get-creators', data),
    fetch_creator_by_id:(id)=>Post("admin/get-creator", id),
    verify:(data)=>Post('admin/verify-creator', data),
  },
  admins:{
    fetch_admins:()=>Post('admin/get-admins')

  },
};

export default mtaApi;
