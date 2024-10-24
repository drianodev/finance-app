import { useEffect, useState } from "react";
import Body from "../components/body/Body";
import Card from "../components/card/Card";
import FormGroup from "../components/form/FormGroup";
import Buttons from "../components/button/Buttons";
import { saveUser } from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { errorMessage, messageSuccess } from "../components/toastr/Toastr";
import { getItem } from "../service/LocalstorageService";

function UserRegistration() {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [formError, setFormError] = useState({});
    const navigator = useNavigate();

    useEffect(() => {
        Object.values(formError).forEach(error => errorMessage(error));
    }, [formError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const validField = (field) => field.trim() === '';

    const validForm = () => {
        const errors = {};
        const { name, email, password, confirmPassword } = userData;

        if (validField(name)) errors.name = 'Digite seu nome';
        if (validField(email)) {
            errors.email = 'Digite um e-mail válido';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) errors.email = 'Formato de e-mail inválido';
        }

        if (validField(password)) {
            errors.password = 'Digite a sua senha';
        } else if (password !== confirmPassword) {
            errors.password = 'As senhas não coincidem';
        }

        setFormError(errors);
        if (Object.keys(errors).length === 0) register();
    };

    const register = async () => {
        try {
            const response = await saveUser(userData);
            if (response.status === 201) {
                messageSuccess('Cadastro realizado com sucesso, faça login para acessar o sistema.');
                navigator('/');
            }
        } catch (error) {
            errorMessage(error.response?.data || 'Erro ao registrar');
            setUserData({ name: '', email: '', password: '', confirmPassword: '' });
        }
    };

    return (
        <Body>
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <FormGroup
                                    value={userData.name}
                                    change={handleChange}
                                    label="Nome: *"
                                    id="inputName"
                                    placeholder="Digite o seu nome"
                                    type="text"
                                    name="name"
                                    required
                                />
                                <FormGroup
                                    value={userData.email}
                                    change={handleChange}
                                    label="Email: *"
                                    id="inputEmail"
                                    placeholder="Digite o seu email"
                                    type="email"
                                    name="email"
                                    required
                                />
                                <FormGroup
                                    value={userData.password}
                                    change={handleChange}
                                    label="Senha: *"
                                    id="inputPassword"
                                    placeholder="Digite a sua senha"
                                    type="password"
                                    name="password"
                                    required
                                />
                                <FormGroup
                                    value={userData.confirmPassword}
                                    change={handleChange}
                                    label="Confirme sua senha: *"
                                    id="inputConfirmPassword"
                                    placeholder="Confirme a sua senha"
                                    type="password"
                                    name="confirmPassword"
                                    required
                                />
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Buttons classe="success" desc="Salvar" onClick={validForm} />
                                    <Buttons classe="danger" desc="Cancelar" link linkTo={getItem("_USER_LOGGED") ? "/home" : "/"} />
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
        </Body>
    );
}

export default UserRegistration;