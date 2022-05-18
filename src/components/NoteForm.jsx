import { useContext } from "react"
import { useState } from "react"
import { NotesContext } from "../views/Notes"

function NoteForm(props) {
    const { notes, setNoteForm, setNotes } = useContext(NotesContext)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    function CreateNote(e) {
        e.preventDefault()
        fetch(`http://localhost/api/notes`,
            {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'uid':JSON.parse(localStorage.getItem('user'))._id
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
                const note = data.newNote
                //retorna el objeto creado
                setNotes([...notes, note])
            })
            .catch(function (err) {
                console.log(err)
            })
        setNoteForm(false)
    }
    return (
        <div className="form-nota-modal">
            <div onClick={() => setNoteForm(false)} className="form-nota-modal-bg"></div>
            <form onSubmit={(e) => CreateNote(e)} className="tarjeta form-nota">
                <label className="no-label" htmlFor="titulo-nota">Título</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" id="titulo-nota" placeholder="Título" required />
                <label className="no-label" htmlFor="texto-nota">Texto</label>
                <input value={text} onChange={(e) => setText(e.target.value)} name="text" type="text" id="texto-nota" placeholder="Nota" required />
                {/* <p className="error">Debés escribir todos los campos...</p> */}
                <button type="submit" className="btn">+</button>
            </form>
        </div>
    )
}

export default NoteForm