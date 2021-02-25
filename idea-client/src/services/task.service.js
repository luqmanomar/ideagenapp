import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/task");
  }

  get(id) {
    return http.get(`/task/${id}`);
  }

  create(data) {
    return http.post("/task", data);
  }

  update(id, data) {
    return http.put(`/task/${id}`, data);
  }

  delete(id) {
    return http.delete(`/task/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByTitle(title) {
    return http.get(`/task/{title}`);
  }
}

export default new TaskDataService();