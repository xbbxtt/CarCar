import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([])

    const getData = async () => {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos)
      }
    }

    useEffect(()=>{
      getData()
    }, [])

    for (const automobile of automobiles) {
        if(automobile.model === undefined) {
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
        <h1>Automobiles</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
            <th>
                <NavLink className="nav-link active" aria-current="page" to={`/automobiles/new/`}>
                    <button variant="primary">Create New Automobile</button>
                </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map(automobile => {
            let sold = "No"
            if (automobile.sold === true) {
                sold = "Yes"
            }
            return (
                    <tr key={automobile.id} >
                        <td>{ automobile.vin }</td>
                        <td>{ automobile.color }</td>
                        <td>{ automobile.year }</td>
                        <td>{ automobile.model.name }</td>
                        <td>{ automobile.model.manufacturer.name }</td>
                        <td>{ sold }</td>
                    </tr>
            );
          })}
        </tbody>
      </table>
      </>
    );
}

export default AutomobileList
