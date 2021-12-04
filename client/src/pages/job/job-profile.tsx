
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import JobService from "../../services/JobService";
import CompanyService from "../../services/CompanyService";
import { RouteComponentProps } from "react-router-dom";
import TitleWidget from '../global-widget/title-widget';
import JobData from "../../types/job";
// import Footer from '../../components/Footer';
import Button from '@mui/material/Button';
import Status from './status';
type TParams = { id: string, compId: string };
const JobProfile = ({ match }: RouteComponentProps<TParams>) => {
    const id = match.params.id;
    const compId = match.params.compId;
    const initialJobState = {
        job_id: "",
        comp_id: "",
        job_title: "",
        description: "",
        date_submit: "",
        status: "",
        salary: 0,
        views: 0,
        button_apply: 0,
    };

    const initialApplyState = [{
        button_apply: 0,
    }];

    const [currentJob, setCurrentJob] = useState<JobData>(initialJobState);
    const [applyNumber, setApplyNumber] = useState(initialApplyState);





    const UpdateNumberOfApply = () => {
        console.log("applyNumber", applyNumber);

        JobService.updateNumberOfApply(id, compId, { "button_apply": applyNumber }).then((response: any) => {
            console.log(response);
        })
            .catch((e: Error) => {
                console.log(e);
            });


    };


    const success = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your request has been sent!',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const faild = () => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'You have already sent your request!',
            showConfirmButton: true,
            timer: 3000
        })
    }

    const RequestJob = () => {
        const today = new Date();
        //TODO: get the std_id
        JobService.requestJob({ "comp_id": compId, "job_id": id, "std_id": 4, "date_submited": today }).then((response: any) => {
            UpdateNumberOfApply();
            success();

        })
            .catch((e: Error) => {
                faild();
                console.log(e);
            });


    };



    useEffect(() => {
        const getJob = () => {
            CompanyService.getSingleJob(compId, id)
                .then((response: any) => {
                    setCurrentJob(response.data[0]);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        const getNumberOfApply = async () => {
            await JobService.getNumberOfApply(id, compId)
                .then((response: any) => {
                    setApplyNumber(response.data[0].button_apply + 1);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getJob();
        getNumberOfApply();
    }, [compId, id])



    return (<>

        <div>
            {currentJob ? (
                <>
                    <div style={{ margin: "0 auto", width: "69%", padding: 20 }}>
                        <p style={{ padding: 10 }}></p>
                        <TitleWidget title="Job Detail" />
                        {currentJob.status === "A" ? <Status data="Available" background="#0aa700" /> : <Status data="UnAvailable" background="#979797" />}
                        <br />
                        <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ fontSize: 13, color: "#000" }}>Salary: {currentJob.salary}</p>
                            <p style={{ fontSize: 13, color: "#000" }}>Views: {currentJob.views}</p>
                        </div>
                        <p>{currentJob.job_title}</p>
                        <hr />
                        <p>{currentJob.description}</p>
                        <p>Deadline: {currentJob.date_submit.split("T")[0]}</p>
                        <hr/>
                        <p style={{fontSize: 14, color: "#ddd"}}>The number who was applied is: {currentJob.button_apply}</p>
                        {currentJob.status === "A" ? <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={RequestJob} key="applyJob" variant="contained" color="success">
                                Apply
                            </Button>
                        </div> : null}
                    </div>

                </>
            ) : (
                <div>
                    <br />
                    <p style={{ textAlign: "center" }}>No Data Found For The Current Job</p>
                    <p style={{ textAlign: "center" }}>Maybe Deleted Or There are some issues with the url</p>

                </div>
            )}
        </div>


    </>
    );
};
export default JobProfile;