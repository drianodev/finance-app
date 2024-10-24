import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function NavBarItem({linkTo, description = 'descrição do link', onClick, icon=''}) {
    return (
        <li className="nav-item">
            <Link onClick={onClick} className="nav-link" to={linkTo}>
                <i className={`pi pi-${icon}`}></i> {description}
            </Link>
        </li>
    );
}

export default NavBarItem;