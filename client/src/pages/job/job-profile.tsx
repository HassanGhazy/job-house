
import { useState, useEffect, useCallback } from "react";
import JobService from "../../services/JobService";
import CompanyService from "../../services/CompanyService";
import { RouteComponentProps } from "react-router-dom";
import TitleWidget from '../global-widget/title-widget';
import JobData from "../../types/job";
// import Footer from '../../components/Footer';

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

    const [currentJob, setCurrentJob] = useState<JobData>(initialJobState);
    const [view, setView] = useState(0);


    const getView = async () => {
        await JobService.getView(id, compId)
            .then((response: any) => {
                let view = response.data[0].views + 1;
                console.log("response.data", view);
                setView(view);
                UpdateView();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    const UpdateView = () => {
        console.log("view", view);
        JobService.updateView(id, compId, { "views": view }).then((response: any) => {
            console.log("view", view);
            console.log(response);
        })
            .catch((e: Error) => {
                console.log(e);
            });


    };

    const getJob = () => {
        CompanyService.getSingleJob(compId, id)
            .then((response: any) => {
                setCurrentJob(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };



    useEffect(() => {
        getView();
        getJob();

    }, [])



    return (<>

        <div>
            {currentJob ? (
                <>


                    <TitleWidget title="Job Details" />
                    <p>{currentJob.views}</p>





                </>
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
export default JobProfile;