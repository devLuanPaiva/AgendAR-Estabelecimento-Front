import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './styles/app.scss'
import './styles/css/style.min.css'
import './styles/css/pagesStyles.min.css'
import LandingPage from './pages/landingPage/LandingPage';
import Authentication from './pages/authentication/Authentication';
import AuthContextProvider from './context/AuthContext';
import SidebarProvider from "./components/sidebar/SidebarProvider";
import ProtectedRouter from "./context/ProtectedRouter";
import Register from "./pages/register/Register";
import Schedules from "./pages/schedules/Schedules";
import Services from "./pages/services/Services";
import Appointments from "./pages/appointments/Appointments";
import Settings from "./pages/settings/Settings";
import Dashboard from "./pages/dashboard/Dashboard";
import Location from "./pages/location/Location";
import EditLocation from "./pages/location/EditLocation";
import RegisterServices from "./pages/services/RegisterServices";
import RegisterShedules from "./pages/schedules/RegisterShedules";
import ScheduleEdit from "./pages/schedules/ScheduleEdit";
import WeeklyAppointments from "./pages/appointments/WeeklyAppointments";
import RegisterAppointment from "./pages/appointments/RegisterAppointment";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <SidebarProvider>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route path="*" element={<PageNotFound/>} />
            <Route path='/registrarEstabelecimento/' element={<Register />} />
            <Route path='/autenticacao/' element={<Authentication />} />
            <Route path="/" element={<ProtectedRouter />} >
              <Route path='/painel/' element={<Dashboard />} />
              <Route path='/configuracoes/' element={<Settings />} />
              <Route path='/horarios/' element={<Schedules />} />
              <Route path='/horarios/cadastrar/' element={<RegisterShedules />} />
              <Route path='/horarios/editar/:idSchedule' element={<ScheduleEdit />} />
              <Route path='/localizacao/' element={<Location />} />
              <Route path='/localizacao/modificar/' element={<EditLocation />} />
              <Route path='/servicos/' element={<Services />} />
              <Route path='/servicos/cadastrar/' element={<RegisterServices />} />
              <Route path='/agendamentos/' element={<Appointments />} />
              <Route path='/agendamentos/semanais/' element={<WeeklyAppointments />} />
              <Route path='/agendamentos/cadastrar/' element={<RegisterAppointment />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </AuthContextProvider>
    </Router>

  );
}

export default App;
