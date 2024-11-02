import React, { useEffect, useState } from "react";
import Cheader from "./comman";

const Searchproduct = () => {
  const [searchstate, setsearchstate] = useState();
  const [productdata, setproductdata] = useState([]);

  const loadsproduct = async () => {
    const re = await fetch("http://localhost:7000/sproduct", {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ regexp: searchstate }),
    });
  };
  useEffect(() => {
    loadsproduct();
  }, []);

  return (
    <>
      <Cheader />
      {/* <div className="col-10">
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
      </div> */}
    </>
  );
};

export default Searchproduct;
