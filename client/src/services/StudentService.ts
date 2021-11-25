import http from "../http-common";
 import StudentData from "../types/student";

const getAll = () => {
  return http.get<Array<StudentData>>("/student");
};

const get = (id: any) => {
  return http.get<StudentData>(`/student/${id}`);
};

const create = (data: StudentData) => {
  return http.post<StudentData>("/student", data);
};

const update = (id: any, data: StudentData) => {
  return http.put<any>(`/student/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/student/${id}`);
};

const findByName = (name: string) => {
  return http.get<Array<StudentData>>(`/student?name=${name}`);
};

const StudentService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default StudentService;