import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { API } from "./api.js";
import Header from "./components/Header/Header.jsx";
import SideMenu from "./components/SideMenu/SideMenu.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Servers from "./pages/Servers/Servers.jsx";
import ServerDetail from "./pages/ServerDetail/ServerDetail.jsx";
import Services from "./pages/Services/Services.jsx";
import Help from "./pages/Help/Help.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Cabecera y menú lateral para todas las páginas menos el login
function Layout({ servers, services }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header onMenu={() => setMenuOpen(true)} />
      <Outlet />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} servers={servers} services={services} />
    </>
  );
}

// Servidores y servicios se leen del backend. Los cambios (editar, añadir, eliminar, encender/apagar) por ahora solo viven en memoria
function App() {
  const [servers, setServers] = useState([]);
  const [services, setServices] = useState([]);
  const shared = { servers, setServers, services };

  useEffect(() => {
    fetch(`${API}/api/servers`).then((res) => res.json()).then(setServers);
    fetch(`${API}/api/services`).then((res) => res.json()).then(setServices);
  }, []);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout servers={servers} services={services} />}>
          <Route index element={<Home {...shared} />} />
          <Route path="servers" element={<Servers {...shared} />} />
          <Route path="servers/:id" element={<ServerDetail {...shared} />} />
          <Route path="services" element={<Services servers={servers} services={services} />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
