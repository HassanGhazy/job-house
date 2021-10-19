import React from 'react';
import '../style/bootstrapmin.css';
import '../style/carousel.css';
const Home = () => {

    return <main>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                    <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                       <img  alt="job-ring" width="100%" height="100%" src={require('../img/job-ring.png').default} />
    
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Job Ring</h1>
                                <p><i>Job Ring</i> is a recruitment platform, it aims to connect students and graduates to the careers they seek and in turn help corporates and organizations fill gaps in the talent and skills they need.</p>
                                <p><a className="btn btn-lg btn-primary" href="/register" role="button">Sign up now!</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                            <img alt="company" width="100%" height="100%" src={require('../img/company.png').default} />
                           
    
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Explore Job Ring.</h1>
                                <p><i>Job Ring</i> offers the chance to explore companies and look for internships or different job opportunities. </p>
                                <p><a className="btn btn-lg btn-primary" href="/browse" role="button">Browse Job Ring!</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img alt="talent" width="100%" height="50%" src={require('../img/talent.png').default} />
    
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1>Hunt the right talent.</h1>
                                <p><i>Job Ring</i> offers the possibility to reach out to students and graduates, explore all available skills and hunt the right talent.</p>
                                <p><a className="btn btn-lg btn-primary" href="/register" role="button">Hunt for talent!</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
    
            <div id="more" className="container marketing">
    
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Job Ring. <span className="text-muted">Things are simple.</span></h2>
                        <p className="lead"><b><i>Job Ring</i></b> is a recruitment platform, it aims to connect students and graduates to the careers they seek and in turn help corporates and organizations fill gaps in the talent and skills they need. <br />For a student or
                            a graduate: <b><i>Job Ring</i></b> offers the chance to explore companies and look for internships or job opportunities. <br />For corporates and organizations: <b><i>Job Ring</i></b> offers the possibility to reach out to students
                            and graduates, explore all available skills and hunt the right talent.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                           <img width="100%" height="100%" alt="job" src={require('../img/job.png').default}/>
                       
                    </div>
                </div>
    
                <hr className="featurette-divider"/>
    
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Looking for a job? <span className="text-muted">You are in the right palce.</span></h2>
                        <p className="lead"><b><i>Job Ring</i></b> allows students and graduates to edit all personal and education details. <b><i>Job Ring</i></b> encourages candidates to add extensive details about their qualifications and experience. Resume, detailed descriptions
                            of all the projects he or she has worked on, the technologies he used, etc. Those descriptions can be more than a page long, and this is a good thing for <b><i>Job Ring</i></b> since we use the keywords in those descriptions to
                            find relevant candidates. <br />A registered student can view the list of companies in the platform, the list of jobs and internships offered, can perform text search and perform filters on the results, can sort the results based
                            on different parameters, and of course he or she can apply for those opportunities. After he applies for a certain job or internship, he can track the status of his application and review the response he got.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img width="100%"  alt="jobs" height="100%" src={require('../img/jobs.jpg').default} />
                    </div>
                </div>
    
                <hr className="featurette-divider"/>
    
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Looking for talents? <span className="text-muted">Explore candidates.</span></h2>
                        <p className="lead"><b><i>Job Ring</i></b> also allows corporates and organizations to register and fill all their respective details, edit and update those details, and set up listings for open positions they have. A listing will have all the details
                            about the job, including the job title and all required skills. One of the favorite features of <b><i>Job Ring</i></b> is that we offer video content about companies and jobs at these companies. Also view and manage all applications
                            sent as a response to their listings. They can reject an application or set up an interview with the applicant in order to continue with the hiring process outside the platform.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        
                            <img alt="Talent Bottom" title="Talent Bottom" width="100%" height="100%" src={require('../img/talent-bottom.jpg').default}/>
                      
                    </div>
                </div>
            </div>   
        </main>;
    
  };
  
  export default Home;