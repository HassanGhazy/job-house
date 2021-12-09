import http from "../http-common";
import SkillData from "../types/skill";

const getAllSkill = () => {
  return http.get<Array<SkillData>>("/skill");
};

const getUser = () => {
  return http.get(`/get-user-info`);
};

const getSearchResult = (edu: string, proj: string, desc: string, skill: string) => {
  return http.get<Array<any>>(`/search/all?edu=${edu}&proj=${proj}&desc=${desc}&skill=${skill}`);
};

const GlobalService = {
    getAllSkill,
    getUser,
    getSearchResult,
};

export default GlobalService;