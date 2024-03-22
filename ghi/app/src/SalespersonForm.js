import React, { useState } from "react";

function SalespersonForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            employee_id: employeeId
        };

        try {
            const salespersonUrl = 'http://localhost:8090/api/salespeople/';
            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const salespersonResponse = await fetch(salespersonUrl, fetchOptions);
            if (salespersonResponse.ok) {
                setFirstName('');
                setLastName('');
                setEmployeeId('');
            } else {
                console.error('Failed to create Salesperson:', salespersonResponse.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    };

    const handleChangeEmployeeId = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    };

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Salesperson</h1>
              <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={handleChangeFirstName}
                    value={firstName}
                    placeholder="First Name"
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleChangeLastName}
                    value={lastName}
                    placeholder="Last Name"
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-control"
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleChangeEmployeeId}
                    value={employeeId}
                    placeholder="Employee Id"
                    required
                    type="number"
                    name="employeeId"
                    id="employeeId"
                    className="form-control"
                  />
                  <label htmlFor="employeeId">Employee Id</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default SalespersonForm;
