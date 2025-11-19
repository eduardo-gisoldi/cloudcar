import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componentes/pages/Home';
import VehicleDetail from './componentes/pages/VehicleDetail';
import TestDrive from './componentes/pages/TestDrive';
import Financiamento from './componentes/pages/Financiamento';
import Admin from './componentes/pages/Admin';
import './App.css';

/**
 * Componente principal App
 * Configura as rotas do site CloudCar
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Rota da Página Inicial */}
        <Route path="/" element={<Home />} />

        {/* Rota da Página de Detalhes do Veículo */}
        <Route path="/vehicle/:id" element={<VehicleDetail />} />

        {/* Rota da Página de Test Drive */}
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/test-drive/:vehicleId" element={<TestDrive />} />

        {/* Rota da Página de Financiamento */}
        <Route path="/financiamento" element={<Financiamento />} />
        <Route path="/financiamento/:vehicleId" element={<Financiamento />} />

        {/* Rota da Página de Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
