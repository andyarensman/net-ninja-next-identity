import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Guides.module.css'
import AuthContext from '../stores/authContext'

export default function Guides() {
  const { user, authReady } = useContext(AuthContext)
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/guides', user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      })
        .then(res => {
          if (!res.ok) {
            throw Error('You must be logged in to view this content')
          }
          return res.json()
        })
        .then(data => {
          setGuides(data)
          setError(null)
        })
        .catch((err) => {
          setError(err.message)
          setGuides(null)
        })
    }
  }, [user,authReady])

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{ error }</p>
        </div>
      )}
      {guides && guides.map(guide => (
        <div key={guide.title} className={styles.card}>
          <h3>{ guide.title }</h3>
          <h4>Written by { guide.author }</h4>
          <p>Mentitum aute offendit eiusmod. Id ipsum sint cillum incididunt est est export sunt labore aliquip, quo ipsum labore ad doctrina, appellat ea laboris. In tempor incurreret singulis, hic qui quorum legam quis. Sint senserit ab praesentibus sed proident quorum export ut dolor.Eu aut eram velit tempor, aliquip cillum fugiat ne duis in quid doctrina id duis magna, ex quis ingeniis illustriora, admodum illum appellat nescius ne ubi o anim voluptate, eu e velit dolore culpa, labore cernantur admodum.</p>
        </div>
      ))}
    </div>
  )
}
