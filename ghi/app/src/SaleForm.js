import React, { useEffect, useState } from "react";


function SaleForm() {
    const [ price, setPrice ] = useState('');
    const [ automobile, setAutomobile ] = useState('');
    const [ automobiles, setAutomobiles ] = useState([])
    const [ salesperson, setSalesperson ] = useState('');
    const [ customer, setCustomer ] = useState('');
    const [ customers, setCustomers ] = useState([])
    const [ salespeople, setSalespeople ] = useState([])

    const fetchDataOne = async () => {
      try {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setAutomobiles(data.autos);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchDataOne();
    }, []);

    const fetchDataTwo = async () => {
      try {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setCustomers(data.customer);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchDataTwo();
    }, []);

    const fetchDataThree = async () => {
      try {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setSalespeople(data.salesperson);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchDataThree();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const saleResponse = await fetch(saleUrl, fetchOptions);

            if (saleResponse.ok) {
                setPrice('');
                setAutomobile('');
                setSalesperson('');
                setCustomer('');
            } else {
                console.error('Failed to create Customer:', saleResponse.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleChangePrice = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleChangeAutomobile = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleChangeSalesperson = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleChangePrice}
                  value={price}
                  placeholder="price"
                  required
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                />
                <label htmlFor="price">Price</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleChangeAutomobile}
                  value={automobile}
                  required
                  name="automobile"
                  id="automobile"
                  className="form-select"
                >
                  <option value="">Choose an automobile</option>
                  {automobiles ? (
                    automobiles.map(man => (
                      <option key={man.id} value={man.id}>
                        {man.vin}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleChangeSalesperson}
                  value={salesperson}
                  required
                  name="salesperson"
                  id="salesperson"
                  className="form-select"
                >
                  <option value="">Choose an sales person</option>
                  {salespeople ? (
                    salespeople.map(man => (
                      <option key={man.id} value={man.id}>
                        {man.first_name} {man.last_name}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleChangeCustomer}
                  value={customer}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose an customer</option>
                  {customers ? (
                    customers.map(man => (
                      <option key={man.id} value={man.id}>
                        {man.first_name} {man.last_name}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default SaleForm;
