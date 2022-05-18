import Header from '../components/Header'
import NoNotes from '../components/NoNotes'
import NotesList from '../components/NotesList'
import NoteForm from '../components/NoteForm'
import { useState, useEffect, createContext } from 'react'

export const NotesContext = createContext();

function Notes(props) {
  const [noteForm, setNoteForm] = useState(false)
  const [notes, setNotes] = useState([])
  const sectionTitle = props.title
  const status = props.status
  useEffect(() => {
    function getNotes() {
      fetch(`http://localhost/api/notes/${status}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token'),
          "uid":JSON.parse(localStorage.getItem('user'))._id
        },
      })
        .then(function (res) {
          return res.json()
        })
        .then(function (data) {
          setNotes(data.notes)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    getNotes()
  }, [status])

  useEffect(() => {
    document.title = sectionTitle
  }, [sectionTitle])

  return (
    <NotesContext.Provider value={{ setNoteForm, notes, setNotes, status, sectionTitle }}>
      <Header />
      {noteForm && <NoteForm />}
      <div className="cont-notas">
        <NotesList />
        {notes.length === 0 && <NoNotes />}
      </div>
    </NotesContext.Provider>
  )
}

export default Notes