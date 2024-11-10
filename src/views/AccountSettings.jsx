import { useEffect, useState } from 'react';
import Body from "../components/body/Body";
import Card from "../components/card/Card";
import {  getLoggedInUser } from '../service/AuthService';

function AccountSettings() {
    const[data, setData] = useState()

    useEffect(() => {
        const dataUser = getLoggedInUser()
        const value = async () => {
            setData(dataUser.name)
        }
        value()
    }, [])

    return (
        <Body>
            <Card title="Configurações do seu perfil:">
                <h1 className="display-4">Bem vindo {data}!</h1>
            </Card>
        </Body>
    );
}

export default AccountSettings;