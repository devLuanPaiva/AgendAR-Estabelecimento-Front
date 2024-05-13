import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from './paginas/inicial/Inicial';
import Registrar from './paginas/registrar/Registrar';
import Autenticacao from './paginas/autenticacao/Autenticacao';
import AuthContextProvider from './servicos/AuthContext';
import Painel from "./paginas/painel/Painel";
import Configuracoes from "./paginas/configuracoes/Configuracoes";
import Horarios from "./paginas/horarios/Horarios";
import Localizacao from "./paginas/localizacao/Localizacao";
import Servicos from "./paginas/servicos/Servicos";
import Agendamentos from "./paginas/agendamentos/Agendamentos";
import RotasProtegidas from "./servicos/RotasProtegidas";

function App() {
  return (
    <Router>
      <AuthContextProvider>

        <Routes>
          <Route exact path='/' element={<Inicial />} />
          <Route path='/registrarEstabelecimento/' element={<Registrar />} />
          <Route path='/autenticacao/' element={<Autenticacao />} />
          <Route path="/" element={<RotasProtegidas />} >
            <Route path='/painel/' element={<Painel />} />
            <Route path='/configuracoes/' element={<Configuracoes />} />
            <Route path='/horarios/' element={<Horarios />} />
            <Route path='/localizacao/' element={<Localizacao />} />
            <Route path='/servicos/' element={<Servicos />} />
            <Route path='/agendamentos/' element={<Agendamentos />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>

  );
}

export default App;
