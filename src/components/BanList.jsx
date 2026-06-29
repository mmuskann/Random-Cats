function BanList({ banList, removeFromBanList }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      <h3>Select an attribute in your listing to ban it</h3>

      {banList.length === 0 && <p>No banned attributes yet.</p>}

      <div className="ban-items">
        {banList.map((item) => (
          <button key={item} onClick={() => removeFromBanList(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BanList