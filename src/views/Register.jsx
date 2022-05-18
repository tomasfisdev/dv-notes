import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'

function Register(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    function Register(e) {
        e.preventDefault()
        fetch(`http://localhost/user/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                navigate('/iniciar-sesion')
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    return (
        <div className="cont-form">
              <h1 id="logo">DvNotes</h1>
            <form onSubmit={(e) => Register(e)}>
                <label htmlFor="nombre">Nombre</label>
                <input onChange={(e) => setName(e.target.value)} value={name} name="name" id="nombre" type="text" required />
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" type="email" required />
                <label htmlFor="contraseña">Contraseña</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="contraseña" type="password" required />
                <button type="submit" className="btn">Registrarse</button>
            </form>
            <div className="auth-link">
                <p>¿Ya tenés cuenta?</p>
                <Link to="/iniciar-sesion"><span>Iniciar sesión</span></Link>
            </div>
        </div>
    )
}

export default Register