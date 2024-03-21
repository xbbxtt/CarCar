import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function AppointmentList() {
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

    const createdAppointments = appointments.filter((appointment) => appointment.status === "Created")

    async function cancelAppoinment(id) {
        await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, { method: 'PUT' });
        alert('Appointment canceled');
        window.location.reload()
    }

    async function finishAppoinment(id) {
        await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, { method: 'PUT' });
        alert('Appointment finished');
        window.location.reload()
    }

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
        <h1>Service appointments</h1>
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
            const datetime = new Date(createdAppointment.date_time)
            const date = datetime.toLocaleDateString()
            const time = datetime.toLocaleTimeString()
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
