export default interface JobData {
    job_id?: string | null,
    comp_id: string,
    job_title: string,
    description: string,
    date_submit: string,
    status: string,
    salary: number,
    views: number,
    button_apply: number,
  }