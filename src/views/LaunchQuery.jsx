import { useContext, useEffect, useState } from "react";
import Buttons from "../components/button/Buttons";
import Body from "../components/body/Body";
import Card from "../components/card/Card";
import FormGroup from "../components/form/FormGroup";
import LaunchList from "../components/launch/LaunchList";
import SelectMenu from "../components/menu/SelectMenu";
import { getLaunch, updateStatus, deleteLaunch } from "../service/LaunchService";
import { getItem } from "../service/LocalstorageService";
import { listMonth, listType } from "../utils/Lists";
import { messageAlert, errorMessage, messageSuccess } from "../components/toastr/Toastr";
import { ConfirmDialog } from 'primereact/confirmdialog';
import DataContext from "../config/context/DataContext";
import { useNavigate } from "react-router-dom";
import { USER_LOGGED } from "../service/AuthService";

function LaunchQuery() {
    const [filter, setFilter] = useState({ year: '', month: '', type: '', description: '' })
    const [launch, setLaunch] = useState([])
    const [dialogData, setDialogData] = useState({ show: false, data: {} })
    const { setLaunchId } = useContext(DataContext)
    const navigator = useNavigate()

    const currentYear = new Date().getFullYear();
    const yearsList = [{ value: '', label: 'Selecione...' }, ...Array.from({ length: 5 }, (_, i) => ({ value: currentYear - i, label: currentYear - i }))];


    useEffect(() => {
        const data = async () => {
            const userLogged = getItem('_USER_LOGGED')

            const launchFilter = { user: userLogged.id }
            try {
                const data = await getLaunch(launchFilter)
                setLaunch(data.data)
            } catch (error) {
                if (error.response) {
                    errorMessage(error.response.data)
                }
            }
        }
        data()
    }, [])

    useEffect(() => {
    }, [dialogData])

    const search = async () => {
        const userLogged = getItem(USER_LOGGED)
        const launchFilter = {
            year: filter.year,
            month: filter.month,
            type: filter.type,
            user: userLogged.id,
            description: filter.description
        }
        try {
            const data = await getLaunch(launchFilter)
            if (data.data.length < 1) {
                messageAlert("Não foi encontrado lançamento para os parametros")
                setLaunch([])
            } else {
                setLaunch(data.data)
            }
        } catch (error) {
            if (error.response) {
                errorMessage(error.response.data)
            }
        }

    }

    const handleUpdateStatus = async (idLaunch, status) => {
        try {
            const response = await updateStatus(idLaunch, status)
            if (response.status === 200) {
                messageSuccess("Lancamento alterado com sucesso")
                search()
            }
        } catch (error) {
            errorMessage(error.response.data)
        }
    }

    const handleEditChange = (idLaunch) => {
        setLaunchId(idLaunch)
        navigator("/register-launch")
    }

    const showDialog = (launch) => {
        setDialogData({ show: true, data: launch })
    }

    const handleDeleteChange = async () => {
        try {
            const deletar = await deleteLaunch(dialogData.data.idLaunch)
            
            if (deletar.status === 204) {
                const newList = launch.filter(item => item.idLaunch !== dialogData.data.idLaunch)
                setLaunch(newList)
                messageSuccess("Lancamento deletado com sucesso")
            }
        } catch (error) {
            errorMessage(error.response.data)
        }
    }

    const handleRejectChange = () => {
        setDialogData({ show: false, data: {} })
    }

    const handleBackToMain = () => {
        navigator("/home"); 
    };

    return (
        <>
            <Body>
                <Card title="Consulta Lançamento">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <fieldset style={{ display: 'flex', flexDirection: "column", gap: '20px' }}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listMonth}
                                                    label="Mês: *"
                                                    id="month"
                                                    value={filter.month}
                                                    change={e => setFilter({ ...filter, month: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={yearsList}
                                                    label="Ano: *"
                                                    id="year"
                                                    value={filter.year}
                                                    change={e => setFilter({ ...filter, year: e.target.value })}
                                                    name="year" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <FormGroup
                                                    value={filter.description}
                                                    change={e => setFilter({ ...filter, description: e.target.value })}
                                                    type="text"
                                                    className="form-control"
                                                    id="inputDescricao"
                                                    label="Descrição: "
                                                    placeholder="Digite a Descrição"
                                                    name="inputDescricao" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="bs-component">
                                                <SelectMenu
                                                    lista={listType}
                                                    label="Tipo de Lançamento:"
                                                    id="tipoLancamento"
                                                    value={filter.type}
                                                    change={e => setFilter({ ...filter, type: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Buttons desc={<i className="pi pi-search"> Pesquisar</i>} classe="success" onClick={search} />
                                        <Buttons desc={<i className="pi pi-plus"> Cadastrar</i>} classe="danger" link linkTo="/register-launch" />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LaunchList
                                    caption="# Lista de Lançamentos"
                                    launch={launch}
                                    updateStatusEffective={handleUpdateStatus}
                                    updateStatusCancelled={handleUpdateStatus}
                                    edit={handleEditChange}
                                    del={showDialog} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <ConfirmDialog visible={dialogData.show}
                            onHide={() => setDialogData({ show: false, data: {} })}
                            message="Tem certeza que deseja deletar?"
                            header="Confirmation"
                            icon="pi pi-exclamation-triangle"
                            accept={handleDeleteChange}
                            reject={handleRejectChange}
                        />
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Buttons desc="Voltar à Tela Principal" classe="primary" onClick={handleBackToMain} />
                    </div>
                </Card>
            </Body>
        </>
    );
}

export default LaunchQuery;