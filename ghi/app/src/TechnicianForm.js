import React, {useState} from 'react';

function TechnicianForm() {

    //create form & handle form change
    const [formData, setFormData] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
    })

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
        //Previous form data is spread (i.e. copied) into our new state object
            ...formData,

        //On top of the that data, we add the currently engaged input key and value
            [inputName]: value
        });
    }

    //handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        const technicianUrl = 'http://localhost:8080/api/technicians/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                employee_id: '',
                first_name: '',
                last_name: '',
            });
        }
    }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new technician</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.first_name} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.last_name} placeholder="Model Name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary"> Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
