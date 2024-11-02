import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import Cheader from "./comman";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Cart = () => {
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const orderPlacedRef = useRef();

  const [q, setq] = useState([]); // state for cart data for quantity manage
  const [cookie, createcookie, removecookie] = useCookies();
  const [cartdata, setcartdata] = useState([]);
  const jump = useNavigate();
  const dispatch = useDispatch();
  const [tot, settot] = useState(0);
  const [gt, setgt] = useState(0);
  const [gst, setgst] = useState(0);
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [zip, setzip] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("select");

  const t1=useRef();
  const t2=useRef();
  const t3=useRef();
  const t4=useRef();
  const t5=useRef();
  const t6=useRef();

  setTimeout(() => {
    setIsOrderVisible(false);
    if (orderPlacedRef.current) {
      orderPlacedRef.current.classList.remove("order-popup-active");
    }
  }, 1500); // Hide the popup after 1500ms

  useEffect(() => {
    if (cookie["mycookie"] == null) {
      jump("/");
    }
    loadcart(cookie["mycookie"]);
  }, []);

  const loadcart = async (x) => {
    const re = await fetch("http://localhost:7000/cart/" + x, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    });
    const data = await re.json();
    var tot1 = 0;
    for (var i = 0; i < data.length; i++) {
      tot1 = tot1 + data[i].price * data[i].quantity;
    }
    settot(tot1);
    var gst1 = (tot1 * 18) / 100;
    setgst(gst1);
    setgt(tot1 + gst1 + 50);
    setcartdata(data);
  };

  const updatecart = async (x, y, z) => {
    const re = await fetch("http://localhost:7000/cart", {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ cid: x, qty: y, op: z }),
    });
    const data = await re.json();
    loadcart(cookie["mycookie"]);
    dispatch({ type: z });
  };

  // const deleteCart = async (x) => {
  //   if (window.confirm("Want to Delete")) {
  //     const re = await fetch("http://localhost:7000/cart", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "Application/json" },
  //       body: JSON.stringify({ cid: x }),
  //     });
  //     const data = await re.json();
  //     loadcart();
  //     alert(data.msg);
  //   }
  // };
  const deleteCart = async (x) => {
    if (window.confirm("Want to Delete")) {
      const re = await fetch("http://localhost:7000/cart", {
        method: "DELETE",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ cid: x }),
      });
      const data = await re.json();
      loadcart();
      alert(data.msg);
    }
  };
  // Order Placed Popup
  const showOrderPlacedPopup = () => {
    if (orderPlacedRef.current) {
      orderPlacedRef.current.classList.add("order-popup-active");
    }
    setIsOrderVisible(true);

    setTimeout(() => {
      setIsOrderVisible(false);
      if (orderPlacedRef.current) {
        orderPlacedRef.current.classList.remove("order-popup-active");
      }
    }, 2000); // Hide the popup after 1500ms
  };

  const placeorder = async () => {
    var  re=/^\d{10}$/;
    if(name==="" || name[0]===" " || name[name.length-1]===" ")
    {
      setname(name.trim());
      alert("Please enter name");
      t1.current.focus();
      
    }
    else if(mobile==="")
      {
        alert("Please enter mobile");
        t2.current.focus();
      }
      else if(!mobile.match(re))
        {
          alert("Please enter valid mobile");
          t2.current.focus();
        }
      else if(address==="")
        {
          alert("Please enter address");
          t3.current.focus();
        }
        else if(city==="")
          {
            alert("Please enter city");
            t4.current.focus();
          }
          else if(state==="select")
            {
              alert("Please select state");
              t5.current.focus();
            }
            else if(zip==="")
              {
                alert("Please enter zip");
                t6.current.focus();
              }
              else{
                

                const re = await fetch("http://localhost:7000/order", {
                  method: "POST",
                  headers: { "Content-Type": "Application/json" },
                  body: JSON.stringify({
                    uname: cookie["mycookie"],
                    amount: gt,
                    name: name,
                    address: address,
                    mobile: mobile,
                    state: state,
                    city: city,
                    zip: zip,
                  }),
                });
                const data = await re.json();
                // alert(data.msg);
                loadcart(cookie["mycookie"]);
                showOrderPlacedPopup();

              }
    

  };

  return (
    <>
      <Cheader />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <div className="card shadow-sm border-0">
              <table className="table table-bordered table-dark mb-0">
                <thead>
                  <tr>
                    <th scope="col">Pic</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartdata.map((x) => {
                    return (
                      <tr key={x._id}>
                        <td>
                          <img
                            style={{ width: "50px" }}
                            src={"http://localhost:7000/" + x.productpic}
                            alt="Product"
                          />
                        </td>
                        <td>{x.productname}</td>
                        <td>{x.price}</td>
                        <td>{x.quantity}</td>
                        <td>{x.quantity * x.price}</td>
                        <td>
                          <i
                            onClick={() =>
                              updatecart(x._id, x.quantity, "plus")
                            }
                            className="fa-solid fa-plus icon-btn"
                          ></i>
                          &nbsp;
                          <i
                            onClick={() =>
                              updatecart(x._id, x.quantity, "minus")
                            }
                            className="fa-solid fa-minus icon-btn"
                          ></i>
                          &nbsp;&nbsp;
                          <i
                            onClick={() => deleteCart(x._id)}
                            className="fa fa-trash icon-btn"
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card shadow-sm border-0 p-4">
              <h6>Total: {tot}</h6>
              <h6>Delivery Charge: 50</h6>
              <h6>GST: {gst}</h6>
              <h2>Grand-Total: {gt}</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="inputName">Name<span className="text-danger">*</span></label>
                  <input value={name} ref={t1}
                    type="text"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    className="form-control"
                    id="inputName"
                  />
                </div>
                <div className="form-group">
                  <label>Mobile <span className="text-danger">*</span></label>
                  <input ref={t2}
                    type="text"
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                    className="form-control"
                    id="inputMobile"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Address</label>
                  <input ref={t3}
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input ref={t4}
                      type="text"
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                      className="form-control"
                      id="inputCity"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <select ref={t5}
                      id="inputState"
                      className="form-control"
                      onChange={(e) => {
                        setstate(e.target.value);
                      }}
                    >
                      <option value="select">Select State</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Uttrakhand">Uttrakhand</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input ref={t6}
                      type="text"
                      onChange={(e) => {
                        setzip(e.target.value);
                      }}
                      className="form-control"
                      id="inputZip"
                    />
                  </div>
                </div>
                <br />
                <button
                  type="button"
                  onClick={placeorder}
                  className="btn btn-danger w-100"
                >
                  Place Order
                </button>
                &nbsp; &nbsp;
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* order placed popup code  */}
      <div ref={orderPlacedRef} className="order-popup">
        Order Placed
      </div>
    </>
  );
};

export default Cart;
