import { useState, useEffect, useRef } from "react";
import GlobalService from "../../services/GlobalService";
import CompanyService from "../../services/CompanyService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import success from './my-swal';
import CandidateService from "../../services/StudentService";
import Swal from 'sweetalert2';
import './style.css';
import TitleWidget from '../global-widget/title-widget';
// import Chip from '@mui/material/Chip';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
import SkillType from '../../types/skill';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// This class for company and candidate
type IDParams = { id: string, type: string }
const Skill = (props: IDParams) => {

    const id = props.id;
    const type = props.type;
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

    const [newSkill, setNewSkill] = useState(initialnewSkillState);
    const search = useRef("");
    const [skill, setSkill] = useState<SkillType[]>(initialSkillState);
    const [SkillData, setSkillData] = useState<SkillType[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<SkillType[]>([]);
    const [job_id, setJob_id] = useState("");
    const [skillCandidate, setSkillCandidate] = useState<SkillType[]>([]);


    const getSkillCurrentCandidate = (id: string) => {

        CandidateService.getSkillCandidate(id)
            .then((response: any) => {
                setSkillCandidate(response.data);
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
        if (type === "candidate") getSkillCurrentCandidate(id);
    }

    const addNewSkill = async (data: any) => {
        let done = false;
        const resultPromise = new Promise(async (resolve, reject) => {
            let idJob = document.getElementById('job_id');


            for (let i = 0; i < data.length; i++) {
                if (type !== "candidate") data[i].job_id = (idJob! as HTMLInputElement).value;
                try {
                    if (type === "candidate") {
                        await CandidateService.addSkill(data[i]);
                    } else {

                        await CompanyService.addSkill(data[i]);
                    }
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


    async function DeleteSkill(skill_id: string) {
        const result_2 = await Swal.fire({
            title: 'Do you want to do changes?',
            showDenyButton: true,
            showCancelButton: false,
            denyButtonText: `Delete`,
            confirmButtonText: 'Cancel',

        });
        if (result_2.isDenied) {
            CandidateService.deleteSkill({ 'std_id': id, 'skill_id': skill_id });
            Swal.fire('The Skill was deleted successfully', '', 'success');
        }
        refreshSkill();
    }

    // const handleChange = (event: SelectChangeEvent<string[]>) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     // if (typeof value === 'array') {
    //         const skillTitles =
    //             (value as string[]).map((s) => skillData.find((sd) => sd.title === s)) as {
    //                 skill_id: string;
    //                 title: string;
    //             }[];

    //         setSkillCandidate(skillTitles.map(s => ({...s, std_id: id})));
    //     // }
    // };


    useEffect(() => {
        const getSkill = () => {
            console.log('getSkill');
            GlobalService.getAllSkill()
                .then((response: any) => {
                    setSkill(response.data);
                    setSkillData(skill);
    
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getSkill();

        if (type === "candidate") getSkillCurrentCandidate(id);
    }, [job_id, selectedSkill, id, type, search])


    return (<>
        {console.log("SkillData", SkillData)}
        <div className="col-md-6">
            {(type === "candidate") ? <TitleWidget title="My Skills" /> : <TitleWidget title="Add Skills To Specific Job" />}
            {type === 'candidate' && skillCandidate.length === 0 && <p>You didn't add any skills yet</p>}
            {type === "candidate" && skillCandidate &&
                skillCandidate.map((s) => <button id="custom-button" onClick={() => DeleteSkill(s.skill_id!)}><span className="skill">{s.title!}</span></button>)}
            <br />

            {(type === "candidate") ? <TitleWidget title="Add New Skill" /> : null}
            <TextField
                style={{ width: 400 }}
                id="Search"
                label="Search" 
                value={search.current}
                onChange={e => { search.current = (e.target.value); setSkillData(skill.filter(skill => skill.title!.toLowerCase().includes(search.current.toLowerCase()))); if (search.current === "") setSkillData(skill) }}
            />

            <div className="container">
                <select multiple className="select" onChange={onChangeHandler} >
                    {SkillData.map((e) => <option value={e.skill_id! + ":" + e.title!}>{e.title}</option>)}
                </select>
                {selectedSkill &&
                    selectedSkill.map((s) => <span className="skill">{s.title}</span>)}
                <br />

            </div>

            {(type !== "candidate") && <>
                <br />
                <TextField
                    style={{ width: 400 }}
                    id="job_id"
                    label="Add The Job ID"
                    value={job_id}
                    onChange={e => setJob_id(e.target.value)}
                />
                <br />
            </>

            }

            {(type !== "candidate") && <br />}
            <Button key="addNewSkill" onClick={() => addNewSkill(newSkill)} variant="contained" color="success">
                Save
            </Button>

        </div>
        <br />


        {/* <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            fullWidth={true}
            multiple
            value={skillCandidate.map(s => s.title)}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip label={value} />
                    ))}
                </Box>
            )}
            // MenuProps={MenuProps}
        >
            {skillData.map((s) => (
                <MenuItem
                    key={s.skill_id}
                    value={s.title}
                // style={getStyles(s, personName, theme)}
                >
                    {s.title}
                </MenuItem>
            ))}
        </Select> */}

    </>);
}

export default Skill;