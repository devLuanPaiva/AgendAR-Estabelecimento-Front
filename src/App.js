import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/landingPage/LandingPage';
import Authentication from './pages/authentication/Authentication';
import AuthContextProvider from './services/AuthContext';
import SidebarProvider from "./componentes/sidebar/SidebarProvider";
import ProtectedRouter from "./services/ProtectedRouter";
import Register from "./pages/register/Register";
import Schedules from "./pages/schedules/Schedules";
import Services from "./pages/services/Services";
import Appointments from "./pages/appointments/Appointments";
import Settings from "./pages/settings/Settings";
import Dashboard from "./pages/dashboard/Dashboard";
import Location from "./pages/location/Location";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <SidebarProvider>

          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route path='/registrarEstabelecimento/' element={<Register />} />
            <Route path='/Autenticacao/' element={<Authentication />} />
            <Route path="/" element={<ProtectedRouter />} >
              <Route path='/painel/' element={<Dashboard />} />
              <Route path='/configuracoes/' element={<Settings />} />
              <Route path='/horarios/' element={<Schedules />} />
              <Route path='/localizacao/' element={<Location />} />
              <Route path='/servicos/' element={<Services />} />
              <Route path='/agendamentos/' element={<Appointments />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </AuthContextProvider>
    </Router>

  );
}

export default App;
