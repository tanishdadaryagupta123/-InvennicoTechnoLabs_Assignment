import React, { useState, useEffect } from 'react'
import { FETCH_API_URL } from '../component/api.js'
import './App.css'

function App() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    fetch(FETCH_API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        return response.json()
      })
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])


  return (
    <>
      <div className="container">
        <h1>Store Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
              <div className="product-footer">
                <span className="price">${product.price}</span>
                <span className="rating"> {product.rating.rate} ({product.rating.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
