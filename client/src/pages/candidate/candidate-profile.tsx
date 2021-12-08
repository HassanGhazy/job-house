
import { useState, useEffect } from "react";
import CandidateService from "../../services/StudentService";
import CandidateData from '../../types/student';
import { RouteComponentProps } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Row, Col } from "antd";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import success from '../global-widget/my-swal';
import Skill from '../global-widget/skill';
import EducationComp from './education';
import ProjectComp from './project';
import DangerZoneComp from './danger-zone';
import StatusJobComp from './status-job';
import TitleWidget from '../global-widget/title-widget';


type TParams = { id: string };
const CandidateProfile = ({ match }: RouteComponentProps<TParams>) => {
    const id = match.params.id;
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
        birthday: "",
        image: "",
        cv: "",
    };

    const [currentCandidate, setCurrentCandidate] = useState<CandidateData>(initialCandidateState);

    const getCandidate = (id: string) => {
        CandidateService.get(id)
            .then((response: any) => {
                setCurrentCandidate(response.data[0]);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const updateCandidate = () => {
        CandidateService.update(currentCandidate.std_id, currentCandidate)
            .then((response: any) => {
                success();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCandidate(id);
    }, [id])

    return (<>
       


            <div>
                {currentCandidate ? (
                    <div className="edit-form">

                        <p style={{ textAlign: "center", paddingTop: "20px" }}>Welcome Back {currentCandidate.name ?? "sir"}</p>
                        <hr />
                        <br />
                        <div style={{ width: "30%", float: "left", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            <TitleWidget title="Profile Photo" />
                            <img style={{ width: 300, height: 300, borderRadius: "10px" }} src={currentCandidate.image ?? '/img/No-Image.png'} alt={currentCandidate.name} />
                        </div>
                        <div style={{ width: "69%", float: "right" }}>

                            <TitleWidget title="Personal Details" />
                            <form>

                                <Col>
                                    <Row justify="space-around" align="middle">
                                        <TextField

                                            style={{ width: 400 }}
                                            id="email"
                                            label="Email"
                                            value={currentCandidate.email}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, email: e.target.value ?? "" })}
                                        />
                                        <TextField
                                            style={{ width: 400 }}
                                            id="Name"
                                            label="Name"
                                            value={currentCandidate.name}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, name: e.target.value ?? "" })}
                                        />

                                    </Row>
                                    <br />
                                    <Row justify="space-around" align="middle">
                                        <TextField
                                            style={{ width: 400 }}
                                            id="description"
                                            label="Description"
                                            value={currentCandidate.description}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, description: e.target.value ?? "" })}
                                        />

                                        <TextField
                                            style={{ width: 400 }}
                                            id="image"
                                            label="Image"
                                            value={currentCandidate.image}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, image: e.target.value ?? "" })}

                                        />

                                    </Row>
                                    <br />
                                    <Row justify="space-around" align="middle">
                                        <TextField
                                            style={{ width: 400 }}
                                            id="country"
                                            label="Country"
                                            value={currentCandidate.country}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, country: e.target.value ?? "" })}
                                        />

                                        <TextField
                                            style={{ width: 400 }}
                                            id="city"
                                            label="City"
                                            value={currentCandidate.city}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, city: e.target.value ?? "" })}

                                        />

                                    </Row>
                                    <br />
                                    <Row justify="space-around" align="middle">
                                        <TextField
                                            style={{ width: 400 }}
                                            id="phone"
                                            label="Phone"
                                            value={currentCandidate.phone}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, phone: e.target.value ?? "" })}
                                        />

                                        <TextField
                                            style={{ width: 400 }}
                                            id="cv"
                                            label="CV"
                                            value={currentCandidate.cv}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, cv: e.target.value ?? "" })}

                                        />

                                    </Row>
                                    <br />
                                    <Row justify="space-around" align="middle">

                                        <TextField
                                            style={{ width: 400 }}
                                            id="birthday"
                                            label="Birthday"
                                            type="date"
                                            defaultValue={currentCandidate.birthday}
                                            onChange={e => setCurrentCandidate({ ...currentCandidate, birthday: e.target.value ?? "" })}
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                        <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
                                            <InputLabel key="genderLabel" id="demo-simple-select-filled-label">Gender</InputLabel>
                                            <Select
                                                labelId="gender"
                                                id="gender"
                                                key="gender"
                                                value={currentCandidate.gender}
                                                onChange={e => setCurrentCandidate({ ...currentCandidate, gender: e.target.value ?? "" })}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'M'}>Male</MenuItem>
                                                <MenuItem value={'F'}>Female</MenuItem>
                                            </Select>
                                        </FormControl>


                                    </Row>
                                </Col>
                                <br />
                                <Col key="updateCandidateCol">
                                    <Row key="updateCandidateRow" align="middle">
                                        <div style={{ paddingLeft: "4%" }}></div>
                                        <Button key="updateCandidate" onClick={updateCandidate} variant="contained" color="success">
                                            Update
                                        </Button>
                                    </Row>
                                </Col>
                            </form>
                            <EducationComp id={id} />
                            <ProjectComp id={id} />
                            <Skill id={id} type="candidate" />
                            <StatusJobComp id={id} />
                            <hr />
                            <DangerZoneComp id={id} />


                        </div>

                    </div>

                ) : (
                    <div>
                        <br />
                        <p style={{ textAlign: "center" }}>No Data Found For The Current Candidate</p>
                        <p style={{ textAlign: "center" }}>Maybe Deleted Or There are some issues with the url</p>

                    </div>
                )}
            </div>
        {/*ThirdPartyEmailPasswordAuth </ThirdPartyEmailPasswordAuth> */}

    </>
    );
};
export default CandidateProfile;