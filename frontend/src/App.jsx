import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
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

  if (!localStorage.getItem("user")) return <Navigate to="/login" replace />;

  return (
    <>
      <Header onMenu={() => setMenuOpen(true)} />
      <Outlet />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} servers={servers} services={services} />
    </>
  );
}

function App() {
  const [servers, setServers] = useState([]);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const shared = { servers, setServers, services };

  const get = (path) => fetch(`${API}${path}`).then((res) => (res.ok ? res.json() : Promise.reject()));

  // Carga los datos del backend; si falla se avisa y se puede reintentar
  const load = () => {
    setStatus("loading");
    Promise.all([get("/api/servers"), get("/api/services")])
      .then(([s, sv]) => { setServers(s); setServices(sv); setStatus("ok"); })
      .catch(() => setStatus("error"));
  };

  useEffect(load, []);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout servers={servers} services={services} />}>
          <Route index element={<Home {...shared} />} />
          <Route path="servers" element={<Servers {...shared} status={status} reload={load} />} />
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
