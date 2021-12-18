import './style.css'
import { useState, useEffect } from "react";
import GlobalService from "../../services/GlobalService";
import CandidateData from '../../types/student';
import CompanyData from '../../types/company';
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

const HeaderJob = () => {

  const initialCandidateState = {
    std_id: null,
    name: "",
    description: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
    gender: "",
    birthday: new Date(),
    image: "",
    cv: "",
    calendly: "",
  };

  const initialCompanyState = {
    comp_id: null,
    name: "",
    email: "",
    password: "",
    country: "",
    city: "",
    street: "",
    phone: "",
    website: "",
    description: "",
    video: "",
    logo: "",
    calendly: "",
  };

  const [currentCompany, setCurrentCompany] = useState<CompanyData>(initialCompanyState);
  const [currentCandidate, setCurrentCandidate] = useState<CandidateData>(initialCandidateState);

  const getUser = () => {
    console.log("got user");
    GlobalService.getUser()
      .then((response: any) => {
        if (response.data[0].type === "Candidate") {
          setCurrentCandidate(response.data[0].user[0]);
        } else {
          setCurrentCompany(response.data[0].user[0]);
        }

      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getUser();
  }, [currentCompany, currentCandidate])

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }
  return (
    <div className="divNav">
      <nav className="nav">
        <div className="navButtons">
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/about.html">ABOUT US</a></li>
            <li><a href="/contact-us">CONTACTS</a></li>
            <li><a href="/browse-job">BROWSE JOB</a></li>
          </ul>
        </div><button onClick={() => onLogout()}>Logout</button>
        <div className="buttonsLogin">
          {(currentCompany.comp_id === null && currentCandidate.std_id === null) ? (<>
            <button onClick={() => window.location.href = "/auth"}>Sign Up</button>
            <button onClick={() => window.location.href = "/auth"}>Sign In</button>
          </>) : (<> <button onClick={() => onLogout()}>Logout</button> {(currentCompany.comp_id !== null) ?
            <img alt={currentCompany.name} src={currentCompany.logo} /> :
            <img alt={currentCandidate.name} src={currentCandidate.image} />} </>)}
        </div>
      </nav>
    </div>
  );
};

export default HeaderJob;
