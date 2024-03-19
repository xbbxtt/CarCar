import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function TechnicianList() {
    const [technicians, setTechnicians] = useState([])

    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/technicians/');

      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians)
      }
    }

    useEffect(()=>{
      getData()
    }, [])


    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>
                <NavLink className="nav-link active" aria-current="page" to={`/technicians/new/`}>
                    <button variant="primary">Create New Technician</button>
                </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(technician => {
            return (
                    <tr key={technician.id} >
                        <td>{ technician.employee_id }</td>
                        <td>{ technician.first_name }</td>
                        <td>{ technician.last_name }</td>
                        <td>
                            <NavLink className="nav-link active" aria-current="page" to={`/technicians/${technician.id}/`}>
                                <button >Detail</button>
                            </NavLink>
                        </td>
                    </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default TechnicianList
