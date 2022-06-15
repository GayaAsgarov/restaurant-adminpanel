import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import Form from './pages/Form';
import Navbar from '../components/Navbar';
import Home from './pages/Home';
import OrderDetail from './pages/OrderDetail';

const App = () => {
    const [meals, setMeals] = useState([]);
    const [tables, setTables] = useState([]);
    const [servers, setServers] = useState([]);




    useEffect(() => {
        const fetchMenu = async () => {
            const responseMeals = await Axios.get("http://localhost:8000/meals").then((res) => {
                setMeals(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });

            const responseTables = await Axios.get("http://localhost:8000/tables").then((res) => {
                setTables(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });

            const responseServers = await Axios.get("http://localhost:8000/servers").then((res) => {
                setServers(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchMenu();
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/order/:id" element={<OrderDetail />}/>
                <Route path="/makeOrder" element={<Form tables={tables} servers={servers} meals={meals} />} />
            </Routes>
        </Router>
    )
}

export default App