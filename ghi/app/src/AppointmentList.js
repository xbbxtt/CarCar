import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function AppointmentList() {
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

    //filter created appointments only
    const createdAppointments = appointments.filter((appointment) => appointment.status === "Created")

    //cancel function
    async function cancelAppoinment(id) {
        await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, { method: 'PUT' });
        alert('Appointment canceled');
        window.location.reload()
    }

    //finish function
    async function finishAppoinment(id) {
        await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, { method: 'PUT' });
        alert('Appointment finished');
        window.location.reload()
    }

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
        <p>Service appointments</p>
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
            <th>
            </th>
            <th>
                <NavLink className="nav-link active" aria-current="page" to={`/appointments/new/`}>
                    <button variant="primary">Create New Appointment</button>
                </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {createdAppointments.map(createdAppointment => {
            //split date and time from date_time
            const datetime = new Date(createdAppointment.date_time)
            const date = datetime.toLocaleDateString()
            const time = datetime.toLocaleTimeString()
            //conpare vin to decide VIP
            let VIP = "No"
            for (const automobileVO of automobileVOs){
                if (createdAppointment.vin === automobileVO.vin) {
                    VIP = "Yes"
                }
            }
            return (
                    <tr key={createdAppointment.id} >
                        <td>{ createdAppointment.vin }</td>
                        <td>{ VIP }</td>
                        <td>{ createdAppointment.customer }</td>
                        <td>{ date }</td>
                        <td>{ time }</td>
                        <td>{ createdAppointment.technician.first_name } { createdAppointment.technician.last_name }</td>
                        <td>{ createdAppointment.reason }</td>
                        <td>
                            <button onClick={() => cancelAppoinment(createdAppointment.id)}>Cancel</button>
                        </td>
                        <td>
                            <button onClick={() => finishAppoinment(createdAppointment.id)}>Finish</button>
                        </td>
                    </tr>
            );
          })}
        </tbody>
      </table>
      </>
    );
}

export default AppointmentList
