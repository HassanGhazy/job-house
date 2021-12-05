import http from "../http-common";
import SkillData from "../types/skill";

const getAllSkill = () => {
  return http.get<Array<SkillData>>("/skill");
};


const GlobalService = {
    getAllSkill,
};

export default GlobalService;