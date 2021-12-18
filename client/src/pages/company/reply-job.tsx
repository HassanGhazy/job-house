
import { useState, useEffect } from "react";
import CompanyService from "../../services/CompanyService";
import JobService from "../../services/JobService";
import RequestJobData from '../../types/request-job';
import ReplyStatusJob from '../../types/reply-status-job';
import success from '../global-widget/my-swal';
import Button from '@mui/material/Button';
import TitleWidget from '../global-widget/title-widget';
type IDParams = { id: string }
const ReplyJob = (props: IDParams) => {
    const id = props.id;

    const [currentrequestedJob, setCurrentrequestedJob] = useState<RequestJobData[]>([]);


    const getRequestedJob = (id: string) => {
        CompanyService.getJobRequests(id)
            .then((response: any) => {
                setCurrentrequestedJob(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const sendStatus = (status: ReplyStatusJob) => {
        JobService.replyStatusJob(status)
            .then((response: any) => {
                success();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    useEffect(() => {

        getRequestedJob(id);
    }, [id])

    return (<>
        <TitleWidget title="Requested Job" />


        {currentrequestedJob.length !== 0 && currentrequestedJob.map(e => {
            const date = e.date_submited.toString().split("T");
            return <>
                <p>There is a request Job from this <a style={{ color: "red" }} rel="noreferrer" target="_blank" href={"/candidate-profile/" + e.std_id}>Candidate</a> for the <a style={{ color: "red" }} rel="noreferrer" href={"/" + e.comp_id + "/job-profile/" + e.job_id} target="_blank">job</a> with ID {e.job_id}</p>
                <p style={{ fontSize: 15, color: "#9b9b9b" }}>Date Submit: {date[0] + " " + date[1].slice(0, date[1].lastIndexOf('.'))}</p>
                <p>Reply with&nbsp;
                    <Button key="ReplyAccept" onClick={() => sendStatus({ status: "A", comp_id: id, job_id: e.job_id, std_id: e.std_id })} variant="contained" color="success">
                        Accept
                    </Button>&nbsp;
                    <Button key="ReplyReject" onClick={() => sendStatus({ status: "R", comp_id: id, job_id: e.job_id, std_id: e.std_id })} variant="contained" color="error">
                        Regect
                    </Button>&nbsp;
                    <Button key="ReplyUnderReview" onClick={() => sendStatus({ status: "U", comp_id: id, job_id: e.job_id, std_id: e.std_id })} variant="contained" color="warning">
                        Under Review
                    </Button>


                </p>
            </>
        })}
        {currentrequestedJob.length === 0 && <p>There is no any requested for any job yet</p>}

    </>);

}
export default ReplyJob;