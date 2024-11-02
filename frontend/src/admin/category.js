import { useEffect, useState } from "react";
import Sidemenu, { Headers } from "./comcomponent";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Category=()=>{
    const [catname,setcatname]=useState();
    const [catpic,setcatpic]=useState();

    const [catid1,setcatid1]=useState();
    const [catname1,setcatname1]=useState();
    

    const [catdata,setcatdata]=useState([]);

    const[cookies,createcookie,removecookie]=useCookies();
    const jump=useNavigate();

    useEffect(()=>{
        if(cookies["adcookie"]==null){
            jump("/adminlogin");
        }
        loadrecord()
    },[]);
    
    const loadrecord=async()=>{
        const re=await fetch("http://localhost:7000/category",{
            method:"GET",
            headers:{"Content-Type":"Application/json"}
        });
        const data=await re.json();
        setcatdata(data);
    }

    const saverecord=async()=>{
        const fdata=new FormData();
        fdata.append("catname",catname);
        fdata.append("fcatpic",catpic);
        const re=await fetch("http://localhost:7000/category",{
          method:"POST",
          body:fdata  
        });
        const data=await re.json();
        alert(data.msg);
        loadrecord();
    }

    const deleterecord=async(x)=>{
        if(window.confirm("Want to Delete"))
        {
            const re=await fetch("http://localhost:7000/category",{
                method:"DELETE",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({catid:x})
            });
            const data=await re.json();
            alert(data.msg);
            loadrecord();
        }
    }
    const editrecord=async(x)=>{
        const re=await fetch("http://localhost:7000/category/"+x,{
            method:"GET",
            headers:{"Content-Type":"Application/json"}
        });
        const data=await re.json();
        setcatid1(x);
        setcatname1(data[0].categoryname);

    }
    const updaterecord=async()=>{
        const re=await fetch("http://localhost:7000/category",{
            method:"PUT",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({catname:catname1,catid:catid1})
        });
        const data=await re.json();
        alert(data.msg);
        loadrecord();
    }

    return(
        <>
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col-sm-12 col-md-2 text bg-dark text-white">
                        <Sidemenu />
                    </div>
                    <div className="col-sm-12 col-md-10 bg-secondary " style={{padding:"0px"}}>
                        <Headers />
                        <div className="bg bg-secondary p-2 text-end">
                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#myModal">Add New Category</button>
                        </div>
                        <div className="p-2">
                            <table className="table table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Pic</th>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            catdata.map((x)=>{
                                                return(
                                                    <tr>
                                                        <td><img style={{width:"70px"}} src={"http://localhost:7000/"+x.catpic} /></td>
                                                        <td>{x.categoryname}</td>
                                                        <td><i style={{cursor:"pointer"}} onClick={()=>{editrecord(x._id)}} className="fa fa-edit text-warning" data-bs-toggle="modal" data-bs-target="#editModal"></i>&nbsp;&nbsp;<i style={{cursor:"pointer"}} onClick={()=>{deleterecord(x._id)}} className="fa fa-trash text-danger"></i></td>
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
        <h4 className="modal-title">Add New Category</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
            <div className="form-group">
                <label>Category Name</label>
                <input type="text" onChange={(e)=>{setcatname(e.target.value)}} className="form-control" />
            </div>
            <div className="form-group">
                <label>Pic</label>
                <input type="file" onChange={(e)=>{setcatpic(e.target.files[0])}}  className="form-control" />
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
                <label>Category Name</label>
                <input type="text" value={catname1} onChange={(e)=>{setcatname1(e.target.value)}} className="form-control" />
            </div>

      </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button" onClick={updaterecord} className="btn btn-danger">Update</button>
      </div>

    </div>
  </div>
</div>
        </>
    );
}
export default Category