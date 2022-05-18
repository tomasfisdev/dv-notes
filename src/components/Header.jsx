import { useContext } from "react"
import { NotesContext } from "../views/Notes"

function Header(props) {
    const { setNoteForm, notes, status, sectionTitle } = useContext(NotesContext)
    return (
        <header className="flex">
            <div className="flex">
                <h2>{sectionTitle}</h2>
                <span>{notes.length}</span>
            </div>
            {status === 'default' && <button onClick={() => setNoteForm(true)} className="btn">Crear nota</button>}
        </header>
    )
}

export default Header