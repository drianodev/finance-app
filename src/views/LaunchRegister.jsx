import { useContext, useEffect, useState } from "react";
import Buttons from "../components/button/Buttons";
import Body from "../components/body/Body";
import Card from "../components/card/Card";
import FormGroup from "../components/form/FormGroup";
import SelectMenu from "../components/menu/SelectMenu";
import { listMonth, listType } from "../utils/Lists";
import { getItem } from "../service/LocalstorageService";
import { update, getById, save } from "../service/LaunchService";
import { errorMessage, messageSuccess } from "../components/toastr/Toastr";
import { useNavigate } from "react-router-dom";
import dataContext from "../config/context/DataContext";

function LaunchRegister() {
    const [dateForm, setDateForm] = useState({ 
        id: null, 
        description: '', 
        month: '', 
        year: new Date().getFullYear(), 
        value: '', 
        type: '', 
        status: '', 
        user: null 
    })
    const { launchId, setLaunchId } = useContext(dataContext)
    const navigator = useNavigate()

    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: 5 }, (_, i) => currentYear - i); 

    useEffect(() => {
        const editItem = async () => {
            if (launchId) {
                const data = await getById(launchId)
                setDateForm({ ...data.data })
            }
        }
        editItem()
    }, [])

    const handleChangeState = ({ name, value }) => {
        setDateForm(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const updateLancamento = async (event) => {
        event.preventDefault();
        const { description, month, year, value, type, user, id, status } = dateForm;
    
        if (!description || !month || !year || !value || !type) {
            errorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }
    
        const launch = { description, month, year, value, type, user, id, status };
        try {
            const data = await update(launch);
            if (data.status === 200) {
                messageSuccess("Lançamento atualizado com sucesso");
                setLaunchId('');
                return navigator("/my-launch");
            }
        } catch (error) {
            errorMessage(error.response.data);
        }
    };
    
    const saveLaunch = async (event) => {
        event.preventDefault();
        const userLogado = getItem("_USER_LOGGED");
        const { description, month, year, value, type } = dateForm;
    
        if (!description || !month || !year || !value || !type) {
            errorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }
    
        const launch = { description, month, year, value, type, user: userLogado.id };
        try {
            const salvo = await save(launch);
            if (salvo.status === 201) {
                messageSuccess("Lançamento cadastrado com sucesso");
                setDateForm({ id: null, description: '', month: '', year: '', value: '', type: '', status: '' });
                navigator("/my-launch");
            }
        } catch (error) {
            errorMessage(error.response.data);
        }
    };    

    const cancel = () => {
        setDateForm({ id: null, description: '', month: '', year: '', value: '', type: '', status: '' })
        setLaunchId('')
    }

    return (
        <>
            <Body>
                <Card title={launchId ? "Atualização de Lancamento" : "Cadastro de Lancamento"}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="bs-component">
                                                <FormGroup
                                                    label="Descrição: *"
                                                    id="inputDescricao"
                                                    placeholder="Digite a Descrição"
                                                    type="text"
                                                    name="description"
                                                    value={dateForm.description}
                                                    change={e => { handleChangeState(e.target) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listMonth}
                                                    label="Mês: *"
                                                    id="month"
                                                    value={dateForm.month}
                                                    change={e => { handleChangeState(e.target) }}
                                                    name="month" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={yearsList.map(year => ({ value: year, label: year }))}
                                                    label="Ano: *"
                                                    id="year"
                                                    value={dateForm.year}
                                                    change={e => { handleChangeState(e.target) }}
                                                    name="year" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="bs-component">
                                                <FormGroup
                                                    label="Valor: *"
                                                    id="inputValor"
                                                    placeholder="Digite o value"
                                                    type="number"
                                                    name="value"
                                                    inputMode="numeric"
                                                    change={e => { handleChangeState(e.target) }}
                                                    value={dateForm.value}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listType}
                                                    label="Tipo: *"
                                                    value={dateForm.type}
                                                    change={e => { handleChangeState(e.target) }}
                                                    name="type"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bs-component">
                                                <FormGroup label="Status:"
                                                    value={dateForm.status}
                                                    disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Buttons classe="success" 
                                            desc={launchId ? <i className="pi pi-refresh"> Atualizar</i> : <i className="pi pi-save"> Salvar</i>}
                                            onClick={(event) => launchId ? updateLancamento(event) : saveLaunch(event)} />
                                        <Buttons classe="danger" desc={<i className="pi pi-times"> Cancelar</i>} link linkTo="/home" onClick={cancel} />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </Body>
        </>
    );
}

export default LaunchRegister;