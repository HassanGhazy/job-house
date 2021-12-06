import TeamMember from "./TeamMember";
import { Fade } from "react-awesome-reveal";

const Team = () => {

    return (


        <Fade direction="left">

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


        </Fade>


    )
}

export default Team;