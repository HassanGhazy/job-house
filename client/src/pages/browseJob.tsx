import '../styles/browsestyle.css'
import StudentList from '../components/DBData/student-list'
import CompanyList from '../components/DBData/company-list'
import JobList from '../components/DBData/job-list'
import SideBar from '../components/Sidebar';
(function () {
    const link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
})();

const browseJob = () => {
    function showTab(cityName: string, num: number) {
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
            <button className="tablinks" onClick={() => showTab('Jobs', 0)}>Jobs</button>
            <button className="tablinks" onClick={() => showTab('Companies', 1)}>Companies</button>
            <button className="tablinks" onClick={() => showTab('Candidates', 2)}>Candidates</button>
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

        
        <SideBar />

    </>;
};

export default browseJob;