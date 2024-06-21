import React, {useState} from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function LikePoke() {

const [like, setLike] = useState(false);

const toggle = () => {
    setLike((check) => !check)
}

  return (
    <button onClick={toggle}>
        {like ? <FaHeart style={{color : "skyblue"}}/> : <FaRegHeart/>}
    </button>
  )
}

export default LikePoke