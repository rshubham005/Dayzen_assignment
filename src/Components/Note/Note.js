import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Note.css";
import { useSelector } from "react-redux";
const Note = () => {
  let { id } = useParams();
  const [notes_list, set_notes_list] = useState(
    useSelector((state) => state.NoteReducer)
  );
  const [note, set_note] = useState({});
  useEffect(() => {
    notes_list.map((item) => {
      if (item.id == id) {
        set_note({ ...item });
      }
    });
  }, []);

  return (
    <>
      <div className="main">
        <div className="notes_body p-5 container">
          <div className="title_head d-flex justify-content-end w-100">
            <button
              //   onClick={() => {
              //     nevigate("/addnote");
              //   }}
              className="page_btn"
            >
              Save
            </button>
          </div>
          <div className="note_content">
            <p className="notes_title">{note.title}</p>
            {note?.body?.map((item, index) => {
              return (
                <div
                  className="notes_content"
                  dangerouslySetInnerHTML={{ __html: item }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Note;
