import http from "../http-common";
 import JobData from "../types/job";

const getAll = () => {
  return http.get<Array<JobData>>("/job");
};

const get = (id: any) => {
  return http.get<JobData>(`/job/${id}`);
};

const create = (data: JobData) => {
  return http.post<JobData>("/job", data);
};

const update = (id: any, data: JobData) => {
  return http.put<any>(`/job/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/job/${id}`);
};

const findByName = (name: string) => {
  return http.get<Array<JobData>>(`/job?name=${name}`);
};

const JobService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default JobService;