import { useState, useContext } from "react"
import { NotesContext } from "../views/Notes"
function EditNoteForm(props) {
    const { notes, setNotes } = useContext(NotesContext)
    const [title, setTitle] = useState(props.note.title)
    const [text, setText] = useState(props.note.text)
    function EditNote(e) {
        e.preventDefault()
        fetch(`http://localhost/api/notes/default/edit/${props.note._id}`,
            {
                method: 'PATCH',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title, text
                })
            })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                console.log(data)
                setNotes(notes.map((note) => {
                    return note._id === props.note._id ? { ...props.note, title, text } : note
                }))
            })
            .catch(function (err) {
                console.log(err)
            })
        props.setEditForm(false)
    }
    return (
        <form onSubmit={(e) => EditNote(e)} id="edit-note-form" className="tarjeta">
            <div className="cont-inputs">
                <label className="no-label" htmlFor="titulo-nota">Título</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus name="title" type="text" id="titulo-nota" placeholder="Título" required />
                <label className="no-label" htmlFor="texto-nota">Texto</label>
                <input value={text} onChange={(e) => setText(e.target.value)} name="text" type="text" id="texto-nota" placeholder="Nota" required />
            </div>
            <div className="form-btns">
                <button title="Editar nota" type="submit">
                    Editar nota
                    <i className="bi bi-check-circle-fill"></i>
                </button>
                <button onClick={() => props.setEditForm(false)}>
                    Cancelar
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </form>
    )
}

export default EditNoteForm