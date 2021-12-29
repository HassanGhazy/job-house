
import { useState, useEffect } from "react";
import GlobalService from "../../services/GlobalService";
import { Row } from "antd";
import { Link } from "react-router-dom";
import SideBar from '../../components/Sidebar';
(function () {
    const link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
})();
const SearchPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const edu = urlParams.get('edu');
    const skill = urlParams.get('skill');
    const proj = urlParams.get('proj');
    const desc = urlParams.get('desc');
    const type = urlParams.get('type');

    const [result, setResult] = useState<any[]>([]);

    useEffect(() => {
        const getSearchResult = () => {
            GlobalService.getSearchResult(edu ?? "", proj ?? "", desc ?? "", skill ?? "", type ?? "")
                .then((response: any) => {
                    console.log(response);
                    setResult(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getSearchResult();
    }, [edu, proj, desc, skill, type])
    return (<>
        <div style={{ margin: "0 auto", width: "80%" }} className="list row">
            <div style={{ width: "100%" }} className="col-md-16">
                <ul className="cards">
                    {result &&
                        result.map((student: any) => (
                            <li key={student.std_id + student.name}>
                                <Link id={student.std_id} to={'/candidate-profile/' + student.std_id} className="card">
                                    {/* <img src={student.image ?? '/img/No-Image.png'} className="card__image" alt={student.name} /> */}
                                    <div className="card__overlay">
                                        <div className="card__header">
                                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                            <img style={{height: 300, width: 250}} className="card__thumb" src={student.image ?? '/img/No-Image.png'} alt={student.name} />
                                            <div className="card__header-text">
                                                <h3 className="card__title">{student.name}</h3>
                                                <span className="card__status">{student.country}</span>
                                            </div>
                                        </div>
                                        <Row justify="space-between">
                                            <p className="card__description">{student.description}</p>
                                        </Row>
                                    </div>
                                </Link>
                            </li>

                        ))}
                </ul>

            </div>
        </div>
        <SideBar />

        {result.length === 0 &&
            <div>
                <br />
                <p style={{ textAlign: "center" }}>No Results</p>
            </div>
        }


    </>);
}
export default SearchPage;