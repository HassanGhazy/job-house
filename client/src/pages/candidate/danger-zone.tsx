
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import CandidateService from "../../services/StudentService";
import TitleDangerWidget from './title-danget-widget';
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

type IDParams = { id: string };

const DangerZoneComp = (props: IDParams) => {
    const id = props.id;

    const deleteCandidate = () => {
        CandidateService.remove()
            .then((response: any) => {
                signOut().then(() => {
                    window.location.href = "/";
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const confirmDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            html: `<input type="password" id="pass" class="swal2-input" placeholder="Password">`,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            preConfirm: () => {
                const pass = (Swal.getPopup()!.querySelector('#pass')! as HTMLInputElement).value;
                new Promise(async (resolve, reject) => {
                    const res = await CandidateService.checkPassword(id, { password: pass });
                    if (res.data.message) {
                        return deleteCandidate();
                    } else {
                        return swalWithBootstrapButtons.fire(
                            'Failed',
                            'The Password is not correct',
                            'error'
                        );
                    }
                });


            }
        }).then((result) => {

            if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Profile is safe :)',
                    'error'
                )
            }
        })
    }

    return (<>
        <div style={{ textAlign: "center" }}>
            <p style={{ color: "red" }}>
                Danger Zone
            </p>

        </div>
        <form>
            <div style={{ textAlign: "start" }}>

                <TitleDangerWidget title="Change your Password" />

                <Button key="updatePassword" onClick={() => window.location.href = "/auth/reset-password"} variant="contained" color="success">
                    Update Password
                </Button>

                <br />
                <br />

                <TitleDangerWidget title="Delete Account" />
                <Button key="confirmDelete" onClick={confirmDelete} variant="outlined" color="error">
                    Delete
                </Button>
                <br />
                <br />
            </div>
        </form>

    </>);

}

export default DangerZoneComp;