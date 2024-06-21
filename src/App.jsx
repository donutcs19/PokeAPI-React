import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading'

//components
import FavPoke from './components/FavPoke'

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try{
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`,{
          signal:abortController.signal
        });

        setPoke(response.data)
        setError("");
      }catch(error){
        setError("[Error] -> ",error);
      }finally{
        setLoading(false);
      }
    }

    loadPoke();
    
    return () => abortController.abort();
  }, [number])

console.log(poke);

const prevPoke = () => {
setNumber((number) => number - 1)
}

const nextPoke = () => {
setNumber((number) => number + 1)
}

const addFav = () => {
  setFav((oldState) => [...oldState, poke])
}

console.log("your fav : ", fav);
  return (
    <>


<div className='max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
    <div>
      {loading ? <ReactLoading type='spin' color='white' height={'20%'} width={'20%'}/> :
      <>
      <h1>{poke?.name} </h1>
   
   <button onClick={addFav}>Add to favorite</button>
   
   <h2>ID : {number}</h2>
   
   <img src={poke?.sprites?.other?.home?.front_default} alt="" />
   
   <button onClick={prevPoke}>Previus Poke</button>
   <button onClick={nextPoke}>Next Poke</button>
      </>
      }
    
  </div>

  <div>
  <h2>Your favorite Pokemon</h2>
  {fav.length > 0 ? <FavPoke fav={fav}/> : <div className='flex h-full justify-center items-center'><p>No favorite Pokemon...</p></div> }
      
     </div>
</div>
</div>
     
    </>
  )
}

export default App
