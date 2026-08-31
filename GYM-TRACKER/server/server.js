import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get("/members", async (req, res) => {
    try{
const result = await db.query("SELECT * FROM members");

    res.json(result.rows)
} catch(error) {
    console.log(error)
    res.status(500).json({ error: "Database query failed" });
}
})

app.post("/members", async (req, res) => {
  try {
    const { name, phone, membership, joining, end_date , price} = req.body;

    const result = await db.query(
      `INSERT INTO members
       (name, phone, membership, joining, end_date , price)
       VALUES ($1, $2, $3, $4, $5 , $6)
       RETURNING *`,
      [name, phone, membership, joining, end_date, price]
    );

    const paymentResult = await db.query(
      `INSERT INTO payments 
      (member_id, paid_amount, membership_type)
      VALUES ($1,$2,$3)
      RETURNING *`, 
      [result.rows[0].id ,price, membership ]
      
    )

    console.log(paymentResult.rows[0]);


console.log("NEW MEMBER:", result.rows[0]);
console.log("NEW MEMBER ID:", result.rows[0].id);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add member" });
  }
});


app.put("/members/:id", async (req, res) => {
  const { id } = req.params;
  const { end_date } = req.body;

  try {
    const result = await db.query(
      "UPDATE members SET end_date = $1 WHERE id = $2 RETURNING *",
      [end_date, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/members/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM payments WHERE member_id = $1", [id]);

    const result = await db.query(
      "DELETE FROM members WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete member" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



