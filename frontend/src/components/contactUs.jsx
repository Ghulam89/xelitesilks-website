import React from 'react'

export default function ContactUs({ children }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2023 hpme</p>
      </footer>
    </div>
  )
}