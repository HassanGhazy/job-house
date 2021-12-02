
import { useState, useEffect } from "react";
import CandidateService from "../../services/StudentService";
import CandidateData from '../../types/student';
import { RouteComponentProps } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { Row, Col } from "antd";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Education from "../../types/education";
import success from './my-swal';
type TParams = { id: string };
const CandidateProfile = ({ match }: RouteComponentProps<TParams>) => {
    const [gender, setGender] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };
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
    const initialPasswordState = {
        std_id: null,
        old_password: "",
        new_password: "",
    };

    const initialEducationState = [{
        edu_id: null,
        std_id: "",
        degree: "",
        university_major: "",
    }];

    const [currentCandidate, setCurrentCandidate] = useState<CandidateData>(initialCandidateState);
    const [currentPassword, setCurrentPassword] = useState(initialPasswordState);
    const [education, setEducation] = useState(initialEducationState);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#000',
        background: '#f0f0f0',
        fontSize: "18px"
    }));
    const getCandidate = (id: string) => {
        CandidateService.get(id)
            .then((response: any) => {
                setCurrentCandidate(response.data[0]);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const getCandidateEducation = (id: string) => {
        CandidateService.getEducation(id)
            .then((response: any) => {
                setEducation(response.data);
                console.log(response.data[0]);
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
    const confirmPassword = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The Old password is not correct',
        })
    }
    const updatePassword = () => {
        CandidateService.updatePassword(currentCandidate.std_id, currentPassword)
            .then((response: any) => {
                success();
            })
            .catch((e: Error) => {
                confirmPassword();
                console.log(e);
            });
    };

    const deleteCandidate = () => {
        CandidateService.remove(currentCandidate.std_id)
            .then((response: any) => {
                window.location.href = "/";
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    const confirmDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCandidate();
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Profile is safe :)',
                    'error'
                )
            }
        })
    }

    const addNewEdu = () => {
        let showSuccess = false;
        Swal.fire({
            title: 'Add new Education',
            html: `<input type="text" id="degree" class="swal2-input" placeholder="Degree">
        <input type="text" id="university_major" class="swal2-input" placeholder="University Major">`,
            confirmButtonText: 'Add',
            focusConfirm: false,
            preConfirm: () => {
                const degree = (Swal.getPopup()!.querySelector('#degree')! as HTMLInputElement).value;
                const university_major = (Swal.getPopup()!.querySelector('#university_major')! as HTMLInputElement).value;
                if (!degree || !university_major) {
                    Swal.showValidationMessage(`Please enter Degree and University Major`)
                }
                const data: Education = {
                    std_id: match.params.id,
                    degree: degree,
                    university_major: university_major,
                };
                showSuccess = true;
                return data;
            }
        }).then((result) => {

            if (showSuccess) {
                CandidateService.addEducation(match.params.id, result.value!);
                success();
            }
        })
    }

    useEffect(() => {
        getCandidate(match.params.id);
        getCandidateEducation(match.params.id);
    }, [match.params.id])


    return (<>

        <div>
            {currentCandidate ? (
                <div className="edit-form">

                    <h5 style={{ textAlign: "center" }}>Welcome Back {currentCandidate.name ?? "sir"}</h5>
                    <hr />
                    <br />
                    <div style={{ width: "30%", float: "left" }}>
                        <img style={{ width: 300, height: 300 }} src={currentCandidate.image ?? require('../../img/No-Image.png').default} alt={currentCandidate.name} />
                    </div>
                    <div style={{ width: "69%", float: "right" }}>
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
                                        <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                                        <Select
                                            labelId="gender"
                                            id="gender"
                                            value={gender}
                                            onChange={handleChange}
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
                            <Col>
                                <Row align="middle">
                                    <div style={{ paddingLeft: "4%" }}></div>
                                    <Button onClick={updateCandidate} variant="contained" color="success">
                                        Update
                                    </Button>
                                </Row>
                            </Col>
                        </form>
                        <div style={{ margin: "4%" }}></div>
                        <p>My Education</p>
                        {education[0] ? (
                            <Box sx={{ flexGrow: 1 }}>

                                <Grid container spacing={2} columns={16}>
                                    <Grid item xs={8}>
                                        <Item>Degree</Item>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Item>University Major</Item>
                                    </Grid>

                                    {education.map((edu) => (
                                        <>
                                            <Grid item xs={8}>
                                                <Item>{edu.degree}</Item>
                                            </Grid><Grid item xs={8}>
                                                <Item>{edu.university_major}</Item>
                                            </Grid>
                                        </>
                                    ))}
                                </Grid>
                            </Box>
                        ) : (
                            <div>There is No any education</div>
                        )}
                        <Button onClick={addNewEdu} variant="contained" color="success">
                            Add new Education
                        </Button>
                        {/* <hr /> */}
                        <div style={{ textAlign: "center" }}>
                            <p style={{ color: "red" }}>
                                Danger Zone
                            </p>
                        </div>

                        <div style={{ textAlign: "start" }}>

                            <p>Change your Password</p>
                            <Col >
                                <TextField
                                    style={{ width: 400 }}
                                    id="old_password"
                                    label="Old Password"
                                    type='password'
                                    placeholder="Write your current password"
                                    value={currentPassword.old_password}
                                    onChange={e => setCurrentPassword({ ...currentPassword, old_password: e.target.value ?? "" })}

                                />
                                <br />
                                <br />
                                <TextField
                                    style={{ width: 400 }}
                                    id="new_password"
                                    type='password'
                                    label="New Password"
                                    value={currentPassword.new_password}
                                    onChange={e => setCurrentPassword({ ...currentPassword, new_password: e.target.value ?? "" })}

                                />
                                <br />
                                <br />
                                <Button onClick={updatePassword} variant="contained" color="success">
                                    Update Password
                                </Button>
                            </Col>
                            <p>Delete Account</p>
                            <Button onClick={confirmDelete} variant="outlined" color="error">
                                Delete
                            </Button>
                        </div>
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

    </>
    );
};
export default CandidateProfile;