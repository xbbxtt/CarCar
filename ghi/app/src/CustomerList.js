import  { useState, useEffect} from 'react';


function CustomerList() {
    const [customer, setCustomer] = useState ([])

    const getData = async () => {
        const response = await fetch ('http://localhost:8090/api/customers/')
        if (response.ok) {
            const { customer } = await response.json();
            setCustomer(customer);
        }else {
            console.error('An error occured fetching the data')
        }
    }


    useEffect(()=> {
      getData()
    }, []);

    async function deleteCustomer(id) {
      await fetch(`http://localhost:8090/api/customers/${id}/`, { method: 'DELETE' });
      alert('Delete successful');
      window.location.reload()
    }


  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Customers</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customer.map(tech => {
              return (
                <tr key={tech.id}>
                  <td>{ tech.first_name }</td>
                  <td>{ tech.last_name }</td>
                  <td>{ tech.address }</td>
                  <td>{ tech.phone_number }</td>
                  <td>
                    <button onClick={() => deleteCustomer(tech.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default CustomerList;
