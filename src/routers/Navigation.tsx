import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router-dom"
import { Home } from '../pages/Home';
 


export const Navigation = () => {
  return (
    <BrowserRouter>
        <div className="flex flex-col    justify-center content-center">
            <nav className="flex flex-col justify-center content-center">
                <div className="flex  flex-row justify-center content-center">
                    <img className=" w-60"  src="../logo.png" alt="logo bemmbo" />
                </div>
                <ul className="flex flex-row justify-center content-center">
                    <li>
                        <NavLink className="font-bold text-stone-500" to ="/home"> Home </NavLink>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="home" element ={<Home/>}/>
                <Route path="/*" element = {<Navigate to={"/home"} replace />}/>
            </Routes>
        </div>
    </BrowserRouter>
  )
}
