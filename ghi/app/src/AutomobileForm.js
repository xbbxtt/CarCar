import React, {useState, useEffect} from 'react';


function AutomobileForm() {
    //fetch models for select options
    const [models, setModels] = useState([])

    const getData = async () => {
        const modelsurl = 'http://localhost:8100/api/models/';
        const response = await fetch(modelsurl);
    if (response.ok) {
        const data = await response.json();
        setModels(data.models);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
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
        console.log(formData)
        const vautomobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(vautomobileUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                color: '',
                year: '',
                vin: '',
                model_id: '',
            });
        }
    }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.color} placeholder="color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="Color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.year} placeholder="year" required type="text" name="year" id="year" className="form-control" />
              <label htmlFor="Year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="color" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="Vin">Vin</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select">
                <option value="">Choose a Model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary" > Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
