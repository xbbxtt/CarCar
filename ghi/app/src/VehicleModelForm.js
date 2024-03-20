import React, {useState, useEffect} from 'react';

function VehicleModelForm() {
    const [manufacturers, setManufacturers] = useState([])
    const getData = async () => {
        const manufacturersurl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(manufacturersurl);
    if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
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
        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(vehicleModelUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                name: '',
                picture_url: '',
                manufacturer_id: '',
            });
        }
    }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.name} placeholder="Model name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="Model name">Model name</label>
            </div>
            <div className="mb-3">
              <label htmlFor="Picture url">picture_url</label>
              <textarea onChange={handleFormChange} value={formData.picture_url} className="form-control" id="picture_url" rows="3" name="picture_url" className="form-control"></textarea>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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

export default VehicleModelForm;
