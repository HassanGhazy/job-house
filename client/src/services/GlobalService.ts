import http from "../http-common";
import SkillData from "../types/skill";

const getAllSkill = () => {
  return http.get<Array<SkillData>>("/skill");
};

const getUser = () => {
  return http.get(`/get-user-info`);
};

const GlobalService = {
    getAllSkill,
    getUser,
};

export default GlobalService;