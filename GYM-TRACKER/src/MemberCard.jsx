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



   return <div className = "member-card">

    <h3>{props.name}</h3>

<p>{props.membership}</p>

<p>{formatDate(props.joining)}</p>

<p>{formatDate(props.end_date)}</p>

 <p>Status: {getStatus(props.end_date)}</p>



 {clicked ? (

        <>

          <input

            type="date"

            value={new_endDate}

            onChange={(event) => setNew_endDate(event.target.value)}

          />



          <button className="save-button" onClick={handleRenew}>Save Renewal</button>

        </>

      ) : (

        <button className="renew-button" onClick={() => setIsClicked(true)}>Renew</button>

      )}



      <button className="delete-button" onClick={handleDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" className="delete-icon">
          <path fill="currentColor" d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
        </svg>
        
      </button>



    </div>

}



export default MemberCard;