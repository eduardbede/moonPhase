
import { Link } from "react-router-dom"
function Nav(){
    return(
        <ul className="no_highlights flex justify-center items-center md:gap-44 gap-20 text-3xl h-14 text-white">
            <li className="active:text-green-600"><Link to='/'>Today</Link></li>
            <li className="active:text-green-600"><Link to='/calendar'> Calendar</Link></li>
        </ul>
    )
}

export default Nav