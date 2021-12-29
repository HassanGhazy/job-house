import TextField from '@mui/material/TextField';
import { useState } from "react";


const SideBar = () => {
    const [edu, setEdu] = useState("");
    const [proj, setProj] = useState("");
    const [desc, setDesc] = useState("");
    const [skill, setSkill] = useState("");
    const [type, setType] = useState("");



    function openTabFilter(id: string, num: number) {
        var i, tabcontent;
        tabcontent = document.getElementsByClassName("tabcontentFilter") as HTMLCollectionOf<HTMLElement>;
        let backgroundTab = document.getElementsByClassName('tablinksFilter') as HTMLCollectionOf<HTMLElement>;
        for (i = 0; i < tabcontent.length; i++) {
            if (i !== num) {
                tabcontent[i].style.display = "none";
                backgroundTab[i].style.background = "#f1f1f1";
                backgroundTab[i].style.color = "#000";
            }
        }
        document.getElementById(id)!.style.display = "block";
        backgroundTab[num].style.background = "#428bca";
        backgroundTab[num].style.color = "#fff";
        if (num === 0) {
            setType("Candidate")
        } else setType("Company");

    }

    const goToSearchPage = () => {
        if (type.toLowerCase() === 'candidate') {
            window.location.href = `/search?edu=${edu}&proj=${proj}&skill=${skill}&desc=${desc}&type=${type}`;
        } else
            window.location.href = `/search?skill=${skill}&desc=${desc}&type=${type}`;
    }
    return (<>
        {/* search By Education */}
        <div className="mobile" id="sidebar">
            <div className="title-sidebar">Filter</div>
            <br />
            <div style={{ paddingLeft: 50, width: "100%" }} className="tab">
                <button className="tablinksFilter" onClick={() => openTabFilter('CandidateFilter', 0)}>Candidate</button>
                <button className="tablinksFilter" onClick={() => openTabFilter('CompaniesFilter', 1)}>Companies</button>
            </div>
            <br />
            <br />
            <br />
            <br />

            <div id="CandidateFilter" style={{ display: "none" }} className="tabcontentFilter">
                <header className="card-header">
                    <h6 className="title" >Education </h6>
                </header>

                <TextField
                    id="filled-search"
                    label="Search By Education"
                    type="search"
                    value={edu}
                    onChange={(e) => setEdu(e.target.value)}
                    fullWidth
                />
                {/* search By projects */}
                <br />
                <br />
                <header className="card-header">
                    <h6 className="title" >Projects </h6>
                </header>

                <TextField
                    id="filled-search"
                    label="Search By Project"
                    type="search"
                    value={proj}
                    onChange={(e) => setProj(e.target.value)}
                    fullWidth
                />
                {/* search By Description */}
                <br />
                <br />
                <header className="card-header">
                    <h6 className="title" >Description </h6>
                </header>

                <TextField
                    id="filled-search"
                    label="Search By Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    type="search"
                    fullWidth
                />
                {/* search By description companies */}
                <br />
                <br />
                <header className="card-header">
                    <h6 className="title" >Skill </h6>
                </header>

                <TextField
                    id="filled-search"
                    label="Search By Skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    type="search"
                    fullWidth
                />
                <br />
                <br />
                <button onClick={goToSearchPage} className="btn btn-block btn-primary">Apply</button>
            </div>

            <div style={{ display: "none" }} id="CompaniesFilter" className="tabcontentFilter">
                <header className="card-header">
                    <h6 className="title" >Description </h6>
                </header>
                <hr />
                <TextField
                    id="filled-search"
                    label="Search By Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    type="search"
                    fullWidth
                />
                <br />
                <br />
                <header className="card-header">
                    <h6 className="title" >Skill </h6>
                </header>

                <TextField
                    id="filled-search"
                    label="Search By Skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    type="search"
                    fullWidth
                /><br />
                <br />
                <button onClick={goToSearchPage} className="btn btn-block btn-primary">Apply</button>
            </div>




        </div>
    </>);
}
export default SideBar;