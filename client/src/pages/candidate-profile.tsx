
const CandidateProfile = () => {
    return  <>
    <div className="card-block">
        <div className="m-b-25"> <img
                src="https://www.nordicjobsworldwide.com/wp-content/uploads/2018/02/company-culture-min-1030x692-1030x692.jpg"
                className="img" alt="logo"/>
        </div>
    </div>


    <div className="card-block">
        <h3 className="m-b-20 p-b-5 b-b-default f-w-600 ">Company Information </h3>
        <div>
            <div>
                <p className="text-muted m-b-10 f-w-600">Company Name</p>
                <input type="text" placeholder="Name Of Company"/>
                <br/>
                <hr/>
            </div>


            <div>
                <p className="text-muted m-b-10 f-w-600">Company Details</p>
                <textarea name="Text1" cols={40} rows={5} placeholder="Details about the company and its available jobs ... etc."></textarea>
                <br/>
                <hr/>
            </div>


            <div>
                <p className="text-muted m-b-10 f-w-600">Location</p>
                <input type="text" placeholder="Location"/>
                <br/>
                <hr/>
            </div>


            <div>
                <p className="text-muted m-b-10 f-w-600">Email</p>
                <input type="email" placeholder="sample@gmail.com"/>
                <br/>
                <hr/>
            </div>


            <div>
                <p className="text-muted m-b-10 f-w-600">Phone</p>
                <input type="tel" id="phone" name="phone" placeholder="012-345-6789"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                <br/>
                <hr/>
            </div>


            <div>
                <p className="text-muted m-b-10 f-w-600">Website</p>
                <input type="url" placeholder="link Of website"/>

            </div>
        </div>

    </div>
    </> ;
  };
  
  export default CandidateProfile;