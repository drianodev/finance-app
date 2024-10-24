import NavBarItem from "./NavBarItem";
import { getLoggedInUser } from "../../service/AuthService";
import { useContext } from "react";
import DataContext from "../../config/context/DataContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, endSession } = useContext(DataContext)

  const userAuthenticated = () => {
    const userLog = getLoggedInUser()
    if (user || userLog) {
      return userLog
    }
  }

  const logout = () => {
    endSession()
  }

  const navbar = [
    {
      description: 'Home',
      linkTo: '/home',
      onClick: '',
      icon: '',
      render: userAuthenticated()
    },
    {
      description: 'Login',
      linkTo: '/',
      onClick: '',
      icon: '',
      render: !userAuthenticated()
    },
    {
      description: 'Cadastrar usuário',
      linkTo: '/register-user',
      onClick: '',
      icon: 'user-plus',
      render: !userAuthenticated()
    },
    {
      description: 'Meus Lançamentos',
      linkTo: '/my-launch',
      onClick: '',
      icon: '',
      render: userAuthenticated()
    },
    {
      description: 'Cadastrar Lancamentos',
      linkTo: '/register-launch',
      onClick: '',
      icon: '',
      render: userAuthenticated()
    },
    {
      description: 'Configurações Conta',
      linkTo: '/account-settings', 
      onClick: '', 
      icon: '', 
      render: userAuthenticated()
    },
    {
      description: 'Sair',
      linkTo: '/',
      onClick: logout,
      icon: 'sign-out',
      render: userAuthenticated()
    },
  ]

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark p-2"  >
      <div className="container-fluid" >
        <Link to="/home" className="navbar-brand ps-4" style={{ fontSize: '30px', fontWeight: 'bolder' }}>Finance App</Link>
        <button className="navbar-toggler" type="button" 
          data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end " id="navbarResponsive">
          <ul className="navbar-nav justify-content-end pe-4" >
            {navbar.map((item, index) => (
              item.render ?
                <NavBarItem key={index} description={item.description} linkTo={item.linkTo} onClick={item.onClick} render={item.render} icon={item.icon} />
                : null))}
            {/*  <NavBarItem description="Home" linkTo='/home' />
            <NavBarItem description="Usuários" linkTo='/register-user' />
            <NavBarItem description="Lançamentos" linkTo='/my-launch' />
            <NavBarItem description="Sair" linkTo='/' onClick={e => { logout() }} /> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;