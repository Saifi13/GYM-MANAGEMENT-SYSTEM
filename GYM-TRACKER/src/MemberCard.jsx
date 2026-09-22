import React, { useState } from "react";

import "./style.css";





const API_URL =

  "https://gym-management-system-production-2248.up.railway.app";



function MemberCard(props){



    const [clicked , setIsClicked] = useState(false)

 const[new_endDate , setNew_endDate] = useState("")





async function handleDelete() {

  await fetch(`${API_URL}/members/${props.id}`, {

    method: "DELETE",

  });



  props.onDelete(props.id);

}



async function handleRenew() {

  if (!new_endDate) return;



  const response = await fetch(`${API_URL}/members/${props.id}`, {

    method: "PUT",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify({ end_date: new_endDate }),

  });



  if (!response.ok) {

    throw new Error(`Renewal failed: ${response.status}`);

  }



  props.onRenew(props.id, new_endDate);

  setIsClicked(false);

  setNew_endDate("");

}



  function getStatus(end_date) {

    const today = new Date().toISOString().split("T")[0];

    return formatDate(end_date) >= today ? "Active" : "Deactive";

  }





function formatDate(date) {

    return date ? date.split("T")[0] : "";

}



   return (
    <div className="member-card">
      <h3>{props.name}</h3>

      <div className="member-details">
        <p>
          <span>Membership</span>
          <strong>{props.membership}</strong>
        </p>

        <p>
          <span>Joining Date</span>
          <strong>{formatDate(props.joining)}</strong>
        </p>

        <p>
          <span>Yearly</span>
          <strong>{formatDate(props.end_date)}</strong>
        </p>

        <p className={`member-status ${getStatus(props.end_date).toLowerCase()}`}>
          <span>Status</span>
          <strong>{getStatus(props.end_date)}</strong>
        </p>
      </div>

      {clicked ? (
        <div className="renew-section">
          <input
            type="date"
            value={new_endDate}
            onChange={(event) => setNew_endDate(event.target.value)}
          />
          <button className="save-button" onClick={handleRenew}>
            Save Renewal
          </button>
        </div>
      ) : (
        <div className="member-actions">
          <button
            className="renew-button"
            onClick={() => setIsClicked(true)}
          >
            Renew
          </button>

          <button className="delete-button" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="delete-icon"
            >
              <path
                fill="currentColor"
                d="M13 3a1 1 0 0 0-1 1H6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2h-6a1 1 0 0 0-1-1h-4zM6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

}



export default MemberCard;
