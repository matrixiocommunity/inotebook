import React, { useEffect, useState, useRef } from 'react'
import { useContext } from 'react';
import notecontext from '../context/notes/notecontext';
import Noteitem from './noteitem';
const Notes = (props) => {
  //? Contexts
  const { notes, addnote, getnotes, editnote, deletenote } = useContext(notecontext);

  //? refs
  const launchdemo = useRef(null);
  const launchAddNote = useRef(null);

  //? Variables
  let { md, tgst, searchText } = props;
  const token = JSON.parse(localStorage.getItem('token'));

  //? States
  const [loading, setloading] = useState(false);
  const [note, setNote] = useState({ title: "", discription: "", tag: "default" });
  const [note1, setNote1] = useState({ id: "", etitle: "", ediscription: "", etag: "default" });

  //? Functions
  const handlechange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleonchange = (e) => {
    e.preventDefault();
    setNote1({ ...note1, [e.target.name]: e.target.value })
  }
  const handleclick = async (e) => {
    e.preventDefault();
    setloading(true);
    await addnote(note.title, note.discription, note.tag, token);
    //  window.location.reload();
    await getnotes(token);
    setloading(false);
    setNote({ title: "", discription: "", tag: "default" });
  }
  const updatenote = (currnote) => {
    launchdemo.current.click();
    setNote1({ id: currnote._id, etitle: currnote.title, ediscription: currnote.discription, etag: currnote.tag });
  }
  const updatenewnote = async () => {
    setloading(true);
    launchdemo.current.click();
    await editnote(note1.id, note1.etitle, note1.ediscription, note1.etag, token);
    await getnotes(token);
    setloading(false);
  }

  //? useEffects
  useEffect(() => {
    setloading(true);
    getnotes(token);
    setloading(false);
  }, [])


  return (
    <div>
      <button type="button" className="btn btn-primary" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal" ref={launchdemo}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="etitle" id="etitle" placeholder="Physics notes eg." value={note1.etitle} onChange={handleonchange} minLength={5} required />
                <label htmlFor="floatingInput" style={{ color: "black" }}>Title</label>
              </div>
              <div className="form-floating">
                <input type="text" className="form-control" name="ediscription" id="ediscription" placeholder="atom is a smallest unit of any substance....." value={note1.ediscription} onChange={handleonchange} minLength={5} required />
                <label htmlFor="floatingPassword" style={{ color: "black" }}>discription</label>
              </div>
              <div className="form-floating my-3">
                <input type="text" className="form-control" name="etag" id="etag" placeholder="Nuclear etc." value={note1.etag} onChange={handleonchange} />
                <label htmlFor="floatingPassword" style={{ color: "black" }}>Tag</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note1.etitle <= 5 || note1.ediscription.length <= 5} className="btn btn-primary" onClick={updatenewnote}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="addNoteModal" aria-labelledby="addNoteLableLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="my-3 modal-title" id="addNoteLabelLabel" style={tgst}>Add New Note</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" name="title" id="title" value={note.title} onChange={handlechange} minLength={5} required />
                <label htmlFor="floatingInput" style={{ color: "black" }}>Title</label>
              </div>
              <div className="form-floating">
                <input type="text" className="form-control" name="discription" id="discription" value={note.discription} onChange={handlechange} minLength={5} required />
                <label htmlFor="floatingPassword" style={{ color: "black" }}>Description</label>
              </div>
              <div className="form-floating my-3">
                <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={handlechange} />
                <label htmlFor="floatingPassword" style={{ color: "black" }}>Tag</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" disabled={note.title.length <= 5 || note.discription.length <= 5} className="btn btn-primary my-3" onClick={handleclick}>Add Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <h2 className="my-3" style={tgst}>Your Notes</h2>
          <button onClick={() => launchAddNote.current.click()} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNoteModal" ref={launchAddNote}>
            Create New Note
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
          className="row">
          {notes
            .filter((item) => {
              if (item.title.includes(searchText) || item.discription.includes(searchText) || item.tag.includes(searchText))
                return true
              else return false
            })
            .map((note) => {
              return <Noteitem key={note._id} note={note} deletenote={deletenote} getnotes={getnotes} updatenote={updatenote} tgst={tgst} md={md} />
            })}

        </div>
      </div>
    </div>
  )
}

export default Notes
