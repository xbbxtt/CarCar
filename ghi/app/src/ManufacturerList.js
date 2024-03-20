import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([])

    const getData = async () => {
      const response = await fetch('http://localhost:8100/api/manufacturers/');
      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers)
      }
    }

    useEffect(()=>{
      getData()
    }, [])

    return (
      <>
      <div>
        <p>Manufacturers</p>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>
                <NavLink className="nav-link active" aria-current="page" to={`/manufacturers/new/`}>
                    <button variant="primary">Create New Manufacturer</button>
                </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => {
            return (
                    <tr key={manufacturer.id} >
                        <td>{ manufacturer.name }</td>
                    </tr>
            );
          })}
        </tbody>
      </table>
      </>
    );
}

export default ManufacturerList
