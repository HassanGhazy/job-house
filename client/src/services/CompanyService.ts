import http from "../http-common";
import CompanyData from "../types/company";
import JobData from "../types/job";
import JobRequest from "../types/request-job";

const getAll = () => {
  return http.get<Array<CompanyData>>("/company");
};

const get = (id: any) => {
  return http.get<CompanyData>(`/company/${id}`);
};

const getJob = (id: any) => {
  return http.get<Array<JobData>>(`/company/${id}/job`);
};

const getSingleJob = (id: string, idJob : string) => {
  return http.get<JobData>(`/company/${id}/job/${idJob}`);
};


const addJob = (id: any, data : JobData) => {
  return http.post<JobData>(`/company/${id}`,data);
};


const editJob = (id: any, data: JobData) => {
  return http.put<JobData>(`/company/${id}/job/${data.job_id}`, data);
};

const deleteJob = (comp_id: string, id: string) => {
  return http.delete<JobData>(`/company/${comp_id}/job/${id}`);
};

const getSkillJob = (id: string, jobId : string) => {
  return http.get(`/company/${id}/job/${jobId}/skill`);
};

const addSkill = (data : any) => {
  return http.post(`/company/${data.comp_id}/job/${data.job_id}/skill`, data);
};

const deleteSkillJob = (id: string, jobId : string, skillId : string) => {
  return http.delete(`/company/${id}/job/${jobId}/skill/${skillId}`);
};

const getJobRequests = (id: any) => {
  return http.get<Array<JobRequest>>(`/company/${id}/request`);
};


const create = (data: CompanyData) => {
  return http.post<CompanyData>("/company", data);
};

const update = (id: any, data: CompanyData) => {
  return http.put<any>(`/company/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/company/${id}`);
};

const findByName = (name: string) => {
  return http.get<Array<CompanyData>>(`/search/company?name=${name}`);
};

const CompanyService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
  getJob,
  editJob,
  deleteJob,
  addJob,
  getSkillJob,
  deleteSkillJob,
  addSkill,
  getSingleJob,
  getJobRequests
  
};

export default CompanyService;