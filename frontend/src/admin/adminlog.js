import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Adminlog= () => {
  const [a, seta] = useState();
  const [b, setb] = useState();
  const [cookie, createcookie, removecookie] = useCookies();
  const jump = useNavigate();

  const login = async() => {
        const re=await fetch("http://localhost:7000/admin",{
            method:"PATCH",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({name:a,password:b})
        });
        const data=await re.json();
        if(data.msg==="Valid Login")
        {
            createcookie("adcookie",a);
            jump("/category");
        }
        else{
            alert(data.msg);
        }
  }

  return (
    <>
      {/* <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-4">&nbsp;</div>
          <div className="col-4">
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={(e) => seta(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => setb(e.target.value)}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button onClick={login} className="btn btn-danger">
                Login
              </button>
              <br />
              <Link to="/signup">New Account</Link>
            </div>
          </div>
          <div className="col-4">&nbsp;</div>
        </div>
      </div> */}
       <div className="login-container">
      <div className="login-box">
        <h2 className="text-center mb-4">Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => seta(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setb(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group"><br/>
          <button onClick={login} className="btn btn-primary btn-block">
            Login
          </button>
        </div>
       
      </div>
    </div>
    </>
  );
};

export default Adminlog;
