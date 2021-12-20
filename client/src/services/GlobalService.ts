import http from "../http-common";
import SkillData from "../types/skill";

const getAllSkill = () => {
  return http.get<Array<SkillData>>("/skill");
};

const getUser = () => {
  return http.get(`/get-user-info`);
};

const getSearchResult = (edu: string, proj: string, desc: string, skill: string, type: string) => {
  return http.get<Array<any>>(`/search/all?edu=${edu}&proj=${proj}&desc=${desc}&skill=${skill}&type=${type}`);
};

const checkPassword = (id: string, type: string, data: { password: string }) => {
  return http.post<{ message: string }>(`/${type}/${id}/password`, { data });
};

const remove = (type: string, id: string) => {
  console.log("type + id" , type + " " + id);
  return http.delete(`/${type}/${id}`);
};

const GlobalService = {
  getAllSkill,
  getUser,
  getSearchResult,
  checkPassword,
  remove,
};

export default GlobalService;