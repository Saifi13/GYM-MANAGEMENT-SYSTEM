
import "./style.css";


import {useState} from "react"

function AddMember(props){


const [formData , setFormData] = useState({
  name: "",
  phone: "",
  membership:"",
  joining:"",
  end_date:"",
  price:""
})

function handleCheck(event){

setFormData({
  ...formData,
  [event.target.name]: event.target.value
})
}

async function handleClick(event){
event.preventDefault();
console.log(formData)

 const response = await fetch("http://localhost:3000/members", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",

          'Accept': 'application/json'
      },
      body: JSON.stringify(formData) // Converts JavaScript object to JSON string

    });
    if (!response.ok) {
  throw new Error("Failed to add member");
}

const newMember = await response.json();
props.onMemberAdded(newMember);


}
   return (
    <form className="form" onSubmit = {handleClick}>
      <h2>Add New Member</h2>

      <label>Name</label>
      <input name = "name" onChange = {handleCheck} type="text" />

      <label>Phone</label>
      <input name="phone" onChange = {handleCheck} type="text" />

      <label>Membership</label>
      <input name="membership" onChange = {handleCheck} type="text" />

      
      <label>Joining Date</label>
      <input name="joining" onChange = {handleCheck} type="date" />


 
      <label>End Date</label>
      <input name="end_date" onChange = {handleCheck} type="date" />

     <label>price</label>
     
<input
  name="price"
  onChange={handleCheck}
  value={formData.price}
  type="number"
/>

      <button type="submit" >Add Member</button>
    </form>
  );
}


export default AddMember;