import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';




function TechnicianDetail() {
    const [technician, setTechnician] = useState([])
    //pass shoe id from APP.js
    const {id} = useParams()
    //redirect
    const nav = useNavigate()

    const getData = async () => {
      const response = await fetch(`http://localhost:8080/api/technicians/${id}/`);

      if (response.ok) {
        const data = await response.json();
        setTechnician(data)
      }
    }

    useEffect(()=>{
      getData()
    }, [])


    //delete function
    async function deleteTechnician() {
        await fetch(`http://localhost:8080/api/technicians/${id}/`, { method: 'DELETE' });
        alert('Delete successful');
        nav("/technicians")
    }


    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
              <tr key={technician.id}>
                <td>{ technician.employee_id }</td>
                <td>{ technician.first_name }</td>
                <td>{ technician.last_name }</td>
                <td>
                    <button onClick={() => deleteTechnician()}>Delete</button>
                </td>
              </tr>
        </tbody>
      </table>
    );
}

export default TechnicianDetail
