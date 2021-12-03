
import Swal from 'sweetalert2';
const success = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your profile has been updated!',
        showConfirmButton: false,
        timer: 1500
    })
}


export default success;