import { useEffect, useState } from 'react';
import Buttons from "../components/button/Buttons";
import Body from "../components/body/Body";
import Card from "../components/card/Card";
import { getBalance } from "../service/UserService";
import currencyFormatter from 'currency-formatter'
import {  getLoggedInUser } from '../service/AuthService';

function Home() {
    const [balance, setbalance] = useState(0)
    const[data, setData] = useState()

    useEffect(() => {
        const dataUser = getLoggedInUser();
        const value = async () => {
            try {
                const request = await getBalance(dataUser.id);
                const nameCapitalized = dataUser.name.charAt(0).toUpperCase() + dataUser.name.slice(1).toLowerCase();
                setData(nameCapitalized);
                setbalance(request.data);
            } catch (error) {
                console.error("Erro ao buscar o saldo:", error);
                setbalance(0); 
            }
        };
        value();
    }, []);    

    return (
        <Body>
            <Card title="Finance App">
                <h1 className="display-4">Bem vindo, {data} !</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {balance !== undefined ? currencyFormatter.format(balance, { locale: 'pt-BR' }) : 'Carregando...'}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead" style={{ display: 'flex', gap: '20px' }}>
                    <Buttons classe="success btn-lg" desc={<i className="pi pi-book"> Meus Lançamentos</i>} link linkTo='/my-launch' />
                    <Buttons classe="danger btn-lg" desc={<i className="pi pi-money-bill"> Cadastrar Lançamento</i>} link linkTo={'/register-launch'} />
                </p>
            </Card>
        </Body>
    );
}

export default Home;