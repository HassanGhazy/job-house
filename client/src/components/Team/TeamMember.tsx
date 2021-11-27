
function TeamMember(props : any) {
    return (
        <div className="col-md-4 col-sm-6 border">
            <div className="card">
                <div className="card-header">
                    <img style={{ maxWidth: '100%' }} src={props.info.img} alt='icon of image' />
                </div>
                <div className="card-body">
                    <h2>{props.info.name}</h2>
                    <h5>{props.info.position}</h5>
                    <div>{props.info.phone}</div>
                    <div>{props.info.email}</div>
                </div>
            </div>

        </div>
    )
}

export default TeamMember;