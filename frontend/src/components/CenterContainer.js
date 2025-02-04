export default function CenterContainer(props){
    return(
        <div className="center-container">
            <div style={{width:`${props.width ? props.width : "90%"}`}}>
                {props.children}
            </div>
        </div>
    )
}