import { Navigate } from "react-router-dom";
import { isUsuarioAutenticado } from "../service/AuthService";

// eslint-disable-next-line react/prop-types
function RoutePrivate({ children, isPrivate }) {
    const userLogado = isUsuarioAutenticado()
    
    if (isPrivate && !userLogado) {
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    );
}

export default RoutePrivate;