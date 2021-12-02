import http from "../http-common";
 import StudentData from "../types/student";
 import PasswordData from "../types/password";
 import Education from "../types/education";

const getAll = () => {
  return http.get<Array<StudentData>>("/student");
};

const get = (id: any) => {
  return http.get<StudentData>(`/student/${id}`);
};

const getEducation = (id: any) => {
  return http.get<Array<Education>>(`/student/${id}/education`);
};

const addEducation = (id: any,data: Education) => {
  return http.post<Education>(`/student/${id}/education`,data);
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
  addEducation
};

export default StudentService;