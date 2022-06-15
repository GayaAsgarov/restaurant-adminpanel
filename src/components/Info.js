import React from 'react'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Info = (props) => {
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
        <div className='info'>
            <table>
                <tr>
                    <th>Masa</th>
                    <th>Xidmətçi</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                <tbody>
                    {orders.map((order, index) => {
                        console.log(order)
                        if (Object.keys(order["orders"]).length !== 0) {
                            return (
                                <tr>
                                    <td>{order["orders"].table}</td>
                                    <td>{order["orders"].server}</td>
                                    <td>{order["orders"].status}</td>
                                    <td>
                                        <Link to={`/order/${order.id}`}><button>Bax</button></Link>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Info