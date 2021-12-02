import { Button } from "./styles";

interface Props {
    name: string;
    image: string;
    description: string;
    email: string;
    country: string;
}

const Card = ({ name, image, description, email, country }: Props) => {
    return <div className="card">
        <img src={image ?? (require('../../img/No-Image.png').default)} alt={name} style={{ width: "100%" }} />
        <h1>{name}</h1>
        <p className="title">{description}</p>
        <p>{country}</p>
        <p>
            <Button>Contact</Button>
        </p>
    </div>
}

export default Card;
