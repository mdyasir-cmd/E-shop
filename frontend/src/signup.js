import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')

  const saverecord=async()=>{
    const re=await fetch("http://localhost:7000/signup",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({name:name,email:email,password:password})
    }) 
    const data=await re.json();
    alert(data.msg);
  }


  return (
    <>
    
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="text-center mb-4">Create Account</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={saverecord}>
            Create Account
          </button>
        </div>
        <div className="text-center mt-3">
          <Link to="/login" className="back-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup
