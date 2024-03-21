import React, {useState, useEffect} from 'react';


function AppointmentForm() {
    //fetch technician for select options
    const [technicians, setTechnicians] = useState([])

    const getData = async () => {
        const technicianurl = 'http://localhost:8080/api/technicians/';
        const response = await fetch(technicianurl);
    if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const [formData, setFormData] = useState({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
    })

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        //combine date and time to date_time
        const newFormData = {
            vin: '',
            customer: '',
            date_time: '',
            technician: '',
            reason: '',
        }
        newFormData["vin"] = formData["vin"]
        newFormData["customer"] = formData["customer"]
        newFormData["date_time"] = formData["date"] + " " + formData["time"]
        newFormData["technician"] = formData["technician"]
        newFormData["reason"] = formData["reason"]
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                vin: '',
                customer: '',
                date: '',
                time: '',
                technician: '',
                reason: '',
            });
        }
    }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new appointment</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="Automobile VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="Automobile VIN">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
              <label htmlFor="Customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
              <label htmlFor="Date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
              <label htmlFor="Time">Time</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                <option value="">Choose a technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <textarea onChange={handleFormChange} value={formData.reason} placeholder="Reason" className="form-control" id="reason" rows="3" name="reason" className="form-control"></textarea>
            </div>
            <button className="btn btn-primary" > Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
