import React, { useState, useEffect, ChangeEvent } from "react";
import TutorialDataService from "../../services/JobService";
import ITutorialData from '../../types/job';
import { Row} from "antd";
const StudentsList: React.FC = () => {
  const [tutorials, setTutorials] = useState<Array<ITutorialData>>([]);
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
        setTutorials(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  const findByTitle = () => {
    TutorialDataService.findByName(searchTitle)
      .then((response: any) => {
        setTutorials(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div style={{margin: "0 auto",width: "80%"}} className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
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
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-16">
        <ul className="cards">
          {tutorials &&
            tutorials.map((job, index) => (
                <li>
                  <a id={job.job_id + ':' + job.job_title} href={'/candidate-profile/' + job.job_id} className="card">
                      {/* <img src={job.image ?? require('../../img/No-Image.png').default} className="card__image" alt={job.job_title} /> */}
                      <div className="card__overlay">
                      <div className="card__header">
                          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                          {/* <img className="card__thumb" src={job.image ?? require('../../img/No-Image.png').default} alt={job.job_title} /> */}
                          <div className="card__header-text">
                          <h3 className="card__title">{job.job_title}</h3>            
                          <span className="card__status">{job.status} until {job.date_submit}</span>
                          </div>
                      </div>
                      <Row justify="space-between">
                          <p className="card__description">{job.description}</p>
                          <p className="card__description">Views: {job.views}</p>
                      </Row>
                      </div>
                  </a>      
                </li>  
            
            ))}
            </ul>
     
      </div>
     
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
    </div>
  );
};


export default StudentsList;