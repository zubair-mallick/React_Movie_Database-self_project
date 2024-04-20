import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AnimatedCursor from 'react-animated-cursor'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
  <AnimatedCursor
        innerScale={2}
        innerStyle={{
          zIndex:99,
          backgroundColor: 'red',
          mixBlendMode: 'difference', 
          filter:'opacity(0.9)'
        }}
        outerStyle={{
          zIndex:99,
           
          backgroundColor: 'white',
          mixBlendMode: 'difference', // Box shadow for outer cursor
        }}
        innerSize={18} // Smaller inner cursor
        outerSize={5} // Larger outer cursor
        outerAlpha={0.8} // Transparency of outer cursor
      />
    <App />
  </BrowserRouter>
 
)
