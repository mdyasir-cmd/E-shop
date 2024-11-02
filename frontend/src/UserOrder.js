import React, { useEffect, useState } from "react";
// import Sidemenu, { Headers } from "./comcomponent";
import Sidemenu,{Headers} from "./admin/comcomponent";
import { useCookies } from "react-cookie";
import Cheader from "./comman";

const UserOrder = () => {
  const [orderdata, setorderdata] = useState([]);
  const [cookie,createcookie,removecookie]=useCookies();

  const loadorder = async () => {
    const re = await fetch("http://localhost:7000/order", {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body:JSON.stringify({uname:cookie["mycookie"]})
    });
    const data = await re.json();
    setorderdata(data);
    // alert(orderdata[0].name);
  };

  const [odata, setodata] = useState([]);
  const loaddetails = async (x) => {
    const re = await fetch("http://localhost:7000/orderdetails", {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ ordno: x }),
    });
    const data = await re.json();

    setodata(data);
  };

  useEffect(() => {
    loadorder();
  }, []);
  return (
    <>
    <Cheader />
      <div className="container-fluid bg-light">
        <div className="row">
          
          <div className="col-sm-12 col-md-12 p-2" style={{ padding: "0px" }}>
          
          
            <div className="container-fluid">
              

              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <table className="table table-hover mt-2">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>User Name</th>
                          <th>Email</th>
                          <th>Order Date</th>
                          <th>Mobile</th>
                          <th>Amount</th>
                          <th>Address</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderdata.map((x, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{x.name}</td>
                              <td>{x.username}</td>
                              <td>{x.orderdate}</td>
                              <td>{x.mobile}</td>
                              <td>₹{x.amount}</td>
                              <td>{x.address}</td>
                              <td>{x.status}</td>
                              <td>
                                <button
                                  className="btn btn-info"
                                  onClick={() => {
                                    loaddetails(x._id);
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                User Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Product Pic</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {odata.map((x) => {
                    return (
                      <tr>
                        <td>
                          <img
                            style={{ width: "70px" }}
                            src={"http://localhost:7000/" + x.productpic}
                          />
                        </td>
                        <td>{x.productname}</td>
                        <td>{x.price}</td>
                        <td>{x.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrder;
