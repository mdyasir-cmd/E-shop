    import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"

    const Sidemenu=()=>{
        return(<>
        <h3 className="ps-2 pt-2"><Link to ="/Dashboard">Dashboard</Link></h3>
                            <hr/>
                            <ul>
                                <li><Link to="/category">Category</Link></li>
                                <li><Link to="/subcategory">Subcategory</Link></li>
                                <li><Link to="/product">Product</Link></li>
                                <li>View Order</li>

                            </ul>
        </>)
    }

    const Headers=()=>{
        const[cookie,createcookie,removecookie]=useCookies();
        const jump=useNavigate()
        const logout=()=>{
            removecookie("adcookie");
            jump("/adminlogin");
        }
        return(
            <>
                <div className="bg-dark text-light text-end p-2 " style={{cursor:"pointer"}} onClick={logout}>Logout</div>
            </>
        )
    }
    export default Sidemenu
    export {Headers}