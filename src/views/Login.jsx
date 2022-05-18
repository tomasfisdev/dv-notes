import { Link } from 'react-router-dom';
import { useState } from 'react'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function Login(e) {
        e.preventDefault()
        fetch(`http://localhost/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                props.setIsAuth(true)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    return (
        <div className="cont-form">
            <h1 id="logo">DvNotes</h1>
            <form onSubmit={(e) => Login(e)}>
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" type="email" required />
                <label htmlFor="contraseña">Contraseña</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="contraseña" type="password" required />
                <button type="submit" className="btn">Iniciar sesión</button>
            </form>
            <div className="auth-link">
                <p>¿No tenés cuenta?</p> <Link to="/registrarse"><span>Registrate</span></Link>
            </div>
        </div>
    )
}

export default Login