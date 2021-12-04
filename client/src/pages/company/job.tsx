
import JobData from '../../types/job';
import { useState, useEffect } from "react";
import CompanyService from "../../services/CompanyService";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import success from '../global-widget/my-swal';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridCellEditCommitParams } from '@mui/x-data-grid';
import TitleWidget from '../global-widget/title-widget';


type IDParams = { id: string };
const JobComp = (props: IDParams) => {
    const id = props.id;
    const initialCompanyJobState = [{
        job_id: "",
        comp_id: "",
        job_title: "",
        description: "",
        date_submit: "",
        status: "",
        salary: 0,
        views: 0,
        button_apply: 0,
    }];

 

    const [currentCompanyJob, setCurrentCompanyJob] = useState<JobData[]>(initialCompanyJobState);
    const [snackbar, setSnackbar] = useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const handleCellEditCommit =
        async (params: GridCellEditCommitParams, job: any) => {
            try {
                const field = params.field;
                job[`${field}`] = params.value;
                CompanyService.editJob(id, job)
                setSnackbar({ children: 'Job successfully saved', severity: 'success' });
            } catch (error) {
                setSnackbar({ children: 'Error while saving Job', severity: 'error' });
            }
        };

    const getJob = (id: string) => {
        CompanyService.getJob(id)
            .then((response: any) => {
                setCurrentCompanyJob(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };



   

    const refreshJob = (id: string) => {
        getJob(id);
    }

    async function deleteJob(job_id: string) {
        const result_2 = await Swal.fire({
            title: 'Do you want to do changes?',
            showDenyButton: true,
            showCancelButton: false,
            denyButtonText: `Delete`,
            confirmButtonText: 'Cancel',

        });
        if (result_2.isDenied) {
            CompanyService.deleteJob(id, job_id);
            Swal.fire('The Skill was deleted successfully', '', 'success');
        }
        refreshJob(id);
    }


//            <select type="select" id="status" ><option value="A">Available</option><option value="U">Unavailable</option></select>



    const addNewJob = () => {
        let showSuccess = false;
        Swal.fire({
            title: 'Add new Job',
            html: `
            <input type="text" id="job_title" class="swal2-input" placeholder="Title"/><br/><br/>
            <textarea type="text" id="description" class="swal2-textarea" placeholder="description of the job. add any useful information such as job type or any image"></textarea>
            <input type="date" id="date_submit" class="swal2-input" placeholder="Date Submit"/>
            <input type="number" id="salary" class="swal2-input" placeholder="Salary"/>
        `,
            confirmButtonText: 'Add',
            focusConfirm: false,
            preConfirm: () => {
                const job_title = (Swal.getPopup()!.querySelector('#job_title')! as HTMLInputElement).value;
                const description = (Swal.getPopup()!.querySelector('#description')! as HTMLInputElement).value;
                const date_submit = (Swal.getPopup()!.querySelector('#date_submit')! as HTMLInputElement).value;
                const salary = (Swal.getPopup()!.querySelector('#salary')! as HTMLInputElement).value;
                if (!job_title || !description || !date_submit || !salary) {
                    Swal.showValidationMessage(`Please enter Title, Description, Date Submit, and Salary`)
                }

                const data: JobData = {
                    comp_id: id,
                    button_apply: 0,
                    date_submit: date_submit,
                    description: description,
                    job_title: job_title,
                    salary: parseInt(salary),
                    status: 'A',
                    views: 0,

                };
                showSuccess = true;
                return data;
            }
        }).then((result) => {

            if (showSuccess) {
                CompanyService.addJob(id, result.value!);
                success();
                refreshJob(id);
            }
        })
    }

    useEffect(() => {
        getJob(id);
    }, [id])


    const columns: GridColDef[] = [
        { field: 'job_id', headerName: 'ID', width: 70 },
        { field: 'status', headerName: 'Status', width: 70, editable: true, },
        { field: 'job_title', headerName: 'Title', width: 160, editable: true, },
        { field: 'description', headerName: 'Description', width: 365, editable: true, },
        {
            field: 'date_submit',
            headerName: 'Date Submit', type: 'date',
            width: 120,
            editable: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            type: 'number',
            width: 100,
            editable: true,
        },
        {
            field: 'button_apply',
            headerName: 'Apply',
            type: 'number',
            width: 70,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Delete',
            width: 80,
            description: "Delete",
            renderCell: () => <DeleteIcon />
        }

              
    ];

   

    return (<>

        <div style={{ margin: "4%" }}></div>
        <TitleWidget title="Our Job"/>
        

        {currentCompanyJob[0] ? (
            <>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={currentCompanyJob}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={currentCompanyJob => currentCompanyJob.job_id}
                        onCellEditCommit={(params) => handleCellEditCommit(params, currentCompanyJob.filter(e => e.job_id === params.id)[0])}
                        onCellClick={e => e.field === "actions" ? deleteJob(e.id.toString()) : null }


                    />
                    {!!snackbar && (
                        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                            <Alert {...snackbar} onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )}
                </div>
                <br />
            </>
        ) : (
            <div>There is No any Jobs yet</div>
        )}

        <Button key="addNewJob" onClick={addNewJob} variant="contained" color="success">
            Add new Job
        </Button>
        <br />
        <br />
    </>);


}
export default JobComp;