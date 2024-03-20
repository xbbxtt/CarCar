import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function VehicleModelList() {
    const [vehicleModels, setVehicleModels] = useState([])

    const getData = async () => {
      const response = await fetch('http://localhost:8100/api/models/');
      if (response.ok) {
        const data = await response.json();
        setVehicleModels(data.models)
      }
    }

    useEffect(()=>{
      getData()
    }, [])

    for (const vehicleModel of vehicleModels) {
        if(vehicleModel.manufacturer === undefined) {
            return(
                <p>Loading</p>
            )
        } else {
            break
        }
    }

    return (
      <>
      <div>
        <h1>Vehicle Models</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
            <th>
                <NavLink className="nav-link active" aria-current="page" to={`/vehiclemodels/new/`}>
                    <button variant="primary">Create New Model</button>
                </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {vehicleModels.map(vehicleModel => {
            return (
                    <tr key={vehicleModel.id} >
                        <td>{ vehicleModel.name }</td>
                        <td>{ vehicleModel.manufacturer.name }</td>
                        <td>
                            <img
                                src={vehicleModel.picture_url}
                                width={200} height={100}
                                alt='vehicle model picture'
                            />
                        </td>
                    </tr>
            );
          })}
        </tbody>
      </table>
      </>
    );
}

export default VehicleModelList
