
import { useState, useEffect } from "react";
import CompanyService from "../../services/CompanyService";
import CompanyData from '../../types/company';
import { RouteComponentProps } from "react-router-dom";
import success from '../global-widget/my-swal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Row, Col } from "antd";
import JobComp from "./job";
import SkillJobComp from "./skill/skill-job";
import Skill from "../global-widget/skill";
import TitleWidget from '../global-widget/title-widget';
import ReplyJob from './reply-job';
type ID = { id: string };
const CompanyProfile = ({ match }: RouteComponentProps<ID>) => {
    const id = match.params.id;
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
    };

    const [currentCompany, setCurrentCompany] = useState<CompanyData>(initialCompanyState);


    const getCompany = (id: string) => {
        CompanyService.get(id)
            .then((response: any) => {
                setCurrentCompany(response.data[0]);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

   

   

    const updateCompany = () => {
        CompanyService.update(currentCompany.comp_id, currentCompany)
            .then((response: any) => {
                success();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCompany(id);
    }, [id])

    return <>
        <div>
            {currentCompany ? (
                <div className="edit-form">

                    <p style={{ textAlign: "center", paddingTop: "20px" }}>Welcome Back {currentCompany.name ?? "sir"}</p>
                    <hr />
                    <br />
                    <div style={{ width: "30%", float: "left", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

                        <TitleWidget title="Logo" />
                        <img style={{ width: 300, height: 300, borderRadius: "20px", padding: "10px" }} src={currentCompany.logo ?? '/img/No-Image.png'} alt={currentCompany.name} />

                        <TitleWidget title="Video" />

                        {currentCompany.video && <video src={currentCompany.video}></video>}
                        {!currentCompany.video && <p style={{ textAlign: "center" }}>No Video Exist</p>}
                    </div>

                    <div style={{ width: "69%", float: "right" }}>
                        <TitleWidget title="Company Details" />
                        <form>

                            <Col>
                                <Row justify="space-around" align="middle">
                                    <TextField

                                        style={{ width: 400 }}
                                        id="email"
                                        label="Email"
                                        value={currentCompany.email}
                                        onChange={e => setCurrentCompany({ ...currentCompany, email: e.target.value ?? "" })}
                                    />
                                    <TextField
                                        style={{ width: 400 }}
                                        id="Name"
                                        label="Name"
                                        value={currentCompany.name}
                                        onChange={e => setCurrentCompany({ ...currentCompany, name: e.target.value ?? "" })}
                                    />

                                </Row>
                                <br />
                                <Row justify="space-around" align="middle">
                                    <TextField
                                        style={{ width: 400 }}
                                        id="description"
                                        label="Description"
                                        value={currentCompany.description}
                                        onChange={e => setCurrentCompany({ ...currentCompany, description: e.target.value ?? "" })}
                                    />

                                    <TextField
                                        style={{ width: 400 }}
                                        id="logo"
                                        label="Logo"
                                        value={currentCompany.logo}
                                        onChange={e => setCurrentCompany({ ...currentCompany, logo: e.target.value ?? "" })}

                                    />

                                </Row>
                                <br />
                                <Row justify="space-around" align="middle">
                                    <TextField
                                        style={{ width: 400 }}
                                        id="country"
                                        label="Country"
                                        value={currentCompany.country}
                                        onChange={e => setCurrentCompany({ ...currentCompany, country: e.target.value ?? "" })}
                                    />

                                    <TextField
                                        style={{ width: 400 }}
                                        id="city"
                                        label="City"
                                        value={currentCompany.city}
                                        onChange={e => setCurrentCompany({ ...currentCompany, city: e.target.value ?? "" })}

                                    />

                                </Row>
                                <br />
                                <Row justify="space-around" align="middle">

                                    <TextField
                                        style={{ width: 400 }}
                                        id="street"
                                        label="Street"
                                        value={currentCompany.street}
                                        onChange={e => setCurrentCompany({ ...currentCompany, street: e.target.value ?? "" })}

                                    />
                                    <TextField
                                        style={{ width: 400 }}
                                        id="phone"
                                        label="Phone"
                                        value={currentCompany.phone}
                                        onChange={e => setCurrentCompany({ ...currentCompany, phone: e.target.value ?? "" })}
                                    />


                                </Row>
                                <br />
                                <Row justify="space-around" align="middle">

                                    <TextField
                                        style={{ width: 400 }}
                                        id="website"
                                        label="Website"
                                        value={currentCompany.website}
                                        onChange={e => setCurrentCompany({ ...currentCompany, website: e.target.value ?? "" })}

                                    />
                                    <TextField
                                        style={{ width: 400 }}
                                        id="video"
                                        label="Video"
                                        value={currentCompany.video}
                                        onChange={e => setCurrentCompany({ ...currentCompany, video: e.target.value ?? "" })}

                                    />
                                </Row>
                            </Col>
                            <br />
                            <Col key="updateCandidateCol">
                                <Row key="updateCandidateRow" align="middle">
                                    <div style={{ paddingLeft: "4%" }}></div>
                                    <Button key="updateCandidate" onClick={updateCompany} variant="contained" color="success">
                                        Update
                                    </Button>
                                </Row>
                            </Col>
                        </form>
                        <br />
                        <JobComp id={id} />
                        <SkillJobComp id={id} />
                        <Skill id={id} type="company" />
                        <ReplyJob id={id} />
                        
                    </div>

                </div>

            ) : (
                <div>
                    <br />
                    <p style={{ textAlign: "center" }}>No Data Found For The Current Company</p>
                    <p style={{ textAlign: "center" }}>Maybe Deleted Or There are some issues with the url</p>

                </div>
            )}
        </div>

    </>;
};

export default CompanyProfile;