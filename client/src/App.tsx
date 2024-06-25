import { useState, useEffect } from 'react'
import Profile from './components/Profile';
import Button from './components/Button';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code')

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('githubAuth')
    let ignore = false;

    if (token) {
      setLoading(true)
      fetch('https://api.github.com/user', {
          headers: { Authorization: token },
        })
        .then((res) => res.json())
        .then((data) => {
          if(!ignore)
            {
              setProfile(data)
              setLoading(false)
            }
        })
        .catch(err => {
          localStorage.removeItem("githubAuth")
          return err.message
        })

        return () => { ignore = true; }
    } else if (code) {
        setLoading(true) // Loading is true while our app is fetching
        fetch(`http://localhost:8080/api/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if(!ignore) {
            setProfile(data.userData)
            localStorage.setItem("githubAuth", data.token)
            setLoading(false)
          }
        })

        return () => { ignore = true; }
    }
  }, [code])

  function oAuthGitHub() {
    const clientId = 'Ov23liz8ELZnYVh3PXgu'
    const redirectURI = 'http://localhost:3000/'
    const ghScope = 'read:user'
    const oAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${ghScope}`

    window.location.href = oAuthURL
  }

  function oAuthReset() {
    setProfile(null)
    localStorage.removeItem('githubAuth')
  }

  // Creating object to hold information for 'RESET' Button component
  let resetBtn = {
    label: "Unlink GitHub",
    handleClick: () => oAuthReset,
    extraClass: "bg-red-500 active:bg-red-800 hover:ring-red-400 focus:ring-red-400 ms-3",
  }

  // Creating object to hold information for 'GitHub Login' Button component
  let ghBtn = {
    // Mixed arrays with strings and JSX elements to allow for passing of HTML
    label: ["Log In With", <img key={crypto.randomUUID()} src='github.svg' className='px-2' /> ,"Github"],
    handleClick: () => oAuthGitHub
  }

  if(loading) {
    return <h2>Loading Content... Please Wait.</h2>
  }

  if(profile) {
    return <><Button {...resetBtn} /><Profile user={profile} /></>
  }

  return <Button {...ghBtn} />
}

export default App
