import { useState, useEffect } from "react";
import GlobalService from "../../services/GlobalService";
import CompanyService from "../../services/CompanyService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import success from './my-swal';

// This class for company and candidate
type IDParams = { id: string }
const Skill = (props: IDParams) => {
    const id = props.id;

    const initialSkillState = [{
        skill_id: null,
        title: "",
    }];

    const initialnewSkillState = [{
        comp_id: "",
        skill_id: "",
        job_id: "",
        std_id: "",
    }];

    const initialSelectedSkillState = [{
        skill_id: "",
        title: "",
    }];
    const [newSkill, setNewSkill] = useState(initialnewSkillState);
    const [search, setSearch] = useState("");
    const [skillData, setSkillData] = useState(initialSkillState);
    const [selectedSkill, setSelectedSkill] = useState(initialSelectedSkillState);
    const [job_id, setJob_id] = useState("");

    const getSkill = () => {

        GlobalService.getAllSkill()
            .then((response: any) => {
                setSkillData(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = event.currentTarget.selectedOptions;

        const tmpNewSkill = [];
        const mySkills = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            tmpNewSkill.push({ "comp_id": id, "std_id": id, "job_id": job_id, "skill_id": selectedOptions[i].value.split(":")[0] });
            mySkills.push({ "skill_id": selectedOptions[i].value.split(":")[0], "title": selectedOptions[i].value.split(":")[1] });
        }
        setSelectedSkill(mySkills);
        setNewSkill(tmpNewSkill);

    };

    const refreshSkill = () => {
        getSkill();
    }

    const addNewSkill = async (data: any) => {
        let done = false;
        const resultPromise = new Promise(async (resolve, reject) => {
            let idJob = document.getElementById('job_id');
           

            for (let i = 0; i < data.length; i++) {
                data[i].job_id = (idJob! as HTMLInputElement).value;
                try {
                    await CompanyService.addSkill(data[i]);
                    done = true;
                    setSelectedSkill([]);
                    refreshSkill();
                } catch (x) {
                    console.log(x);
                    done = false;
                }

            }
            if (done) success();
        });

        return resultPromise;
    };

    useEffect(() => {
        getSkill();
        console.log(job_id);
    }, [job_id, selectedSkill])


    return (<>

        <div className="col-md-6">
            <p>Add Skills To Specific Job</p>
            <TextField
                style={{ width: 400 }}
                id="Search"
                label="Search"
                value={search}
                onChange={e => { setSearch(e.target.value); setSkillData(skillData.filter(skill => skill.title.toLowerCase().includes(search.toLowerCase()))); if (search === "") getSkill() }}
            />

            <div className="container">
                <select multiple className="select" onChange={onChangeHandler} >
                    {skillData.map((e) => <option value={e.skill_id! + ":" + e.title!}>{e.title}</option>)}
                </select>
                {selectedSkill &&
                    selectedSkill.map((s) => <span className="skill">{s.title}</span>)}
                <br />

            </div>
            <br />
            <TextField
                style={{ width: 400 }}
                id="job_id"
                label="Add The Job ID"
                value={job_id}
                onChange={e => setJob_id(e.target.value)}
            />

            <br />
            <br />

            <Button key="addNewSkill" onClick={() => addNewSkill(newSkill)} variant="contained" color="success">
                Save
            </Button>

        </div>
        <br />

    </>);
}

export default Skill;