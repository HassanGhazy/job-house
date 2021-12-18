import { useState, useEffect } from "react";
import CompanyService from "../../../services/CompanyService";
import TextField from '@mui/material/TextField';
import '../../global-widget/style.css';
import Swal from 'sweetalert2';
import TitleWidget from '../../global-widget/title-widget';
import SkillJobData from "../../../types/skill-job";


type IDParams = { id: string }
const SkillJobComp = (props: IDParams) => {
    const id = props.id;

    const [currentSkillJob, setCurrentSkillJob] = useState<SkillJobData[]>([]);
    const [search, setSearch] = useState("");



    const getSkillJob = (id: string, idJob: string) => {
        if (idJob) CompanyService.getSkillJob(id, idJob)
            .then((response: any) => {
                setCurrentSkillJob(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshSkillJob = (id: string) => {
        getSkillJob(id, search);
    }

    async function DeleteSkill(skill_id: string, job_id: string) {

        if (skill_id) {
            const result_2 = await Swal.fire({
                title: 'Do you want to do changes?',
                showDenyButton: true,
                showCancelButton: false,
                denyButtonText: `Delete`,
                confirmButtonText: 'Cancel',

            });
            if (result_2.isDenied) {
                CompanyService.deleteSkillJob(id, job_id, skill_id).then(res => console.log(res));
                Swal.fire('The Skills was deleted successfully', '', 'success');
            }
            refreshSkillJob(id);
        }
    }



    useEffect(() => {
        getSkillJob(id, search);
    }, [id, search])

    return (<>
        <TitleWidget title="Looking for the Skills for any job" />

        <TextField
            style={{ width: 400 }}
            id="Search"
            label="Enter The ID"
            value={search}
            onChange={e => { setSearch(e.target.value) }}
        />
        <br />
        {currentSkillJob &&
            currentSkillJob.map((s) => <button id="custom-button" onClick={() => DeleteSkill(s.skill_id, s.job_id)}><span className="skill">{s.title}</span></button>)}
        <br />
        <br />

        

    </>);

}
export default SkillJobComp;