import Buttons from "../components/button/Buttons";
import Body from "../components/body/Body";
import Card from "../components/card/Card";
import FormGroup from "../components/form/FormGroup";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../service/UserService";
import { errorMessage } from "../components/toastr/Toastr";
import DataContext from "../config/context/DataContext";

function Login() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login: loginUser } = useContext(DataContext);

  const entrar = async () => {
    const { email, password } = userData;

    try {
      const response = await authenticate({ email, password });
      if (response.status === 200) {
        loginUser(response.data);
        navigate('/home');
      }
    } catch (error) {
      const errorMsg = error.response?.data || 'Erro ao autenticar';
      errorMessage(errorMsg);
      setUserData({ email: '', password: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Body width="6">
      <Card title="Login">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>
                <FormGroup
                  value={userData.email}
                  change={handleInputChange}
                  label="Email: *"
                  id="exampleInputEmail1"
                  placeholder="Digite o seu email"
                  type="email"
                  name="email"
                  required
                />
                <FormGroup
                  value={userData.password}
                  change={handleInputChange}
                  label="Senha: *"
                  id="exampleInputPassword1"
                  placeholder="Digite a sua senha"
                  type="password"
                  name="password"  
                  required
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Buttons desc={<i className="pi pi-sign-in"> Entrar</i>} classe="success" onClick={entrar} />
                  <Buttons desc={<i className="pi pi-user-plus"> Cadastrar</i>} classe="danger" link linkTo="/register-user" />
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Card>
    </Body>
  );
}

export default Login;
