import { useState, useEffect } from "react";
import CandidateService from "../../../services/StudentService";
import './style.css';
import Button from '@mui/material/Button';
import success from '../my-swal';
import SkillStudentData from "../../../types/skill-std";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';


// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
// const animatedComponents = makeAnimated();
// const [selectedOption, setSelectedOption] = useState();

type IDParams = { id: string };
const SkillComp = (props: IDParams) => {
  const id = props.id;
  const initialSkillState = [{
    skill_id: null,
    title: "",
  }];
  const initialSkillCandidateState = [{
    skill_id: "",
    std_id: "",
    title: "",
  }];

  const initialnewSkillState = [{
    std_id: "",
    skill_id: "",
  }];

  const initialSelectedSkillState = [{
    skill_id: "",
    std_id: "",
    title: "",
  }];

  const [skillData, setSkillData] = useState(initialSkillState);
  const [skillCandidate, setSkillCandidate] = useState(initialSkillCandidateState);
  const [newSkill, setNewSkill] = useState(initialnewSkillState);
  const [selectedSkill, setSelectedSkill] = useState(initialSelectedSkillState);
  const [search, setSearch] = useState("");

  const getSkill = () => {

    CandidateService.getAllSkill()
      .then((response: any) => {
        setSkillData(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getSkillCurrentCandidate = (id: string) => {

    CandidateService.getSkillCandidate(id)
      .then((response: any) => {
        setSkillCandidate(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const addNewSkill = async (data: SkillStudentData[]) => {

    const resultPromise = new Promise(async (resolve, reject) => {
      for (let i = 0; i < data.length; i++) {
        try {
          await CandidateService.addSkill(data[i]);
          success();
          setSelectedSkill([]);
          refreshSkillCandidate(id);
        } catch (x) {
          console.log(x);
        }

      }
    })
    return resultPromise;
  };


  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const mySkills = [];
    const tmpNewSkill = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      mySkills.push({ "skill_id": selectedOptions[i].value.split(":")[0], "std_id": id, "title": selectedOptions[i].value.split(":")[1] });
      tmpNewSkill.push({ "std_id": id, "skill_id": selectedOptions[i].value.split(":")[0] });
    }
    setSelectedSkill(mySkills);
    setNewSkill(tmpNewSkill);

  };


  const refreshSkillCandidate = (id: string) => {
    getSkillCurrentCandidate(id);
  }

  async function DeleteSkill(skill_id : string) {
    const result_2 = await Swal.fire({
        title: 'Do you want to do changes?',
        showDenyButton: true,
        showCancelButton: false,
        denyButtonText: `Delete`,
        confirmButtonText: 'Cancel',
        
    });
    if (result_2.isDenied) {
        CandidateService.deleteSkill({'std_id' : id, 'skill_id' : skill_id});
        Swal.fire('The Skill was deleted successfully', '', 'success');
    }
    refreshSkillCandidate(id);
}


  useEffect(() => {
    getSkill();
    getSkillCurrentCandidate(id);
  }, [id])
  return <>
  <p>My Skills</p>

    <div className="col-md-6">
      {/* <Select  options={skillData.map(({ skill_id, title }) => ({ value: skill_id, label: title }))} isSearchable components={animatedComponents}
        isMulti /> */}
      {skillCandidate &&
        skillCandidate.map((s) => <button id="custom-button" onClick={() => DeleteSkill(s.skill_id!)}><span className="skill">{s.title}</span></button>)}
      <br />
      <TextField

        style={{ width: 400 }}
        id="Search"
        label="Search"
        value={search}
        onChange={e => {setSearch(e.target.value); setSkillData(skillData.filter(skill => skill.title.toLowerCase().includes(search.toLowerCase())));  if (search === "") getSkill() }}
      />

      <div className="container">
        <select multiple className="select" onChange={onChangeHandler} >
          {skillData.map((e) => <option value={e.skill_id! + ":" + e.title!}>{e.title}</option>)}
        </select>
        {selectedSkill &&
          selectedSkill.map((s) => <span className="skill">{s.title}</span>)}
        <br />
        <Button key="addNewSkill" onClick={() => addNewSkill(newSkill)} variant="contained" color="success">
          Save
        </Button>
      </div>

    </div>
    <br />

  </>
};


export default SkillComp;