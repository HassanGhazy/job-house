import React, { useState, useEffect, ChangeEvent } from "react";
import JobService from "../../services/JobService";
import JobData from '../../types/job';
import { Row } from "antd";
const StudentsList: React.FC = () => {
  const [jobs, setJobs] = useState<Array<JobData>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    getAllJobs();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getAllJobs = () => {
    JobService.getAll()
      .then((response: any) => {
        setJobs(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  const findByTitle = () => {
    JobService.findByName(searchTitle)
      .then((response: any) => {
        setJobs(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      <div style={{ display: "flex", width: "70%", padding: 5, margin: " 0 auto " }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            style={{ marginLeft: "25px" }}
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>


      <ul className="timeline">
        {jobs &&
          jobs.map((job) => (

            <li>
              <a href={job.comp_id + '/job-profile/' + job.job_id}>{job.job_title}</a>
              <p className="float-right">Views {job.views}</p>
              <p>{job.description}</p>
              <Row justify="space-between">
                <p>{job.salary}$</p>
                <p>Apply {job.button_apply}</p>
              </Row>
              <p>Date Submit {job.date_submit.split("T")[0]}</p>

            </li>

          ))}
      </ul>

    </>
  );
};


export default StudentsList;