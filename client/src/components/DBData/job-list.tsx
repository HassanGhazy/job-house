import React, { useState, useEffect, ChangeEvent } from "react";
import TutorialDataService from "../../services/JobService";
import ITutorialData from '../../types/job';
import { Row } from "antd";
const StudentsList: React.FC = () => {
  const [jobs, setJobs] = useState<Array<ITutorialData>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response: any) => {
        setJobs(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  const findByTitle = () => {
    TutorialDataService.findByName(searchTitle)
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
          jobs.map((job, index) => (

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



      {/* <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.email}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.gender}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.birthday}
            </div>

            <Link
              to={"/student/" + currentTutorial.std_id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div> */}
    </>
  );
};


export default StudentsList;