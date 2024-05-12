import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from './paginas/inicial/Inicial';
import Registrar from './paginas/registrar/Registrar';
import Autenticacao from './paginas/autenticacao/Autenticacao';
import AuthContextProvider from './servicos/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>

        <Routes>
          <Route exact path='/' element={<Inicial />} />
          <Route path='/registrarEstabelecimento/' element={<Registrar />} />
          <Route path='/autenticacao/' element={<Autenticacao />} />
        </Routes>
      </AuthContextProvider>
    </Router>

  );
}

export default App;
