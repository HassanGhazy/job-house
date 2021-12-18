import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import GlobalService from "../../services/GlobalService";
import CompanyData from '../../types/company';
import CandidateData from '../../types/student';
import './style.css';

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

  console.log("currentCandidate", currentCandidate);
  console.log("currentCompany", currentCompany);

  const getUser = () => {
    GlobalService.getUser()
      .then((response: any) => {
        if (!response.data.user.length) {
          return;
        }

        if (response.data.type === "Candidate") {
          setCurrentCandidate(response.data.user[0]);
        } else {
          setCurrentCompany(response.data.user[0]);
        }
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (currentCandidate.std_id === null && currentCompany.comp_id === null) {
      getUser();
    }
  }, [currentCandidate, currentCompany])

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
        </div>

        <div className="buttonsLogin">
          <button onClick={() => onLogout()}>Logout</button>
          {(currentCompany.comp_id === null && currentCandidate.std_id === null) ? (
            <button onClick={() => window.location.href = "/auth"}>Register</button>
          ) : (
            <>
              {(currentCompany.comp_id !== null) ?
                <Avatar alt={currentCompany.name} src={currentCompany.logo} /> :
                <Avatar alt={currentCandidate.name} src={currentCandidate.image} />
              }
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderJob;
