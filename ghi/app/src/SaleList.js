import React, { useState, useEffect } from 'react';


function SaleList() {
    const [sales, setSales] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/');
            if (response.ok) {
                const { sale } = await response.json();
                setSales(sale);
            } else {
                console.error('An error occurred fetching the data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    async function deleteSale(id) {
        await fetch(`http://localhost:8090/api/sales/${id}/`, { method: 'DELETE' });
        alert('Delete successful');
        window.location.reload()
    }


    return (
        <div className="my-5 container">
            <div className="row">
                <h1>Sales</h1>

                <table className="table table-striped m-3">
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Automobile</th>
                            <th>Salesperson</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales?.map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.price}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>
                                    <button onClick={() => deleteSale(sale.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SaleList;
