import React, { useState, useEffect } from 'react'

function Logo() {
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    const getLogo = async () => {
      try {
        const response = await fetch('http://localhost:5000/logo.png')

        if (!response.ok) {
          throw new Error('Error: ' + response.status)
        }

        const data = await response.blob()
        setLogo(URL.createObjectURL(data))
      } catch (error) {
        console.error(error)
      }
    }

    getLogo()
  }, [])

  return (
    <div className='logo_container'>
      <img src={logo} className='logo' alt='logo' />
      <span className='logo_name'>ECO MAP</span>
    </div>
  )
}

export default Logo
