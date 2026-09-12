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

        🗑️

      </button>



    </div>

}



export default MemberCard;