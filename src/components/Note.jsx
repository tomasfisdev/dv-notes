import { useState, useContext } from 'react'
import EditNoteForm from '../components/EditNoteForm'
import { NotesContext } from "../views/Notes"

function Note(props) {
    const { notes, setNotes } = useContext(NotesContext)
    const [editForm, setEditForm] = useState(false)
    function MoveToBin() {
        fetch(`http://localhost/api/notes/default/delete/${props.note._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                setNotes(notes.filter((note) => {
                    return note._id !== props.note._id
                }))
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    function DeleteNote() {
        fetch(`http://localhost/api/notes/bin/delete/${props.note._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                setNotes(notes.filter((note) => {
                    return note._id !== props.note._id
                }))
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    function CheckNote() {
        fetch(`http://localhost/api/notes/default/check/${props.note._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                setNotes(notes.map((note) => {
                    return note._id === props.note._id ? { ...props.note, checked: true } : note
                }))
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    function UnCheckNote() {
        fetch(`http://localhost/api/notes/default/uncheck/${props.note._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                setNotes(notes.map((note) => {
                    return note._id === props.note._id ? { ...props.note, checked: false } : note
                }))
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    function RestoreNote() {
        fetch(`http://localhost/api/notes/bin/restore/${props.note._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                setNotes(notes.filter((note) => {
                    return note._id !== props.note._id
                }))
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    return (
        <>
            {editForm && <EditNoteForm note={props.note} setEditForm={setEditForm} title={props.note.title} text={props.note.text} />}
            {!editForm &&
                <li className={props.note.checked === true ? "tarjeta checked" : "tarjeta"}>
                    <div className="flex">
                        <h4 className="tarjeta-titulo">{props.note.title}</h4>
                        <div className="tarjeta-iconos">
                            {window.location.pathname === "/notas" &&
                                <>
                                    {props.note.checked === false &&
                                        <button onClick={() => CheckNote()} title="Marcar nota como terminada">
                                            Marcar nota como terminada
                                            <i className="bi bi-check-square"></i>
                                        </button>
                                    }
                                    {props.note.checked === true &&
                                        <button onClick={() => UnCheckNote()} title="Marcar como pendiente">
                                            Marcar como pendiente
                                            <i className="bi bi-check-square-fill"></i>
                                        </button>
                                    }
                                    {props.note.checked === false &&
                                        <button onClick={() => setEditForm(true)} title="Editar nota">
                                            Editar nota
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                    }
                                    <button title="Eliminar nota">
                                        Eliminar nota
                                        <i onClick={() => MoveToBin()} className="bi bi-x-circle-fill">
                                        </i>
                                    </button>
                                </>
                            }
                            {window.location.pathname === "/papelera" &&
                                <>
                                    <button title="Restaurar nota">
                                        Restaurar nota
                                        <i onClick={() => RestoreNote()} className="bi bi-arrow-clockwise">
                                        </i>
                                    </button>
                                    <button title="Eliminar nota">
                                        Eliminar nota
                                        <i onClick={() => DeleteNote()} className="bi bi-x-circle-fill">
                                        </i>
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                    <p>{props.note.text}</p>
                </li>}
        </>
    )
}

export default Note