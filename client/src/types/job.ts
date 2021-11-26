export default interface CompanyData {
    comp_id?: any | null,
    job_id: number,
    job_title: string,
    description: string,
    date_submit: Date,
    status: string,
    image: string,
    salary: number,
    views: number,
    unique_view: number,
    button_apply: number,
  }