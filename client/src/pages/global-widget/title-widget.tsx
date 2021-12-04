type TitleProps = {title : string}
const TitleWidget = (props : TitleProps) => {
    const title = props.title;
    return (<>
        <p style={{padding: "10px", color: "aliceblue", background: "#333", borderLeft: "solid 6px #61a5c2",width: "100%"}}>{title}</p>
    </>);
}
export default TitleWidget;