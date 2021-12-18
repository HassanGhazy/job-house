
import { useState } from "react";
import GlobalService from "../../services/GlobalService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import success from './my-swal';
import TitleDangerWidget from '../candidate/title-danget-widget';
type IDParams = { id: string, type: string };
const DangerZoneComp = (props: IDParams) => {
    const id = props.id;
    const type = props.type;
    const initialPasswordState = {
        std_id: null,
        comp_id: null,
        old_password: "",
        new_password: "",
    };

    const [currentPassword, setCurrentPassword] = useState(initialPasswordState);
    const confirmPassword = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The Old password is not correct',
        })
    }

    // const updatePassword = () => {
    //     GlobalService.updatePassword(id, type, currentPassword)
    //         .then((response: any) => {
    //             success();
    //         })
    //         .catch((e: Error) => {
    //             confirmPassword();
    //             console.log(e);
    //         });
    // };
    const deleteUser = () => {
        GlobalService.remove(id , type)
            .then((response: any) => {
                window.location.href = "/";
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
                    // let res = await GlobalService.checkPassword(id, type, { 'password': pass });

                    // if (res.data.message) {
                    //     return deleteUser();
                    // } else {
                    //     return swalWithBootstrapButtons.fire(
                    //         'Failed',
                    //         'The Password is not correct',
                    //         'error'
                    //     );
                    // }
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

                <TextField
                    style={{ width: 400 }}
                    id="old_password"
                    key="old_password"
                    label="Old Password"
                    autoComplete="true"
                    type='password'
                    value={currentPassword.old_password}
                    onChange={e => setCurrentPassword({ ...currentPassword, old_password: e.target.value })}

                />
                <br />
                <br />
                <TextField
                    style={{ width: 400 }}
                    id="new_password"
                    autoComplete="true"
                    key="new_password"
                    type='password'
                    label="New Password"
                    value={currentPassword.new_password}
                    onChange={e => setCurrentPassword({ ...currentPassword, new_password: e.target.value ?? "" })}

                />
                <br />
                <br />
                <Button key="updatePassword"  variant="contained" color="success">{/**updatePassword */}
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