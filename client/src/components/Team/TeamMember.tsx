
(function () {
    const link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
})();

const TeamMember = (props: any) => {
    return (
        <div className="col-md-4 col-sm-6 border">
            <div className="card">
                <div className="card-header">
                    <img style={{ maxWidth: '100%' }} src={props.info.img} alt={props.info.name} />
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


/*
React Props

It is an object which stores the value of attributes of a tag and work similar to the HTML attributes.
It gives a way to pass data from one component to other components. It is similar to function arguments. 
Props are passed to the component in the same way as arguments passed in a function.
*/