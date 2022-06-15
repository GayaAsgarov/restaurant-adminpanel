import React from 'react'
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Form = (props) => {
    const [table, setTable] = useState("");
    const [server, setServer] = useState("");
    const [meal, setMeal] = useState(null);
    const [choosenMeals, setChoosenMeals] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [cost, setCost] = useState(0);
    const [status, setStatus] = useState("verildi");
    const [orders, setOrders] = useState({});

    const [show, setShow] = useState("hide");

    const startOrder = (e) => {
        e.preventDefault();
        if (table != "" && server != "") {
            if (show === "hide") {
                setShow("show");
            } else {
                setShow("hidden");
            }
        }
        else {
            alert("Boşluqları Doldurun");
        }

    }

    const handleCost = (e) => {
        setQuantity(e.target.value);

        props.meals.map((item) => {
            if (item.name === meal) {
                setPrice(item.price);
            }
        })
        setCost((e.target.value) * price);
    }
    console.log("Cost " + cost);
    console.log(price);

    const getMeal = (e) => {
        setMeal(e.target.value);
        props.meals.map((item) => {
            if (item.name === meal) {
                setPrice(item.price);
            }
        })
        setQuantity(0);
    }
    console.log("Price: " + price);
    const addMeal = (e) => {
        e.preventDefault();
        setCost(quantity * price);
        if (meal != null && quantity != 0) {
            setChoosenMeals([...choosenMeals, { id: Math.random() * 1000, name: meal, amount: quantity, cost: cost, status: status }]);
            setMeal(null);
            setQuantity(0);
            setCost(0);
        }
        else{
            alert("İstədiyiniz məhsulu və miqdarını daxil edin");
        }
    }

    const handleCancel = (e, id) => {
        e.preventDefault();
        setChoosenMeals((meals) => meals.filter((meal) => meal.id !== id));
    }

    const submitOrder = (e) => {
        e.preventDefault();

        setOrders({ meals: choosenMeals, server: server, totalCost: choosenMeals.reduce((a, v) => a = a + v.cost, 0), status: "sonlanmayib", table: table });


        Axios.post("http://localhost:8000/orders", {
            orders,
        }).then(console.log("Success")).catch(err => console.log(err));
        setChoosenMeals([]);
    }
    console.log(choosenMeals);

    return (
        <div className='form'>
            <form>
                <div className='table' >
                    <label htmlFor="table">Masa</label>
                    <select name="table" id="table" onChange={(e) => setTable(e.target.value)}>
                        <option value="Seç" disabled selected>Seç</option>
                        {props.tables.map((table) => {
                            return (
                                <option key={table.id} value={table.id}>{table.id}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='server'>
                    <label htmlFor="server">Xidmətçi</label>
                    <select name="server" id="server" onChange={(e) => setServer(e.target.value)}>
                        <option value="Seç" disabled selected>Seç</option>
                        {props.servers.map((server) => {
                            return (
                                <option key={server.id} value={server.name + " " + server.surname}>{server.name + " " + server.surname}</option>
                            )
                        })}
                    </select>
                </div>
                <br />
                <button onClick={startOrder} className="start-btn">Sifarişi başlat</button>
                <br />

                <div className={show}>
                    <div className='product'>
                        <label htmlFor="meal">Məhsul Adı</label>
                        <select name="meal" id="meal" onChange={getMeal}>
                            <option value="Seç" disabled selected>Seç</option>
                            {props.meals.map((meal) => {
                                return (
                                    <option value={meal.name} key={meal.id}>{meal.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className='amount'>
                        <label htmlFor="amount">Miqdar</label>
                        <input type="number" id='amount' name='amount' min="0" value={quantity} onChange={handleCost} />
                    </div>
                    <p>Qiymət: {parseFloat((quantity * price).toFixed(2))} AZN</p>
                    <button onClick={addMeal} className='add-btn'>Əlavə et</button>
                    <button onClick={submitOrder} className="end-btn">Sifarişi Sonuçlandır</button>
                </div>





            </form>


            <div className={(choosenMeals.length === 0 ? "hide" : "orders show")} >
                <table>
                    <tr>
                        <th>Məhsul Adı</th>
                        <th>Miqdar</th>
                        <th>Məbləğ</th>
                        <th>Status</th>
                        <th>Geri</th>
                    </tr>
                    {choosenMeals.map((meal, index) => {
                        return (
                            <tr>
                                <td>{meal.name}</td>
                                <td>{meal.amount}</td>
                                <td>{parseFloat(meal.cost.toFixed(2))} AZN</td>
                                <td>{meal.status}</td>
                                <td><button onClick={(e) => handleCancel(e, meal.id)}>Geri</button></td>
                            </tr>
                        )
                    })}
                </table>
                <h1>Cəmi məbləğ: {choosenMeals.reduce((a, v) => a = parseFloat((a + v.cost).toFixed(2)), 0)} AZN</h1>
            </div>
        </div >
    )
}

export default Form