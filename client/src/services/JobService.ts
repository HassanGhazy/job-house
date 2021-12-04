import http from "../http-common";
 import JobData from "../types/job";
 import RequestJob from "../types/request-job";
 import ReplyStatusJob from "../types/reply-status-job";

const getAll = () => {
  return http.get<Array<JobData>>("/job");
};

// const updateView = (id: string, compId : string, data: any) => {
//   return http.put<any>(`/${compId}/job/view/${id}`, data);
// };

const getNumberOfApply = (id : string, compId : string) => {
  return http.get(`/job/${compId}/apply/${id}`);
};

const updateNumberOfApply = (id: string, compId : string,data: any) => {
  return http.put<any>(`/job/${compId}/apply/${id}`, data);
};

const requestJob = (data : RequestJob) => {
  return http.post<RequestJob>(`/job/${data.comp_id}/student/${data.job_id}`,data);
};

const getStatusJob = (id: string) => {
  return http.get<ReplyStatusJob>(`/job/${id}/status/`);
};

const replyStatusJob = (data : ReplyStatusJob) => {
  return http.post<ReplyStatusJob>(`/job/${data.comp_id}/status/${data.job_id}`,data);
};


const findByName = (name: string) => {
  return http.get<Array<JobData>>(`/search/job?name=${name}`);
};

const JobService = {
  getAll,
  findByName,
  getNumberOfApply,
  requestJob,
  replyStatusJob,
  getStatusJob,
  updateNumberOfApply
};
// updateView,

export default JobService;