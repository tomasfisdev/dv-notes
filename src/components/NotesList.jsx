import { useContext } from "react"
import { NotesContext } from "../views/Notes"
import Note from './Note'


function NotesList(props) {
    const { notes } = useContext(NotesContext)
    return (
        <ul className="cont-notas-list">
                {notes.map(note => <Note key={note._id} note={note} />)}   
        </ul> 
    )
}

export default NotesList