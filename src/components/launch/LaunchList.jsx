import currencyFormatter from 'currency-formatter'
import Buttons from '../button/Buttons';

// eslint-disable-next-line react/prop-types
function LaunchList({ caption, launch, edit, del, updateStatusEffective, updateStatusCancelled }) {

  // Função para traduzir o tipo de lançamento
  const translateType = (tipo) => {
    switch (tipo) {
        case 'INCOME':
            return 'Entrada';
        case 'EXPENSE':
            return 'Saída';
        default:
            return tipo;
    }
  }

  // Função para traduzir o status do lançamento
  const translateStatus = (status) => {
    switch (status) {
        case 'PENDING':
            return 'Pendente';
        case 'EFFECTIVE':
            return 'Efetivado';
        case 'CANCELLED':
            return 'Cancelado';
        default:
            return status;
    }
  }

  // eslint-disable-next-line react/prop-types
  const launches = launch.map(item => {
    return (
      <tr key={item.idLaunch}>
        <td>{item.description}</td>
        <td>{currencyFormatter.format(item.value, { locale: 'pt-BR' })}</td>
        <td>{translateType(item.type)}</td> 
        <td>{item.month.toString().padStart(2, '0')}/{item.year}</td>
        <td>{translateStatus(item.status)}</td> 
        <td style={{ display: 'flex', gap: '10px' }}>
          <Buttons
            desc={<i className="pi pi-check"></i>}
            classe="success"
            disabled={item.status !== "PENDING"}
            onClick={() => updateStatusEffective(item.idLaunch, "EFFECTIVE")} />
          <Buttons
            desc={<i className="pi pi-times "></i>}
            classe="warning" disabled={item.status !== "PENDING"}
            onClick={() => updateStatusCancelled(item.idLaunch, "CANCELLED")} />
          <Buttons
            desc={<i className="pi pi-pencil "></i>}
            classe="primary"
            onClick={() => edit(item.idLaunch)} />
          <Buttons
            desc={<i className="pi pi-trash "></i>}
            classe="danger"
            onClick={() => del(item)} />
        </td>
      </tr>
    );
  });  

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped caption-top table-sm table-responsive">
        <caption>{caption}</caption>
        <thead className="table-light">
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Tipo</th>
            <th scope="col">Data</th>
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {launches}
        </tbody>
      </table>
    </div>
  );
}

export default LaunchList;