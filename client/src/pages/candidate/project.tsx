
import { useState, useEffect } from "react";
import CandidateService from "../../services/StudentService";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import success from '../global-widget/my-swal';
import Project from "../../types/project";

type IDParams = { id: string };
const ProjectComp = (props: IDParams) => {
    const id = props.id;
    const initialProjectState = [{
        std_id: null,
        name_proj: "",
        description_project: "",
    }];
    const [project, setProject] = useState(initialProjectState);

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

    const getCandidateProject = (id: string) => {
        CandidateService.getProject(id)
            .then((response: any) => {
                setProject(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshProject = (id: string) => {
        getCandidateProject(id);
    }

    async function updataAndDeleteProject(project: Project) {
        const result_2 = await Swal.fire({
            title: 'Do you want to do changes?',
            html: `<input value=${project.name_proj} type="text" id="name_proj" class="swal2-input" placeholder="Name of the project"><input type="text" value=${project.description_project} id="description_project" class="swal2-input" placeholder="Description">`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Update',
            denyButtonText: `Delete`,
            preConfirm: () => {
                const name_proj = (Swal.getPopup()!.querySelector('#name_proj')! as HTMLInputElement).value;
                const description_project = (Swal.getPopup()!.querySelector('#description_project')! as HTMLInputElement).value;
                if (!name_proj || !description_project) {
                    Swal.showValidationMessage(`Please enter name of the project and Description`);
                }
                const data: Project = {
                    std_id: id,
                    name_proj: name_proj,
                    description_project: description_project,
                };
                return data;
            }
        });
        if (result_2.isConfirmed) {
            CandidateService.editProject(result_2.value!);
            Swal.fire('Saved!', '', 'success');
        } else if (result_2.isDenied) {
            CandidateService.deleteProject(id, project.name_proj);
            Swal.fire('The Project was deleted successfully', '', 'success');
        }
        refreshProject(id);
    }


    const addNewProject = () => {
        let showSuccess = false;
        Swal.fire({
            title: 'Add new Project',
            html: `<input type="text"  maxlength="40" id="name_proj" class="swal2-input" placeholder="Name of the project">
            <input type="text" id="description_project" maxlength="250" class="swal2-input" placeholder="Description">`,
            confirmButtonText: 'Add',
            focusConfirm: false,
            preConfirm: () => {
                const name_proj = (Swal.getPopup()!.querySelector('#name_proj')! as HTMLInputElement).value;
                const description_project = (Swal.getPopup()!.querySelector('#description_project')! as HTMLInputElement).value;
                if (!name_proj || !description_project) {
                    Swal.showValidationMessage(`Please enter Name and Description of the Project`)
                }
                const data: Project = {
                    std_id: id,
                    name_proj: name_proj,
                    description_project: description_project,
                };
                showSuccess = true;
                return data;
            }
        }).then((result) => {

            if (showSuccess) {
                CandidateService.addProject(id, result.value!);
                success();
                refreshProject(id);
            }
        })
    }
    useEffect(() => {
        getCandidateProject(id);
    }, [id])
    return (<>
        <div style={{ margin: "4%" }}></div>
        <p>My Projects</p>

        {project[0] ? (
            <Box key="Project Box" sx={{ flexGrow: 1 }}>

                <Grid container spacing={2} columns={16}>
                    <Grid key="name_proj" item xs={8}>
                        <TitleItem>Name</TitleItem>
                    </Grid>
                    <Grid style={{ textAlign: "start" }} key="Description of the peoject" item xs={8}>
                        <TitleItem>Description</TitleItem>
                    </Grid>

                    {project.map((project) => (
                        <>
                            <Grid style={{ cursor: "pointer" }} onClick={() => updataAndDeleteProject(project)} item xs={8}>
                                <Item>{project.name_proj}</Item>
                            </Grid>
                            <Grid style={{ cursor: "pointer" }} onClick={() => updataAndDeleteProject(project)} item xs={8}>
                                <Item>{project.description_project}</Item>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Box>
        ) : (
            <div>There is No any Projects yet</div>
        )}
        <br />

        <Button key="addNewProject" onClick={addNewProject} variant="contained" color="success">
            Add new Project
        </Button>

        <br />
        <br />
    </>);
}
export default ProjectComp;