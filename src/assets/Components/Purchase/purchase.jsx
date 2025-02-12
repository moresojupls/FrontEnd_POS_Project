import { Block } from "@mui/icons-material"
import image from "../../image"
import Myimg from "../Image/img"

 function purchase(){
    return <>

    <div>
        <h3>order List</h3>

    </div>

    <div>
        <button className="btn" style={{backgroundColor:"#FFE8AD",marginRight:'30px',border:"2px solid #F27951"}}>
            <Myimg size={60} url={image.cash}></Myimg>
            <span class="btn-text">Cash</span>
        </button>
        <button className="btn" style={{backgroundColor:"#FFE8AD",border:"2px solid #F27951"}}>
            <Myimg size={60} url={image.Qrcode}></Myimg>
            <span class="btn-text">Qr Payment</span>
        </button>
        <button className="btn" style={{backgroundColor:"#FFE8AD",marginLeft:'30px',border:"2px solid #F27951"}}>
            <Myimg size={60} url={image.atmcard}></Myimg>
            <span class="btn-text">Credit Card</span>
        </button>
    </div>
    </>
}

export default purchase