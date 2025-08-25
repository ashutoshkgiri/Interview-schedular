import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const pad2 = (n) => String(n).padStart(2, "0");

const toTimeInput = (stime) => {
  const hr = Math.floor(stime / 100);
  const min = stime % 100;
  return `${pad2(hr)}:${pad2(min)}`;
};

export default function Details(props) {
  const navigate = useNavigate();
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [title, setTitle] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [emails, setEmails] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (props.func === "edit") {
      (async () => {
        try {
          const res = await axios.get(`${API_URL}/meetingDetail/${props.meetingId}`);
          const data = res.data.meeting;
          setTitle(data.title || "");
          setEmail1(data.user1?.email || "");
          setEmail2(data.user2?.email || "");
          setDate(data.date || "");
          setStartTime(toTimeInput(data.startTime));
          setEndTime(toTimeInput(data.endTime));
        } catch (err) {
          console.error(err);
          M.toast({
            html: "Unable to load meeting",
            classes: "#d32f2f red darken-2",
          });
        }
      })();
    }
  }, [props.func, props.meetingId, API_URL]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(`${API_URL}/getEmails`);
        setEmails(res.data);
      } catch (err) {
        console.error(" Error fetching emails:", err);
      }
    };

    fetchEmails();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let path = `/${props.func}`;
      if (props.meetingId !== undefined) path += `/${props.meetingId}`;

      const res = await axios.post(`${API_URL}${path}`, {
        title,
        date,
        startTime,
        endTime,
        email1,
        email2,
      });

      if (res.data.error) {
        M.toast({ html: res.data.error, classes: "#d32f2f red darken-2" });
        return;
      }

      M.toast({ html: "Saved successfully", classes: "#43a047 green darken-1" });
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response) {
        M.toast({
          html: err.response.data.error || "Save failed",
          classes: "#d32f2f red darken-2",
        });
      } else {
        M.toast({ html: "Network error", classes: "#d32f2f red darken-2" });
      }
    }
  };

  return (
    <div>
      <h3>Fill form</h3>
      <div
        className="row"
        style={{ width: 500, padding: "20px", border: "1px solid lightgray" }}
      >
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Meeting Title"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <select
                id="email1"
                className="browser-default"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select User 1 Email
                </option>
                {emails.map((u, i) => (
                  <option key={i} value={u.email}>
                    {u.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-field col s6">
              <select
                id="email2"
                className="browser-default"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select User 2 Email
                </option>
                {emails.map((u, i) => (
                  <option key={i} value={u.email}>
                    {u.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                name="date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="start-time" style={{ display: "block" }}>
                {startTime === "" ? "Start time" : ""}
              </label>
              <input
                id="start-time"
                type="time"
                name="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="input-field col s6">
              <label htmlFor="end-time" style={{ display: "block" }}>
                {endTime === "" ? "End time" : ""}
              </label>
              <input
                id="end-time"
                type="time"
                name="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn">
            Save
          </button>

          <p style={{ marginTop: "1rem" }}>
            Don’t see an email?{" "}
            <a href="/add-user" style={{ color: "blue" }}>
              Add a new user
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
