type ColorProps = {background : string , data : string};
const Status = (props : ColorProps) => {
    const background = props.background;
    const data = props.data;
    return <p style={{display: "inline", background: background, color: "white", border: "1px solid #000", borderRadius: "5px",right: "17%", position: "absolute",padding: 3}}>{data}</p>
}
export default Status;
