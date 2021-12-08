import React, { useState, useEffect, ChangeEvent } from "react";
import StudentService from "../../services/StudentService";
import StudentData from '../../types/student';
import { Row} from "antd";
import { Link } from "react-router-dom";
const StudentsList: React.FC = () => {
  const [Candidate, setCandidate] = useState<Array<StudentData>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    getAllCandidates();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getAllCandidates = () => {
    StudentService.getAll()
      .then((response: any) => {
        setCandidate(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };




  const findByTitle = () => {
    StudentService.findByName(searchTitle)
      .then((response: any) => {
        setCandidate(response.data);
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
      
      <div style={{width: "100%"}} className="col-md-16">
        <ul className="cards">
          {Candidate &&
            Candidate.map((student, index) => (
                <li key={student.std_id+ student.name + index}>
                  <Link id={student.std_id} to={'/candidate-profile/' + student.std_id} className="card">
                      <img src={student.image ?? '/img/No-Image.png'} className="card__image" alt={student.name} />
                      <div className="card__overlay">
                      <div className="card__header">
                          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                          <img className="card__thumb" src={student.image ?? '/img/No-Image.png'} alt={student.name} />
                          <div className="card__header-text">
                          <h3 className="card__title">{student.name}</h3>            
                          <span className="card__status">{student.country}</span>
                          </div>
                      </div>
                      <Row justify="space-between">
                          <p className="card__description">{student.description}</p>
                          <a className="card__description" href={student.cv ?? '#'}>{student.cv == null ? "The CV is not available" : 'CV'}</a>
                      </Row>
                      </div>
                  </Link>      
                </li>  
            
            ))}
            </ul>
     
      </div>

    </div>
  );
};


export default StudentsList;