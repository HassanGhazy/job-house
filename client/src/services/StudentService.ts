import http from "../http-common";
import StudentData from "../types/student";
import SkillData from "../types/skill";
import PasswordData from "../types/password";
import Education from "../types/education";
import Project from "../types/project";
import SkillStudentData from "../types/skill-std";

const getAll = () => {
  return http.get<Array<StudentData>>("/student");
};

const getSkillCandidate = (id: string) => {
  return http.get<Array<SkillData>>(`student/${id}/skill`);
};


const get = (id: any) => {
  return http.get<StudentData>(`/student/${id}`);
};

const getEducation = (id: any) => {
  return http.get<Array<Education>>(`/student/${id}/education`);
};

const addEducation = (id: any, data: Education) => {
  return http.post<Education>(`/student/${id}/education`, data);
};

const editEducation = (id: any, data: Education) => {
  return http.put<Education>(`/student/${id}/education/${data.edu_id}`, data);
};

const deleteEducation = (std_id: string, id: string) => {
  return http.delete<Education>(`/student/${std_id}/education/${id}`);
};

const getProject = (id: any) => {
  return http.get<Array<Project>>(`/student/${id}/project`);
};

const addProject = (id: any, data: Project) => {
  return http.post<Project>(`/student/${id}/project`, data);
};

const editProject = (data: Project) => {
  return http.put<Project>(`/student/${data.std_id}/project/${data.name_proj}`, data);
};

const deleteProject = (std_id: string, name: string) => {
  return http.delete<Project>(`/student/${std_id}/project/${decodeURIComponent(name)}`);
};

const addSkill = (data : SkillStudentData) => {
  return http.post<SkillStudentData>(`/student/${data.std_id}/skill`, data);
};

const checkPassword = (id : string, data : {password:string}) => {
  return http.post(`/student/${id}/password`, data);
};

const deleteSkill = (data : {std_id : string, skill_id : string}) => {
  return http.delete(`/student/${data.std_id}/skill/${data.skill_id}`);
};

const create = (data: StudentData) => {
  return http.post<StudentData>("/student", data);
};

const update = (id: any, data: StudentData) => {
  return http.put<any>(`/student/${id}`, data);
};

const updatePassword = (id: any, data: PasswordData) => {
  return http.put<any>(`/student/password/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/student/${id}`);
};

const findByName = (name: string) => {
  return http.get<Array<StudentData>>(`/search/student/?name=${name}`);
};

const StudentService = {
  getAll,
  get,
  create,
  update,
  updatePassword,
  remove,
  findByName,
  getEducation,
  addEducation,
  editEducation,
  deleteEducation, 
  getProject, 
  editProject, 
  addProject, 
  deleteProject,
  getSkillCandidate,
  addSkill,
  deleteSkill,
  checkPassword
};

export default StudentService;