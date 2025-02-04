export default function VariableSpacer(props){
    const spacerStyle = {
        height: `${props.height ? props.height : "12vh"}`
    }
    return(
        <div className="variable-spacer" style={spacerStyle}></div>
    )
}