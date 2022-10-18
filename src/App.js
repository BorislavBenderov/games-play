import { Routes, Route } from 'react-router-dom';
import { GameContext } from './contexts/GameContext';

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';
import { useEffect, useState } from 'react';
import * as gameService from './services/gameService';

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
        .then(result => setGames(Object.values(result)))
    }, []);


    return (
        <div className="App">
            <Header />
            <GameContext.Provider value={{ games }}>
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/catalog" element={<Catalog />}/>
                    <Route path="/create" element={<Create />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/details/:id" element={<Details />}/>
                    <Route path="/edit/:id" element={<Edit />}/>
                </Routes>
            </main>
            </GameContext.Provider>
        </div>
    );
}

export default App;
