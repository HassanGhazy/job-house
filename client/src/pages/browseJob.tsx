// import React from 'react';  <link rel="stylesheet" href="style/style.css" />
import '../styles/browsestyle.css'
// import Footer from "../components/Footer";
import StudentList from '../components/DBData/student-list'
import CompanyList from '../components/DBData/company-list'
import JobList from '../components/DBData/job-list'
(function () {
    const link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
})();

const browseJob = () => {
    function openCity(cityName: string, num: number) {
        var i, tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
        let backgroundTab = document.getElementsByClassName('tablinks') as HTMLCollectionOf<HTMLElement>;
        for (i = 0; i < tabcontent.length; i++) {
            if (i !== num) {
                tabcontent[i].style.display = "none";
                backgroundTab[i].style.background = "#f1f1f1";
                backgroundTab[i].style.color = "#000";
            }
        }
        document.getElementById(cityName)!.style.display = "block";
        backgroundTab[num].style.background = "#428bca";
        backgroundTab[num].style.color = "#fff";
    }

    return <>
        <div className="tab">
            <button className="tablinks" onClick={() => openCity('Jobs', 0)}>Jobs</button>
            <button className="tablinks" onClick={() => openCity('Companies', 1)}>Companies</button>
            <button className="tablinks" onClick={() => openCity('Candidates', 2)}>Candidates</button>
        </div>
        <div id="Jobs" className="tabcontent">
            <JobList />
        </div>
        <div id="Companies" className="tabcontent">
            <CompanyList />
        </div>

        <div id="Candidates" className="tabcontent">
            <StudentList />
        </div>


        <div id="sidebar">
            <div className="title-sidebar">Filter</div>
            <div className="card">
                <article className="filter-group">
                    <article className="filter-group">
                        <header className="card-header">
                            <h6 className="title" style={{ color: "#428bca" }}>Job type</h6>
                        </header>
                        <div className="filter-content collapse show" id="collapse_2">
                            <div className="card-body">
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <div className="custom-control-label">Full Time
                                        <b className="badge badge-pill badge-light float-right">120</b>
                                    </div>
                                </label>
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <div className="custom-control-label">Part Time
                                        <b className="badge badge-pill badge-light float-right">15</b>
                                    </div>
                                </label>
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <div className="custom-control-label">Hourly
                                        <b className="badge badge-pill badge-light float-right">120</b>
                                    </div>
                                </label>
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <div className="custom-control-label">Fixed price
                                        <b className="badge badge-pill badge-light float-right">100</b>
                                    </div>
                                </label>
                            </div>

                        </div>
                    </article>

                    <article className="filter-group">
                        <header className="card-header">
                            <h6 className="title" style={{ color: "#428bca" }}>Price range </h6>

                        </header>
                        <div className="filter-content collapse show" id="collapse_5">
                            <div className="card-body">
                                <input type="range" className="custom-range" min="0" max="100" name="" />
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Min</label>
                                        <input className="form-control" placeholder="$0" type="number" />
                                    </div>
                                    <div className="form-group text-right col-md-6">
                                        <label>Max</label>
                                        <input className="form-control" placeholder="$1,0000" type="number" />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </article>

                    <article className="filter-group">
                        <header className="card-header">

                            <h6 className="title" style={{ color: "#428bca" }}>Skills </h6>

                        </header>
                        <div className="filter-content collapse show" id="collapse_6">
                            <div className="card-body">
                                <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> Java </span>
                                </label>

                                <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> Python </span>
                                </label>

                                <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> PHP </span>
                                </label>
                                <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> HTML </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> CSS </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> Java Script </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> SQL </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> Vue </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> React </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> Node JS </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> C </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> C++ </span>
                                </label> <label className="checkbox-btn">
                                    <input type="checkbox" />
                                    <span className="btn btn-light"> C# </span>
                                </label>
                            </div>

                        </div>
                    </article>

                    <button className="btn btn-block btn-primary">Apply</button>
                </article>
            </div>
        </div>
    </>;
};

export default browseJob;