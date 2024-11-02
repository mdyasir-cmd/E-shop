import React, { useState } from "react";

const Email = () => {
  const [a, seta] = useState();
  const [b, setb] = useState();
  const [c, setc] = useState();

  const send = async () => {
    const re = await fetch("http://localhost:7000/email", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        
        receiver: b,
        message: c
      })
    });
    const data = await re.json();
    alert(data.msg);
  };
  return (
    <>
      <div className="main-email-div">
        <div className="email-div">
          <h2 className="text-info text-center">Send OTP</h2>
          <label>From</label>
          <br />
          <input
            onChange={(e) => {
              seta(e.target.value);
            }}
            className="em-ip"
            type="text"
            placeholder="From"
          />
          <br />
          <br />
          <label>To</label>
          <br />
          <input
            onChange={(e) => {
              setb(e.target.value);
            }}
            className="em-ip"
            type="text"
            placeholder="Send to"
          /> <br /><br />
          <label>Message</label>
          <textarea className="em-ip txt-ip" onChange={(e) => {setc(e.target.value)}} >
          
            </textarea>
          
          <br />
          <br />
          <button onClick={send} className="btn em-btn btn-info">
            Send OTP
          </button>
        </div>
      </div>
    </>
  );
};

export default Email;
