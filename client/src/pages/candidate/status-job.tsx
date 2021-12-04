
import TitleWidget from '../global-widget/title-widget';
import ReplyStatusJob from '../../types/reply-status-job';
import { useState, useEffect } from "react";
import JobService from "../../services/JobService";


type IDParams = {id : string}
const StatusJobComp = (props : IDParams)=> {
    const id = props.id;
    const initialRequestedJobState = [{
        std_id: "",
        comp_id: "",
        job_id: "",
        status: "",
    }];

    const [statusJob, setStatusJob] = useState<ReplyStatusJob[]>(initialRequestedJobState);

    const getStatusJob = (id : string) => {
        JobService.getStatusJob(id)
            .then((response: any) => {
                setStatusJob(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    useEffect(() => {
        getStatusJob(id);
    }, [id])

    return(<>
    <TitleWidget title="Status Job"/>
        {statusJob && statusJob.map(e => <p>Your request for this <a target="_blank" rel="noreferrer" style={{color: "red"}} href={"/job-profile/" + e.job_id}>Job</a> was {e.status ===  "A" ? "Accepted" : e.status ===  "U" ? "Under Review" : "Rejected"}</p>)}
        {statusJob.length === 0 && <p>You didn't apply to any job yet</p>}
    </>);
}
export default StatusJobComp;