
import { useState, useEffect } from "react";
import CandidateService from "../../services/StudentService";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Education from "../../types/education";
import success from '../global-widget/my-swal';
import TitleWidget from '../global-widget/title-widget';


type IDParams = { id: string };
const EducationComp = (props: IDParams) => {
    const id = props.id;
    const initialEducationState = [{
        edu_id: null,
        std_id: "",
        degree: "",
        university_major: "",
    }];

    const isAuthed = true;

    const [education, setEducation] = useState(initialEducationState);

    const getCandidateEducation = (id: string) => {
        CandidateService.getEducation(id)
            .then((response: any) => {
                setEducation(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#000',
        background: '#f0f0f0',
        fontSize: "18px"
    }));
    const TitleItem = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: '#000',
        background: '#b9b9b9',
        fontSize: "18px"
    }));

    const refreshEducation = (id: string) => {
        getCandidateEducation(id);
    }


    async function updataAndDeleteEdu(edu: Education) {
        const result_2 = await Swal.fire({
            title: 'Do you want to do changes?',
            html: `<input value=${edu.degree} type="text" id="degree" class="swal2-input" placeholder="Degree">
            <input type="text" value=${edu.university_major} id="university_major" class="swal2-input" placeholder="University Major">`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Update',
            denyButtonText: `Delete`,
            preConfirm: () => {
                const degree = (Swal.getPopup()!.querySelector('#degree')! as HTMLInputElement).value;
                const university_major = (Swal.getPopup()!.querySelector('#university_major')! as HTMLInputElement).value;
                if (!degree || !university_major) {
                    Swal.showValidationMessage(`Please enter Degree and University Major`);
                }
                const data: Education = {
                    edu_id: edu.edu_id,
                    std_id: id,
                    degree: degree,
                    university_major: university_major,
                };
                return data;
            }
        });
        if (result_2.isConfirmed) {
            CandidateService.editEducation(id, result_2.value!);
            Swal.fire('Saved!', '', 'success');
        } else if (result_2.isDenied) {
            CandidateService.deleteEducation(id, edu.edu_id);
            Swal.fire('The Education was deleted successfully', '', 'success');
        }
        refreshEducation(id);
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
                    std_id: id,
                    degree: degree,
                    university_major: university_major,
                };
                showSuccess = true;
                return data;
            }
        }).then((result) => {

            if (showSuccess) {
                CandidateService.addEducation(id, result.value!);
                success();
                refreshEducation(id);
            }
        })
    }


    useEffect(() => {
        getCandidateEducation(id);
    }, [id])

    return (<>
        <div style={{ margin: "4%" }}></div>

        <TitleWidget title="My Education" />
        {education[0] ? (
            <Box key="Education Box" sx={{ flexGrow: 1 }}>

                <Grid key="Education" container spacing={2} columns={16}>
                    <Grid key="Degree" item xs={8}>
                        <TitleItem>Degree</TitleItem>
                    </Grid>
                    <Grid style={{ textAlign: "start" }} key="University Major" item xs={8}>
                        <TitleItem>University Major</TitleItem>
                    </Grid>

                    {education.map((edu) => (
                        <>
                            <Grid style={{ cursor: "pointer" }} key={edu.std_id + edu.edu_id + edu.degree} onClick={() => updataAndDeleteEdu(edu)} item xs={8}>
                                <Item>{edu.degree}</Item>
                            </Grid>
                            <Grid style={{ cursor: "pointer" }} key={edu.university_major} onClick={() => updataAndDeleteEdu(edu)} item xs={8}>
                                <Item>{edu.university_major}</Item>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Box>
        ) : (
            <div>There is No any educations yet</div>
        )}
        <br />


        {
            isAuthed && (
                <Button key="addNewEdu" onClick={addNewEdu} variant="contained" color="success">
                    Add new Education
                </Button>
            )
        }
        <br />
    </>);

}
export default EducationComp;