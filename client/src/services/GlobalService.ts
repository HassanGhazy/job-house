import http from "../http-common";
import SkillData from "../types/skill";
import PasswordData from "../types/password";

const getAllSkill = () => {
  return http.get<Array<SkillData>>("/skill");
};

const getUser = () => {
  return http.get(`/get-user-info`);
};

const getSearchResult = (edu: string, proj: string, desc: string, skill: string,type: string) => {
  return http.get<Array<any>>(`/search/all?edu=${edu}&proj=${proj}&desc=${desc}&skill=${skill}&type=${type}`);
};

const updatePassword = (id: string, type: string, data: PasswordData) => {
  return http.put<any>(`/${type}/password/${id}`, data);
};

const remove = (id: any , type: string) => {
  return http.delete(`/${type}/${id}`);
};

const checkPassword = (id : string, type: string, data : {password:string}) => {
  return http.post(`/${type}/${id}/password`, data);
};


const GlobalService = {
    getAllSkill,
    getUser,
    getSearchResult,
    updatePassword,
    remove,
    checkPassword,
};

export default GlobalService;