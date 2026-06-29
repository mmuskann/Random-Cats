function CatCard({ cat, attributes, addToBanList }) {
  return (
    <div className="cat-card">
      <h2>{attributes.breed}</h2>

      <div className="attributes">
        <button onClick={() => addToBanList(attributes.breed)}>
          Breed: {attributes.breed}
        </button>

        <button onClick={() => addToBanList(attributes.origin)}>
          Origin: {attributes.origin}
        </button>

        <button onClick={() => addToBanList(attributes.lifeSpan)}>
          Life Span: {attributes.lifeSpan}
        </button>

        <button onClick={() => addToBanList(attributes.weight)}>
          Weight: {attributes.weight}
        </button>
      </div>

      <img src={cat.url} alt={attributes.breed} className="cat-img" />
    </div>
  )
}

export default CatCard