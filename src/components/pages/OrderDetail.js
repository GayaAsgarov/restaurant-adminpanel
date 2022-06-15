import React from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const OrderDetail = () => {
    let { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const responseOrders = await Axios.get("http://localhost:8000/orders").then((res) => {
                setOrders(res.data);
            })
                .catch((err) => console.log(err))
        }
        fetchOrders();
    }, []);
    return (
        <div className='orderDetail'>
            <table>
                <tr>
                    <th>Məhsul Adı</th>
                    <th>Miqdar</th>
                    <th>Məbləğ</th>
                    <th>Status</th>
                </tr>
                {orders.map((order) => {
                    if ((order["id"]) == id) {
                        return (
                            <tbody>
                                {order["orders"].meals.map((meal) => {
                                    console.log("Cemi:  ",order["orders"].meals.reduce((a,v)=> a = a+v.cost,0))
                                    return (
                                        <tr>
                                            <td>{meal.name}</td>
                                            <td>{meal.amount}</td>
                                            <td>{parseFloat(meal.cost.toFixed(2))} AZN</td>
                                            <td>{meal.status}</td>
                                        </tr>
                                    )
                                })}
                                <h4>Cəmi Məbləğ : {order["orders"].meals.reduce((a,v)=> a = parseFloat((a+v.cost).toFixed(2)),0)} AZN</h4>
                            </tbody>
                           
                    )
                }
            })}
            </table>
        </div>
    )
}

export default OrderDetail