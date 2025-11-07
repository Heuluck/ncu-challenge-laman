import { Route, Routes } from 'react-router';
import './App.css';
import Login from './pages/login';
import BaseLayout from './layout/base';
import Index from './pages';

function App() {
    return (
        <>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route index element={<Index />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
