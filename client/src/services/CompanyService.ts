import http from "../http-common";
import CompanyData from "../types/company";

const getAll = () => {
  return http.get<Array<CompanyData>>("/company");
};

const get = (id: any) => {
  return http.get<CompanyData>(`/company/${id}`);
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
};

export default CompanyService;