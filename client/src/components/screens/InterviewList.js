import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const pad2 = (n) => String(n).padStart(2, "0");
const calTime = (stime) => {
  const hr = Math.floor(stime / 100);
  const min = stime % 100;
  return `${pad2(hr)}:${pad2(min)}`;
};

const InterviewList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/allMeetings`);
        if (isMounted) setData(res.data.meetings || []);
      } catch (err) {
        console.error(" Failed to load meetings:", err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  return (
    <div>
      <h3>InterviewList</h3>
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-evenly",
          margin: "5px",
        }}
      >
        <div className="s4">
          <strong>Title</strong>
        </div>
        <div className="s4">
          <strong>Email 1</strong>
        </div>
        <div className="s4">
          <strong>Email 2</strong>
        </div>
        <div className="s4">
          <strong>Date</strong>
        </div>
        <div className="s4">
          <strong>Start</strong>
        </div>
        <div className="s4">
          <strong>End</strong>
        </div>
      </div>
      {data.map((item) => (
        <div
          key={item._id}
          onClick={() => navigate(`/edit/${item._id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            navigate(`/edit/${item._id}`)
          }
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-evenly",
            margin: "5px",
            backgroundColor: "lightgray",
            cursor: "pointer",
          }}
        >
          <div className="s4">{item.title}</div>
          <div className="s4">{item.user1?.email}</div>
          <div className="s4">{item.user2?.email}</div>
          <div className="s4">{item.date}</div>
          <div className="s4">{calTime(item.startTime)}</div>
          <div className="s4">{calTime(item.endTime)}</div>
        </div>
      ))}
    </div>
  );
};

export default InterviewList;
