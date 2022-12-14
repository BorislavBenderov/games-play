import { Routes, Route } from 'react-router-dom';
import { GameContext } from './contexts/GameContext';
import { AuthContext } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import * as gameService from './services/gameService';
import { useLocalStorage } from './hooks/useLocalStorage';

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';
import { Logout } from './components/Logout/Logout';


function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});

    useEffect(() => {
        gameService.getAll()
        .then(result => setGames(Object.values(result)))
    }, []);
    
    const onLogin = (authData) => {
        setAuth(authData);
    }

    const onLogout = () => {
        setAuth({});
    }

    const onCreate = (newGame) => {
        setGames(oldGames => [
            ...oldGames,
            newGame
        ])
    }

    const onEdit = (gameId, gamedata) => {
        setGames(state => state.map(x => x._id === gameId ? gamedata : x));
    }

    const onDelete = (gameId) => {
        setGames(state => state.filter(x => x._id !== gameId));
    }

    return (
        <AuthContext.Provider value={{ auth, onLogin, onLogout }}>
        <div className="App">
            <Header />
            <GameContext.Provider value={{ games, onCreate, onEdit, onDelete }}>
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/catalog" element={<Catalog />}/>
                    <Route path="/create" element={<Create />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/logout" element={<Logout />}/>
                    <Route path="/details/:gameId" element={<Details />}/>
                    <Route path="/edit/:gameId" element={<Edit />}/>
                </Routes>
            </main>
            </GameContext.Provider>
        </div>
        </AuthContext.Provider>
    );
}

export default App;
