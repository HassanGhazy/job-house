type TitleProps = {title : string}
const TitleDangerWidget = (props : TitleProps) => {
    const title = props.title;
    return (<>
        <p style={{padding: "10px", color: "aliceblue", background: "#333", borderLeft: "solid 6px red",width: "100%"}}>{title}</p>
    </>);
}
export default TitleDangerWidget;