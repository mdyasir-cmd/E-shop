import { useEffect, useState } from "react"
import Sidemenu,{Headers} from "./comcomponent"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Product=()=>{



    const [subcatid,setsubcatid]=useState();
    const [productname,setproductname]=useState();
    const [price,setprice]=useState();
    const [offerprice,setofferprice]=useState();
    const [description,setdescription]=useState();
    const [pic,setpic]=useState();
    const[productid,setproductid]=useState();

    const [catdata,setcatdata]=useState([]);
    const [subcatdata,setsubcatdata]=useState([]);
    const [productdata,setproductdata]=useState([]);
    const [cookies,createcookie,removecookie]=useCookies();

    const jump=useNavigate();
    
    useEffect(()=>{
        if(cookies["adcookie"]==null){
            jump("/adminlogin");
        }
        loadcategory();
    },[]);
    
    const loadcategory=async()=>{
        const re=await fetch("http://localhost:7000/category",{
            method:"GET",
            headers:{"Content-Type":"Application/json"}
        });
        const data=await re.json();
        setcatdata(data);
    }

    const loadsubcategory=async(x)=>{
        const re=await fetch("http://localhost:7000/subcategory",{
            method:"PATCH",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({catid:x})
        });
        const data=await re.json();
     
        setsubcatdata(data);
    }

    const saverecord=async()=>{
        var fdata=new FormData();
        fdata.append("subcatid",subcatid);
        fdata.append("pname",productname);
        fdata.append("price",price);
        fdata.append("offerprice",offerprice);
        fdata.append("description",description);
        fdata.append("productpic",pic);
        const re=await fetch("http://localhost:7000/product",{
            method:"POST",
            body:fdata
        });
        const data=await re.json();
        alert(data.msg);
    }

    const loadproduct=async(x)=>{
        const re=await fetch("http://localhost:7000/product",{
            method:"PATCH",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({subcatid:x})
        });
        const data=await re.json();
        setproductdata(data);
    }

    const deleterecord=async(x)=>{
        if(window.confirm("Want to delete")){
            const re=await fetch("http://localhost:7000/product",{
                method:"DELETE",
                headers:{"Content-type":"Application/json"},
                body:JSON.stringify({productid:x})
            });
            const data=await re.json();
            alert(data.msg);
            loadproduct(productid);
        }

    }
    return (
        <>
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col-sm-12 col-md-2 text bg-dark text-white">
                        <Sidemenu />
                    </div>
                    <div className="col-sm-12 col-md-10 bg-secondary " style={{padding:"0px"}}>
                        <Headers />
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <select className="form-control" onChange={(e)=>{loadsubcategory(e.target.value)}}>
                                                <option value="select">Select Category</option>
                                                {
                                                    catdata.map((x)=>{
                                                        return(
                                                            <option value={x._id}>{x.categoryname}</option>
                                                        )
                                                    })
                                                }
                                            </select>   
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <label>Sub Category</label>
                                            <select className="form-control" onChange={(e)=>{loadproduct(e.target.value)}}>
                                                <option value="select">Select Subcategory</option>
                                                {
                                                    subcatdata.map((x)=>{
                                                        return(
                                                            <option value={x._id}>{x.subcategoryname}</option>
                                                        )
                                                    })
                                                }
                                            </select>   
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="bg bg-secondary p-2 text-end">
                                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#myModal">Add New Product</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="p-2">
                            <table className="table table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Pic</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Offer Price</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                       {
                                        productdata.map((x)=>{
                                            return(
                                                <tr>
                                                    <td><img style={{width:"70px"}} src={"http://localhost:7000/"+x.productpic} /></td>
                                                    <td>{x.productname}</td>
                                                    <td>{x.price}</td>
                                                    <td>{x.offerprice}</td>
                                                    <td>{x.description}</td>
                                                    <td><i className="fa fa-edit"></i>&nbsp;&nbsp;<i className="fa fa-trash" onClick={()=>{deleterecord(x._id)}}></i></td>
                                                </tr>
                                            )
                                        })
                                       }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title">Add New SubCategory</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
            <div className="form-group">
                <label>Category</label>
                <select className="form-control" onChange={(e)=>{loadsubcategory(e.target.value)}}>
                    <option value="select">Select</option>
                    {
                        catdata.map((x)=>{
                            return(
                                <option value={x._id}>{x.categoryname}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Subcategory</label>
                <select className="form-control" onChange={(e)=>{setsubcatid(e.target.value)}}>
                    <option value="select" >-Select-</option>
                    {
                        subcatdata.map((x)=>{
                            return(
                                <option value={x._id}>{x.subcategoryname}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Product Name</label>
                <input type="text" onChange={(e)=>{setproductname(e.target.value)}} className="form-control" />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="text" onChange={(e)=>{setprice(e.target.value)}} className="form-control" />
            </div>
            <div className="form-group">
                <label>Offer Price</label>
                <input type="text" onChange={(e)=>{setofferprice(e.target.value)}} className="form-control" />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" onChange={(e)=>{setdescription(e.target.value)}} className="form-control" />
            </div>
            <div className="form-group">
                <label>Pic</label>
                <input type="file" onChange={(e)=>{setpic(e.target.files[0])}}  className="form-control" />
            </div>

      </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button" onClick={saverecord} className="btn btn-danger">Save</button>
      </div>

    </div>
  </div>
</div>



<div className="modal" id="editModal">
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title">Update Category</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
            
            
            <div className="form-group">
                <label>Sub Category Name</label>
                <input type="text" className="form-control" />
            </div>

      </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button"  className="btn btn-danger">Update</button>
      </div>

    </div>
  </div>
</div>
        </>
    )
}
export default Product