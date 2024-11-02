import { useEffect, useState } from "react"
import Cheader from "./comman";
import Footer from "./footer";

const Home=()=>{
   
  
    useEffect(()=>{
       
    },[])


   

    
    return(<>
       
        <Cheader />
        
        <div id="demo" className="carousel slide" data-bs-ride="carousel">

{/* <!-- Indicators/dots --> */}
<div className="carousel-indicators">
  <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
  <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
  <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
</div>

{/* <!-- The slideshow/carousel --> */}
<div className="carousel-inner">
  <div className="carousel-item active">
    <img style={{height:"300px"}} src={require("./images/banner_kids.png")} alt="Los Angeles" className="d-block w-100" />
  </div>
  <div className="carousel-item">
    <img style={{height:"300px"}} src={require("./images/banner_mens.png")} alt="Chicago" className="d-block w-100" />
  </div>
  <div className="carousel-item">
    <img style={{height:"300px"}} src={require("./images/banner_women.png")} alt="New York" class="d-block w-100" />
  </div>
</div>

{/* <!-- Left and right controls/icons --> */}
<button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
  <span className="car carousel-control-prev-icon"></span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
  <span className="carousel-control-next-icon"></span>
</button>
</div>


<Footer/>
        
    </>)
}
export default Home