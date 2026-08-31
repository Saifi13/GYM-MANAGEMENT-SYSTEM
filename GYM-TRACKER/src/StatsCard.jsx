import "./style.css";


function StatsCard(props){


   return <div className = "stats-card">
      <h3>{props.title}</h3>
      <p>{props.value}</p>
    </div>
}

export default StatsCard;