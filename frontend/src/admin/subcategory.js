import { useEffect, useState } from "react"
import Sidemenu,{Headers} from "./comcomponent"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Subcategory=()=>{
    const [subcatname,setsubcatname]=useState();
    const [subcatpic,setsubcatpic]=useState();
    const [catid,setcatid]=useState();

    const [subcatname1,setsubcatname1]=useState();
    const [subcatid1,setsubcatid1]=useState();

    const [catdata,setcatdata]=useState([]);
    const [subcatdata,setsubcatdata]=useState([]);
    
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
    
    const saverecord=async()=>{
        var fdata=new FormData();
        fdata.append("catid",catid);
        fdata.append("subcatname",subcatname);
        fdata.append("subcatpic",subcatpic);
        const re=await fetch("http://localhost:7000/subcategory",{
            method:"POST",
            body:fdata
        });
        const data=await re.json();
        alert(data.msg);
    }
    const loadrecord=async(y)=>{
        setcatid(y);
        const re=await fetch("http://localhost:7000/subcategory",{
            method:"PATCH",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({catid:y})
        });
        const data=await re.json();
        setsubcatdata(data);

    }
    
    const editrecord=async(x)=>{
        const re=await fetch("http://localhost:7000/subcategory/"+x,{
            method:"GET",
            headers:{"Content-type":"Application/json"}
        });
        const data=await re.json();
        setsubcatname1(data[0].subcategoryname);
        setsubcatid1(x);
    }
    const deleterecord=async(x)=>{
        if(window.confirm("Want to delete")){
            const re=await fetch("http://localhost:7000/subcategory",{
                method:"DELETE",
                headers:{"Content-type":"Application/json"},
                body:JSON.stringify({subcatid:x})
            });
            const data=await re.json();
            alert(data.msg);
            loadrecord(catid);
        }

    }
    const updaterecord=async()=>{
        const re=await fetch("http://localhost:7000/subcategory",{
            method:"PUT",
            headers:{"Content-type":"Application/json"},
            body:JSON.stringify({subcatid:subcatid1,catid:catid,subcatname:subcatname1})
        });
        const data=await re.json();
        alert(data.msg);
        loadrecord(catid);
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
                                            <label>Select Category</label>
                                            <select value={catid}  className="form-control" onChange={(e)=>{loadrecord(e.target.value)}}>
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
                                    <div className="col-9">
                                        <div className="bg bg-secondary p-2 text-end">
                                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#myModal">Add New Category</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="p-2">
                            <table className="table table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Pic</th>
                                        <th>Subcategory Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            subcatdata.map((x)=>{
                                                return(
                                                    <tr>
                                                        <td><img style={{width:"70px"}} src={"http://localhost:7000/"+x.subcategorypic} /></td>
                                                        <td>{x.subcategoryname}</td>
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
        <h4 className="modal-title">Add New SubCategory</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
            <div className="form-group">
                <label>Select Category</label>
                <select value={catid} className="form-control" onChange={(e)=>{loadrecord(e.target.value)}}>
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
            <div className="form-group">
                <label>Sub Category Name</label>
                <input type="text" onChange={(e)=>{setsubcatname(e.target.value)}} className="form-control" />
            </div>
            <div className="form-group">
                <label>Pic</label>
                <input type="file" onChange={(e)=>{setsubcatpic(e.target.files[0])}}  className="form-control" />
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
                <select value={catid} className="form-control" onChange={(e)=>{loadrecord(e.target.value)}}>
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
            <div className="form-group">
                <label>Sub Category Name</label>
                <input type="text" value={subcatname1}  onChange={(e)=>{setsubcatname1(e.target.value)}} className="form-control" />
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
    )
}
export default Subcategory