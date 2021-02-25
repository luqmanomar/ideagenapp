import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/user");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  create(data) {
    return http.post("/user", data);
  }

  update(id, data) {
    return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByTitle(title) {
    return http.get(`/user/{title}`);
  }

  signIn(data) {
    return http.post("/auth/signin", data);
  }

  //check session
  // signIn() {
  //   return http.get("/auth/signin");
  // }

  signUp(data) {
    return http.post("/auth/signup", data);
  }
}

export default new UserDataService();