import { useEffect, useState } from "react";

type UserType = {
    avatar_url: string;
    login: string;
    location: string;
    name: string;
    id: string;
    type: string;
    followers: number;
    following: number;
    public_repos: number;
   };

const Profile = ({user}: {user: UserType}) => {

    const [repos, setRepos] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    let error = {
        status: false,
        message: null,
    }

    useEffect(() => {
        let ignore = false;
        setLoading(true)
        fetch(`https://api.github.com/users/${user.login}/repos`)
            .then((res) => {
                if(!res.ok) { throw new Error(`${res.status}`) } else return res.json()
            }).catch(err => error = { status: true, message: err.message })
            .then((data) => { 
                if(!ignore) {
                    setRepos(data)
                    setLoading(false)
                }
            }).catch((err) => error = { status: true, message: err.message });

        return () => {
            ignore = true;
        }
    }, [])

    if(error.status) {
        return <h2>{error.message}</h2>
    }

    if(loading) {
        return <h2>Loading Repositories...</h2>
    }

  return (
    <section className='w-[80%] max-w-[800px] mt-2'>
        <header className='flex flex-row justify-between'>
            <div>
                <div className="flex flex-row gap-2 items-center">
                    <img src={user.avatar_url} alt="User Avatar" className='rounded-full' width='50px' height='50px' />
                    <h1 className='text-3xl font-bold'>Welcome <span className='text-cyan-500'>{user.name}</span>!</h1>
                </div>
            </div>
        </header>
        
        <div>
            <div className='flex flex-row flex-wrap gap-3 justify-center my-2'>
                {repos.map((data: any) => (
                    <div key={data.id} className="btn">
                        <a key={data.id} href={data.html_url} target='_blank'>{data.name}</a>
                    </div>
                ))}
                
            </div>
        </div>
    </section>
  )
}

export default Profile