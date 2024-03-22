import  { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function SalepersonList() {
    const [salesperson, setSalesperson] = useState ([])
    const nav = useNavigate()

    const getData = async () => {
        const response = await fetch ('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const { salesperson } = await response.json();
            setSalesperson(salesperson);
        }else {
            console.error('An error occured fetching the data')
        }
    }


    useEffect(()=> {
      getData()
    }, []);

    async function deleteSalesperson() {
      await fetch(`http://localhost:8080/api/salespeople/`, { method: 'DELETE' });
      alert('Delete successful');
      nav("/salespeople")
    }

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Salespeople</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee Id</th>
            </tr>
          </thead>
          <tbody>
            {salesperson.map(tech => {
              return (
                <tr key={tech.id}>
                  <td>{ tech.first_name }</td>
                  <td>{ tech.last_name }</td>
                  <td>{ tech.employee_id }</td>
                  <td>
                    <button onClick={() => deleteSalesperson()}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default SalepersonList;
