import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"


const GuestLayout = () => {
    const{token} = useStateContext();

    if(token){
        return <Navigate to='/' />
    }



  return (
    //Outlet will be the place where child routes will be rendered
    <div>
        <Outlet />
    </div>
  )
}

export default GuestLayout
