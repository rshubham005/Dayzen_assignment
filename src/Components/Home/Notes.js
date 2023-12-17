import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import "./Notes.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Notes = () => {
  const [notes_data, set_notes_data] = useState(
    useSelector((state) => state.NoteReducer)
  );
  console.log("Notes Data", notes_data)
  const nevigate = useNavigate();
  return (
    <>
      <div className="main">
        <div className="notes_body p-5 container">
          <div className="title_head d-flex justify-content-between w-100">
            <h3 className="page_title">Notes</h3>
            <button
              onClick={() => {
                nevigate("/addnote");
              }}
              className="page_btn"
            >
              <GoPlus /> New
            </button>
          </div>
          <div className="notes_block">
            {notes_data?.map((item, index) => {
              return (
                <div
                  className="note"
                  key={index}
                  onClick={() => {
                    nevigate(`/note/${index + 1}`);
                  }}
                >
                  <p className="notes_title">
                    {item.title.length > 45
                      ? item.title.substring(0, 45)
                      : item.title}
                    ...
                  </p>
                  <p className="notes_body">
                    {item.body.length > 0 && item.body[0].length > 95
                      ? item.body[0].substring(0, 95)
                      : item.body[0]}
                    ...
                  </p>
                  <p className="notes_date">{item.time}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Notes;
