import TeamMember from "./TeamMember";
import { Fade } from "react-awesome-reveal";

const Team = () => {

    return (
<<<<<<< HEAD
        <Fade direction="left">
            <div className="text-center" style={{ backgroundColor: "#212529", borderRadius: ".25rem" }}>
                <h2 style={{ color: "#fff", padding: 15 }}>Our Team</h2>
            </div>
=======


        <Fade direction="left">

>>>>>>> 343f4012de8846ae7bbd46ba9908f596a71ccd19
            <div className="row">

                <TeamMember
                    info={{
                        name: 'Mohammed Al-Habbash',
                        img: '/img/Mohammed.jpg',
                        position: 'Palestin-Gaza',
                        phone: '+972 59-775-5839',
                        email: 'MohammedAl-Habbash@gmail.com',
                    }}
                />
                <TeamMember
                    info={{
                        name: 'Abdallah Abo Abdo',
                        img: '/img/Abdallah.jpg',
                        position: 'Palestin-Gaza',
                        phone: '+972 59-835-2395',
                        email: 'Abdallahaboabdo5@gmail.com',
                    }}
                />
                <TeamMember
                    info={{
                        name: 'Hassan Sammour',
                        img: '/img/Hassan.jpg',
                        position: 'Palestin-Gaza',
                        phone: '+972 59-716-1584',
                        email: 'HassanSammour@gmail.com',
                    }}
                />
            </div>
<<<<<<< HEAD
        </Fade>
=======


        </Fade>


>>>>>>> 343f4012de8846ae7bbd46ba9908f596a71ccd19
    )
}

export default Team;