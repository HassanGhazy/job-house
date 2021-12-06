import React, { useState, useEffect, ChangeEvent } from "react";
import CompanyService from "../../services/CompanyService";
import CompanyData from '../../types/company';
import { Row} from "antd";
const CompaniesList: React.FC = () => {
  const [companies, setCompanies] = useState<Array<CompanyData>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    getAllCompanies();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getAllCompanies = () => {
    CompanyService.getAll()
      .then((response: any) => {
        setCompanies(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  const findByTitle = () => {
    CompanyService.findByName(searchTitle)
      .then((response: any) => {
        setCompanies(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div style={{margin: "0 auto",width: "100%"}} className="list row">
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
      <div className="col-md-16" style={{width: "100%"}}>
        <ul className="cards">
          {companies &&
            companies.map((company) => (
                <li>
                <a id={company.comp_id + company.name} href={'/company-profile/' + company.comp_id} className="card">
                {company.video == null ? <img src={'/img/No-Image.png'} className="card__image" alt={company.name} />  : <video controls> <source src={company.video} type="video/mp4"/> Your browser does not support the video tag. </video> }  
                    <div className="card__overlay">
                    <div className="card__header">
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                        <img className="card__thumb" src={company.logo ?? '/img/No-Image.png'} alt={company.name} />
                        <div className="card__header-text">
                        <h3 className="card__title">{company.name}</h3>            
                        <span className="card__status">{company.country}</span>
                        </div>
                    </div>
                    <Row justify="space-between">
                        <p className="card__description">{company.description}</p>
                        <p className="card__description">{company.phone}</p>
                    </Row>
                    </div>
                </a>      
                </li>  
            
            ))}
            </ul>
     

    </div>
    </div>
  );
};


export default CompaniesList;