import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleList() {
    const [sales, setSales] = useState([]);
    const nav = useNavigate()

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/');
            if (response.ok) {
                const { sale: fetchedSales } = await response.json(); // Rename to fetchedSales
                setSales(fetchedSales);
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

    async function deleteSale() {
        await fetch(`http://localhost:8080/api/sale/`, { method: 'DELETE' });
        alert('Delete successful');
        nav("/sale")
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
                        {sales.map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.price}</td>
                                <td>{sale.automobile}</td>
                                <td>{sale.salesperson}</td>
                                <td>{sale.customer}</td>
                                <td>
                                    <button onClick={() => deleteSale()}>Delete</button>
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
