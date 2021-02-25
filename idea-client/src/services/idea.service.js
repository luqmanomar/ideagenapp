import http from "../http-common";

class IdeaDataService {
  getAll() {
    return http.get("/idea");
  }

  get(id) {
    return http.get(`/idea/${id}`);
  }

  create(data) {
    return http.post("/idea", data);
  }

  update(id, data) {
    return http.put(`/idea/${id}`, data);
  }

  delete(id) {
    return http.delete(`/idea/${id}`);
  }

  deleteAll() {
    return http.delete(`/ideas`);
  }

  findByTitle(title) {
    return http.get(`/idea/{title}`);
  }

  addVote(id) {
    return http.post(`/idea/${id}/addVote`)
  }

  minusVote(id) {
    return http.post(`/idea/${id}/minusVote`)
  }
}

export default new IdeaDataService();