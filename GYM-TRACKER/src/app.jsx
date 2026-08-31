import DashBoard from "./dashboard";
import StatsCard from "./StatsCard";
import MemberCard from "./MemberCard";
import {useState, useEffect} from "react"
import AddMember from "./AddMember.jsx";

function App() {




const [members, setMembers] = useState([]);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("");
const [showAddMember, setShowAddMember] = useState(false);

  const todayy = new Date().toISOString().split("T")[0];

const isMembersActive = (member) => {
  const endDate = member.end_date?.split("T")[0];
  return endDate >= todayy;
}

const filteredMembers = members.filter((member) => {
  const matchSearch =
    !search ||
    member.name?.toLowerCase().includes(search.toLowerCase());

  const statusValue = isMembersActive(member) ? "activate" : "deactivate";
  const matchFilter = !filter || statusValue === filter;

  return matchSearch && matchFilter;
});

useEffect(() => {
  fetch("http://localhost:3000/members")
    .then((response) => response.json())
    .then((data) => setMembers(data))
    .catch((error) => console.error(error));
}, []);

function handleMemberAdded(newMember) {
  setMembers((currentMember) => [...currentMember, newMember]);
  setShowAddMember(false);
}

function deleteMember(id) {
  fetch(`http://localhost:3000/members/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setMembers((currentMember) =>
        currentMember.filter((member) => member.id !== id)
      );
    })
    .catch((error) => console.error("Delete failed:", error));
}

function RenewMember(id, newEndDate) {
  fetch(`http://localhost:3000/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ end_date: newEndDate }),
  })
    .then(() => {
      setMembers((currentMembers) =>
        currentMembers.map((member) =>
          member.id === id ? { ...member, end_date: newEndDate } : member
        )
      );
    })
    .catch((error) => console.error("Renew failed:", error));
}

const today = new Date().toISOString().split("T")[0];

const totalMembers = members.length;

const activeMembers = members.filter((member) => {
  const endDate = member.end_date?.split("T")[0];
  return endDate >= today;
}).length;

const expiredMembers = totalMembers - activeMembers;

const totalCollection = members.reduce(
  (total, member) => total + Number(member.price || 0),
  0
);

const liveStats = [
  { title: "Total Members", value: totalMembers },
  { title: "Active Members", value: activeMembers },
  { title: "Expired Members", value: expiredMembers },
  { title: "Total Collection", value: `₹${totalCollection.toLocaleString("en-IN")}` },
];

return (
  <>
    <DashBoard />

    {liveStats.map((stat, index) => (
      <StatsCard key={index} title={stat.title} value={stat.value} />
    ))}

    <div className="content-area">
      <div className="toolbar">
        <div className="search-box">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            placeholder="Search members..."
          />
        </div>

        <div className="filter-box">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="">All Members</option>
            <option value="activate">Active</option>
            <option value="deactivate">Deactivate</option>
          </select>
        </div>

        <button
          type="button"
          className="add-member-btn"
          onClick={() => setShowAddMember(true)}
        >
          + Add Member
        </button>
      </div>

      <div className="members-container">
        <h1>recent members</h1>

        {filteredMembers.length === 0 ? (
          <div className="no-members">
            <p>No members found</p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              {...member}
              onDelete={deleteMember}
              onRenew={RenewMember}
            />
          ))
        )}
      </div>
    </div>

    {showAddMember && (
      <div className="modal-backdrop" onClick={() => setShowAddMember(false)}>
        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            className="close-btn"
            onClick={() => setShowAddMember(false)}
          >
            ×
          </button>

          <AddMember onMemberAdded={handleMemberAdded} />
        </div>
      </div>
    )}
  </>
);
}

export default App;



