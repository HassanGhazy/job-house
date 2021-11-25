// import React from 'react';  <link rel="stylesheet" href="style/style.css" />
import '../styles/browsestyle.css'

  (function() {
    const link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
  })();

const browseJob = () => {
    function openCity(cityName: any, num : number) {
        var i, tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
        for (i = 0; i < tabcontent.length; i++) {
         if(i !== num) tabcontent[i].style.display = "none" ;
        }
        document.getElementById(cityName)!.style.display = "block";
      }
    
    return  <>
    <div className="tab">
    <button className="tablinks" onLoad={()=>openCity('Jobs',0)} onClick={()=>openCity('Jobs',0)}>Jobs</button>
    <button className="tablinks" onClick={()=>openCity('Companies',1)}>Companies</button>
    <button className="tablinks" onClick={()=>openCity('Candidates',2)}>Candidates</button>
    </div>
    <div id="Jobs" className="tabcontent">
    <h3>Jobs</h3>
    </div>

    <div id="Companies" className="tabcontent">
    <h3>Companies</h3>
    </div>

    <div id="Candidates" className="tabcontent">
    <h3>Candidates</h3>
    </div>
        {/* <div id="main-wrapper">
        <div className="container" style={{padding: 7}}>

            <div className="row">

                <div className="col-md-6 col-md-offset-3">
                    <div className="panel panel-primary" style={{width: "150%"}}>
                        <div className="panel-heading">
                            <h3 className="panel-title">Panel Type</h3>
                            <span className="pull-right">
                               
                                <ul className="nav panel-tabs">
                                    <li className="active"><a href="#tab1" data-toggle="tab">Jobs</a></li>
                                    <li><a href="#tab2" data-toggle="tab">Companies</a></li>
                                    <li><a href="#tab3" data-toggle="tab">Candidates</a></li>
                                </ul>
                            </span>
                        </div>
                        <div className="panel-body">
                            <div className="tab-content">
                                <div className="tab-pane active" id="tab1">
                                    <div id="job_offers" className="container"></div>

                                    <nav className="mt-4" aria-label="Page navigation sample">
                                        <ul className="pagination">
                                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" data-page="1" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" data-page="2" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" data-page="3" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" data-page="4" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="tab-pane" id="tab2">
                                    <div id="company"> </div>

                                    <nav className="mt-4" aria-label="Page navigation sample">
                                        <ul className="pagination">
                                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" data-page="1" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" data-page="2" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" data-page="3" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" data-page="4" href="#">Next</a></li>
                                        </ul>
                                    </nav>

                                </div>
                                <div className="tab-pane" id="tab3">
                                    <div id="candidate"></div>


                                    <nav className="mt-4" aria-label="Page navigation sample">
                                        <ul className="pagination">
                                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" data-page="1" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" data-page="2" href="#">2</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}

    <div id="sidebar">
        <div className="title-sidebar">Filter</div>
        <div className="card">
            <article className="filter-group">
                <article className="filter-group">
                    <header className="card-header">
                        <h6 className="title" style={{color: "#428bca"}}>Job type</h6>
                    </header>
                    <div className="filter-content collapse show" id="collapse_2">
                        <div className="card-body">
                            <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <div className="custom-control-label">Full Time
                                <b className="badge badge-pill badge-light float-right">120</b>
                            </div>
                        </label>
                            <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <div className="custom-control-label">Part Time
                                <b className="badge badge-pill badge-light float-right">15</b>
                            </div>
                        </label>
                          <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <div className="custom-control-label">Hourly
                                <b className="badge badge-pill badge-light float-right">120</b>
                            </div>
                        </label>
                            <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <div className="custom-control-label">Fixed price
                                <b className="badge badge-pill badge-light float-right">100</b>
                            </div>
                        </label>
                        </div>
                     
                    </div>
                </article>

                <article className="filter-group">
                    <header className="card-header">
                        <h6 className="title" style={{color: "#428bca"}}>Price range </h6>
                   
                    </header>
                    <div className="filter-content collapse show" id="collapse_5">
                        <div className="card-body">
                            <input type="range" className="custom-range" min="0" max="100" name=""/>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Min</label>
                                    <input className="form-control" placeholder="$0" type="number"/>
                                </div>
                                <div className="form-group text-right col-md-6">
                                    <label>Max</label>
                                    <input className="form-control" placeholder="$1,0000" type="number"/>
                                </div>
                            </div>
                         
                        </div>
                       
                    </div>
                </article>
               
                <article className="filter-group">
                    <header className="card-header">
                      
                        <h6 className="title" style={{color: "#428bca"}}>Skills </h6>
                       
                    </header>
                    <div className="filter-content collapse show" id="collapse_6">
                        <div className="card-body">
                            <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> Java </span>
                        </label>

                            <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> Python </span>
                        </label>

                            <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> PHP </span>
                        </label>
                            <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> HTML </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> CSS </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> Java Script </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> SQL </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> Vue </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> React </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> Node JS </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> C </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> C++ </span>
                        </label> <label className="checkbox-btn">
                            <input type="checkbox"/>
                            <span className="btn btn-light"> C# </span>
                        </label>
                        </div>
                       
                    </div>
                </article>
               
                <button className="btn btn-block btn-primary">Apply</button>
            </article>
        </div>
    </div>
    </> ;
  };
  
  export default browseJob;