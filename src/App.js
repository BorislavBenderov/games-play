import { Routes, Route } from 'react-router-dom';

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';


function App() {
    return (
        <div className="App">
            <Header />
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
        </div>
    );
}

export default App;
