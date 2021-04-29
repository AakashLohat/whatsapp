import {Circle} from "better-react-spinkit"

function Loading() {
    return (
        <center style={{display: 'grid',placements:"center",height:"100vh"}}>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"  style={{marginBottom:10}} height={200} />
            </div>
            <Circle color="#3CBC28" size={60}/>
        </center>
    )
}

export default Loading
