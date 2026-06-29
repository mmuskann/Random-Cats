import { useState } from 'react'
import './App.css'
import CatCard from './components/CatCard'
import BanList from './components/BanList'

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
const API_URL = 'https://api.thecatapi.com/v1'

function App() {
  const [cat, setCat] = useState(null)
  const [banList, setBanList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getAttributes = (breed) => {
    if (
      !breed?.name ||
      !breed?.origin ||
      !breed?.life_span ||
      !breed?.weight?.imperial
    ) {
      return null
    }

    return {
      breed: breed.name,
      origin: breed.origin,
      lifeSpan: `${breed.life_span} years`,
      weight: `${breed.weight.imperial} lbs`,
    }
  }

  const isBanned = (attributes) => {
    return Object.values(attributes).some((value) => banList.includes(value))
  }

  const getRandomBreed = (breeds) => {
    const randomIndex = Math.floor(Math.random() * breeds.length)
    return breeds[randomIndex]
  }

  const discoverCat = async () => {
    setLoading(true)
    setError('')

    try {
      const breedResponse = await fetch(
        `${API_URL}/breeds?api_key=${ACCESS_KEY}`
      )

      const breeds = await breedResponse.json()

      const availableBreeds = breeds.filter((breed) => {
        const attributes = getAttributes(breed)

        if (!attributes) {
          return false
        }

        return !isBanned(attributes)
      })

      if (availableBreeds.length === 0) {
        setError('No cat found. Try removing something from your ban list.')
        return
      }

      const randomBreed = getRandomBreed(availableBreeds)

      const imageResponse = await fetch(
        `${API_URL}/images/search?breed_ids=${randomBreed.id}&api_key=${ACCESS_KEY}`
      )

      const imageData = await imageResponse.json()
      const imageUrl = imageData[0]?.url

      if (!imageUrl) {
        setError('No image found for this cat. Try again.')
        return
      }

      setCat({
        url: imageUrl,
        breeds: [randomBreed],
      })
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching a cat.')
    } finally {
      setLoading(false)
    }
  }

  const addToBanList = (value) => {
    if (!banList.includes(value)) {
      setBanList([...banList, value])
    }
  }

  const removeFromBanList = (value) => {
    setBanList(banList.filter((item) => item !== value))
  }

  const attributes = cat ? getAttributes(cat.breeds[0]) : null

  return (
    <div className="app">
      <div className="main-section">
        <h1>Random Cats</h1>
        <h2>Are you a cat lover? Let's see some cats!</h2>

        {error && <p className="error">{error}</p>}

        {cat && attributes && (
          <CatCard
            cat={cat}
            attributes={attributes}
            addToBanList={addToBanList}
          />
        )}

        <button onClick={discoverCat} disabled={loading}>
          {loading ? 'Loading...' : 'Discover!'}
        </button>
      </div>

      <BanList banList={banList} removeFromBanList={removeFromBanList} />
    </div>
  )
}

export default App