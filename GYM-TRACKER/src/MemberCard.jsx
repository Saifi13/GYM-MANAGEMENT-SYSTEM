import "./style.css";
import { useState } from "react";


function MemberCard(props){

    const [clicked , setIsClicked] = useState(false)
 const[new_endDate , setNew_endDate] = useState("")


async function handleDelete() {
    await fetch(`http://localhost:3000/members/${props.id}` , {
        method:"delete"
    })
    props.onDelete(props.id)
}

async function handleRenew() {
  const url = `http://localhost:3000/members/${props.id}`;
  
  const payload = {
   end_date: new_endDate
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Fetch only rejects on network failure; manually check HTTP status
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    props.onRenew(props.id, new_endDate);
    setIsClicked(false);
    setNew_endDate("");
  } catch (error) {
    console.error("Error:", error);
  }

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

      <button className="delete-button" onClick={handleDelete}>Delete</button>

    </div>
}

export default MemberCard;