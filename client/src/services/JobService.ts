import http from "../http-common";
 import JobData from "../types/job";

const getAll = () => {
  return http.get<Array<JobData>>("/job");
};

const update = (id: any, data: JobData) => {
  return http.put<any>(`/job/${id}`, data);
};

const updateView = (id: string, compId : string, data: any) => {
  return http.put<any>(`/${compId}/job/view/${id}`, data);
};

const getView = (id: string, compId : string) => {
  return http.get(`/${compId}/job/view/${id}`);
};

const remove = (id: any) => {
  return http.delete<any>(`/job/${id}`);
};

const findByName = (name: string) => {
  return http.get<Array<JobData>>(`/search/job?name=${name}`);
};

const JobService = {
  getAll,
  update,
  remove,
  findByName,
  updateView,
  getView,
};

export default JobService;