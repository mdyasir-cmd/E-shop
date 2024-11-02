import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

const Cheader = () => {
  const [cookie, createcookie, removecookie] = useCookies();
  const [catdata, setcatdata] = useState([]);
  const jump = useNavigate();
  const p = useSelector((state) => state.Cartitem);
  const dispatch = useDispatch();
  useEffect(() => {
    loadcart(cookie["mycookie"]);
    loadcategory();
    
  }, []);

  // const [searchstate, setsearchstate] = useState();
  const [productdata, setproductdata] = useState([]);

  const loadsproduct = async (x) => {
    
    const re = await fetch("http://localhost:7000/sproduct", {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ pname: x }),
    });
    const data = await re.json();
    setproductdata(data);
  };
  // useEffect(() => {
  //   loadsproduct();
  // }, []);

  const loadcart = async (x) => {
    const re = await fetch("http://localhost:7000/cart/" + x, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    });
    const data = await re.json();
    var csum = 0;
    for (var i = 0; i < data.length; i++) {
      csum = csum + parseInt(data[i].quantity);
    }

    dispatch({ type: "cval", cdata: csum });
  };

  const logout = () => {
    removecookie("mycookie");
    jump("/");
  };

  const loadcategory = async () => {
    const re = await fetch("http://localhost:7000/category", {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    });
    const data = await re.json();
    setcatdata(data);
  };

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
      <header className="header">
        <div className="logo">
          <a href="/">E-Shop</a>
        </div>
        <nav className="menu">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/categories">Categories</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="actions">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => {
              loadsproduct(e.target.value);
            }}
          />
          <button className="search-button">Search</button>
          <a href="/cart" className="icon-link">
            <i className="fas cart-icon fa-shopping-cart">
              <div className="count-cart">{p}</div>
            </i>
          </a>

          <div class="dropdown">
            <a className="icon-link" data-bs-toggle="dropdown">
              <i className="fas fa-user"></i>
            </a>

            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  Change Password
                </a>
              </li>
              <li>
                <Link class="dropdown-item" to="/userorder">
                  {" "}
                  User Order{" "}
                </Link>
              </li>

              {cookie["mycookie"] == null ? (
                <li>
                  <Link class="dropdown-item" to="/login">
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </li>
              ) : (
                <li>
                  <a class="dropdown-item" onClick={logout}>
                    {" "}
                    Logout{" "}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
      {/* <div className="container-fluid d-flex pt-2">
                {
                    catdata.map((x)=>{
                        return(
                            <Link to={"/shop/"+x._id}>
                            <div className="card me-2 rounded-circle text-center" style={{width:"140px",cursor:"pointer"}}>
                               <div style={{textAlign:"center"}}> <img className="card-img-top rounded-circle" style={{width:"50px",height:"50px"}} src={"http://localhost:7000/"+x.catpic} alt="Card image" />
                               </div>
                                <div className="card-body">
                                    <h5 className="card-title">{x.categoryname}</h5>
                                </div>
                            </div>
                            </Link>
                        )
                    })
                }
        </div> */}
       <div className="container-fluid d-flex justify-content-center flex-wrap pt-4">
        {catdata.map((category) => (
          <Link
            key={category._id}
            to={`/shop/${category._id}`}
            className="text-decoration-none category-card"
          >
            <div className="card text-center">
              <div className="image-container">
                <img
                  className="card-img-top"
                  src={`http://localhost:7000/${category.catpic}`}
                  alt={`${category.categoryname} image`}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{category.categoryname}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div> 

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
                    Price: ₹ <del className="text-danger">{x.price}</del>&nbsp;
                    ₹{x.offerprice}
                  </p>
                  <p className="card-text product-description">
                    {x.description}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      addtocart(
                        x._id,
                        x.productname,
                        x.offerprice,
                        x.productpic
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cheader;
