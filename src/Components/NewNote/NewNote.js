import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { AddNoteAction } from "../../Redux/Action/AddNoteAction";
import { useNavigate } from "react-router-dom";
import "./NewNote.css";

const NewNote = () => {
  const d = new Date();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const inputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "18px",
    letterSpacing: "0px",
    textAlign: "justified",
    color: "rgba(39, 39, 40, 1)",
    caretColor: "transparent", // Adjusting caret color for better visibility on white background
  };
  let previous_data = useSelector((state) => state.NoteReducer);
  const [form_data, set_form_data] = useState({
    id: previous_data.length + 1,
    title: "",
    body: [],
    time: `${d.getHours()}:${d.getMinutes()}  ${d.getDay()}/${d.getMonth()}`,
  });
  const [textBox, set_textBox] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSelectedImage(objectURL);
      let body_text = [...form_data.body];
      body_text.push(textBox);
      body_text.push(
        `<img src=${objectURL} style="max-width: 100%; max-height: 200px;" alt="Selected" />`
      );
      set_form_data({ ...form_data, body: body_text });
      set_textBox("");
    }
  };
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSelectedImage(objectURL);
      let body_text = [...form_data.body];
      body_text.push(textBox);
      body_text.push(
        `<audio controls >
        <source src=${objectURL} type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>`
      );
      set_form_data({ ...form_data, body: body_text });
      set_textBox("");
    }
  };
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSelectedImage(objectURL);
      let body_text = [...form_data.body];
      body_text.push(textBox);
      body_text.push(
        `<video controls width="460" height="240">
        <source src=${objectURL} type="video/mp4">
      Your browser does not support the video element.
      </video>`
      );
      set_form_data({ ...form_data, body: body_text });
      set_textBox("");
    }
  };
  const handleFormSubmit = () => {
    if (textBox == "") {
      dispatch(AddNoteAction(form_data));
      nevigate("/");
    } else {
      let bodySection = [...form_data.body];
      bodySection.push(textBox);
      set_form_data({ ...form_data, body: bodySection });
      set_textBox("");
      console.log(form_data);
      dispatch(AddNoteAction(form_data));
      nevigate("/");
    }
  };
  return (
    <div className="main">
      <div className="notes_body p-5 container">
        <div className="title_head d-flex justify-content-between w-100">
          <h3 className="icon">
            <FaArrowLeftLong />
          </h3>
          <button className="page_btn" onClick={() => handleFormSubmit()}>
            Save
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <input
              type="text"
              name="title"
              className="w-100 mb-3"
              placeholder="Title"
              value={form_data.title}
              onChange={(e) => {
                set_form_data({
                  ...form_data,
                  [e.target.name]: e.target.value,
                });
              }}
              style={{ ...inputStyle, fontSize: "18px" }}
            ></input>
            {form_data.body.map((item, index) => {
              return (
                <div
                  key={index}
                  className="body_input w-100"
                  style={{ ...inputStyle, fontSize: "14px" }}
                  dangerouslySetInnerHTML={{ __html: item }}
                ></div>
              );
            })}
            <textarea
              className="w-100 mb-3"
              placeholder="Start Typing"
              rows={10}
              value={textBox}
              onChange={(e) => {
                set_textBox(e.target.value);
              }}
              style={{ ...inputStyle, fontSize: "14px" }}
            ></textarea>
            <div className="media_icons">
              <label htmlFor="image_file">
                <IoImageOutline className="media_btn" />
              </label>
              <input
                type="file"
                id="image_file"
                name="avatar"
                className="d-none"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />

              <label htmlFor="video_file">
                <HiOutlineVideoCamera className="media_btn" />
              </label>
              <input
                type="file"
                id="video_file"
                // id="avatar"
                name="video"
                className="d-none"
                accept="video/mp4, video/mkv, video/avi"
                onChange={handleVideoChange}
              />

              <label htmlFor="audio_label">
                <HiOutlineMicrophone className="media_btn" />
              </label>
              <input
                type="file"
                id="audio_file"
                name="avatar"
                className="d-none"
                accept="audio/mp3, audio/wav, audio/Ogg"
                onChange={handleAudioChange}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewNote;
