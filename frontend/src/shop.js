import React, { useEffect, useState } from "react";
import Cheader from "./comman";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./footer";
import {useCookies} from 'react-cookie';
import { useDispatch } from "react-redux";

const Shop = () => {
  const [count, setcount]=useState(0);
  const {cid} = useParams();
  const [subcatdata, setsubcatdata] = useState([]);
  const [productdata,setproductdata]=useState([]);
  const jump=useNavigate();
  const [cookie,setcookie,removecookie]=useCookies();
  const dispatch=useDispatch();

  



  const loadsubcategory = async (x) => {
  
    const re = await fetch("http://localhost:7000/subcategory", {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ catid: x }),
    });
    const data = await re.json();
    
    setsubcatdata(data);
    
    
  };
  useEffect(() => {
    
    loadsubcategory(cid);
    setproductdata([]);
    
  }, [cid]);


  const loadproduct=async(x)=>{
    const re=await fetch("http://localhost:7000/product",{
        method:"PATCH",
        headers:{"Content-Type":"Application/json"},
        body:JSON.stringify({subcatid:x})
    });
    const data=await re.json();
    setproductdata(data);
}

const addtocart=async(x,y,z,a)=>{
  if(cookie["mycookie"]!=null)
  {
      const re=await fetch("http://localhost:7000/cart",{
        method:"POST",
        headers:{"Content-Type":"Application/json"},
        body:JSON.stringify({productid:x,productname:y,price:z,picname:a,username:cookie["mycookie"]})
      });
      const data=await re.json();
      alert(data.msg);
      dispatch({type:"plus"});
  }
  else{
    jump("/login");
  }

}



  return (
    <>
      <Cheader/>   
    


<div className="container-fluid pt-2">
      <div className="row">
        {/* Sidebar for Categories */}
        <div className="col-2 bg-light sidebar p-3">
          <h4 className="text-primary mb-4">Fruits</h4>
          <ul className="list-unstyled">
            {subcatdata.map((x) => (
              <li
                key={x._id}
                className="subcategory-item pb-2 d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => loadproduct(x._id)}
              >
                <img
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                  src={"http://localhost:7000/" + x.subcategorypic}
                  alt={x.subcategoryname}
                />
                <span className="ms-3">{x.subcategoryname}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content for Products */}
        <div className="col-10">
          <div className="row">
            {productdata.map((x) => (
              <div key={x._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card product-card">
                  <img
                    className="card-img-top"
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                    src={"http://localhost:7000/" + x.productpic}
                    alt={x.productname}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{x.productname}</h5>
                    <p className="card-text">
                      Price: ₹ <del className="text-danger">{x.price}</del>&nbsp; ₹{x.offerprice}
                    </p>
                    <p className="card-text product-description">{x.description}</p>
                    <button
                      className="btn btn-success"
                      onClick={() => addtocart(x._id, x.productname, x.offerprice, x.productpic)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>



      <Footer/>
    </>
  );
};

export default Shop;
