import { useEffect, useState } from 'react';


function ServiceHistory() {
    //fetch appointments
    const [appointments, setAppointments] = useState([])
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/appointments/');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments)
      }
    }
    useEffect(()=>{
      getData()
    }, [])

    //fetch automobileVOs for vin conpare
    const [automobileVOs, setAutomobileVOs] = useState([])
    const getAutomobileVOsData = async () => {
      const response = await fetch('http://localhost:8080/api/automobileVOs/');
      if (response.ok) {
        const data = await response.json();
        setAutomobileVOs(data.automobileVOs)
      }
    }
    useEffect(()=>{
        getAutomobileVOsData()
    }, [])

    //catch input in the search bar
    const [query, setQuery] = useState("")

    //add loading message while appointment.technician is undefined
    for (const appointment of appointments) {
        if(appointment.technician === undefined) {
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
            <h1>Service History</h1>
        </div>
        <div>
            <input type='text' placeholder='Search VIN...' className='search' onChange={(e) => setQuery(e.target.value)} />
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Vin</th>
                <th>is VIP</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {appointments.filter(appointment => appointment.vin.toLowerCase().includes(query)).map(appointment => {
                //split date and time from date_time
                const datetime = new Date(appointment.date_time)
                const date = datetime.toLocaleDateString()
                const time = datetime.toLocaleTimeString()
                //conpare vin to decide VIP
                let VIP = "No"
                for (const automobileVO of automobileVOs){
                    if (appointment.vin === automobileVO.vin) {
                        VIP = "Yes"
                    }
                }
                return (
                        <tr key={appointment.id} >
                            <td>{ appointment.vin }</td>
                            <td>{ VIP }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ date }</td>
                            <td>{ time }</td>
                            <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>
                        </tr>
                );
            })}
            </tbody>
        </table>
      </>
    );
}

export default ServiceHistory
