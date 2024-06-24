import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
export default function Issue(props){


    const {title, description, imgUrl, userId, username} = props
    const {user} = useContext(UserContext)
   
    console.log("userId: ", userId)
    console.log("user._id: ", user._id)

    let isUser = userId === user._id

        return(
        <>
        <div style = {{height: "200px", width: "200px", margin: "15px"}}>
            <h1>{username}</h1>
            <h1>{title}</h1>
            <h4>{description}</h4>
            <img src={imgUrl} style = {{height:"100px", width: "100px"}}/>
            </div>

          { isUser && (
            <>
            <button>Edit</button>
            <button>Delete</button>
            </> 
          ) }
        </>
    )
}