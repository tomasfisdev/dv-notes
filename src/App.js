import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Notes from './views/Notes'
import Error from './views/Error'
import Register from './views/Register'
import Login from './views/Login'
import { useState, useEffect } from 'react'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [activeNav, setActiveNav] = useState(true)
  const [activeLink, setActiveLink] = useState("notas")

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      setIsAuth(true)
    }
  }, [])

  function Logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuth(false)
  }

  return (
    <div className="App">
      <div id="cont-all">
        {isAuth &&
          <div className={`${activeNav === true ? 'cont-izquierda' : 'cont-izquierda unactive-nav'}`}>
            <div className="flex">
              <i onClick={() => setActiveNav(!activeNav)} className="bi bi-list"></i>
              <h1 id="logo">DvNotes</h1>
            </div>
            <nav>
              <ul>
                <li>
                  <Link onClick={()=>setActiveLink("notas")} className={activeLink === 'notas' ? 'current-link' : ''} to="/notas">
                    <i className="bi bi-sticky-fill"></i>
                    Notas
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setActiveLink("papelera")} className={activeLink === 'papelera' ? 'current-link' : ''} to="/papelera">
                    <i className="bi bi-trash2-fill"></i>
                    Papelera
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="logout">
              <button onClick={() => Logout()} className={`${activeNav === true ? '' : 'btn-no-font'}`}>
                <i className="bi bi-box-arrow-left"></i>
                Cerrar sesión ({JSON.parse(localStorage.getItem('user')).name})
              </button>
            </div>
          </div>
        }
        <div className="cont-derecha">
          <Routes>
            <Route path="/" element={<Navigate to="/notas" />}></Route>
            <Route path="/registrarse" element={<Register />}></Route>
            <Route path="/iniciar-sesion" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to="/" />}></Route>
            <Route path="/notas" element={isAuth ? <Notes title={'Notas'} status={'default'} /> : <Navigate to="/iniciar-sesion" />}></Route>
            <Route path="/papelera" element={isAuth ? <Notes title={'Papelera'} status={'bin'} /> : <Navigate to="/iniciar-sesion" />}></Route>
            <Route path="/404" element={<Error />}></Route>
            <Route path="*" element={<Navigate to="/404" />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
