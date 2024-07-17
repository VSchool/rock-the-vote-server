import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import Comments from "./Comments"
export default function Issue(props) {


  const { title, description, imgUrl, userId, username, _id, upvotes, downvotes } = props
  const { user, handleUpvote, handleDownvote, deleteIssue, editIssue } = useContext(UserContext)

  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({ title, description, imgUrl })

  let isUser = userId === user._id

  const handleToggle = () => setIsEditing(!isEditing)

  const handleChange = () => {
    const { name, value } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editIssue(_id, formData)
  }

  return (
    <>
      <div>
        <h1>{username}</h1>
        <h1>{title}</h1>
        <h4>{description}</h4>
        <img src={imgUrl} style={{ height: "100px", width: "100px" }} />
        <button onClick={() => handleUpvote(_id)}>Upvote</button>
        <p>{upvotes.length}</p>
        <button onClick={() => handleDownvote(_id)}>Downvote</button>
        <p>{downvotes.length}</p>
      </div>

      {isUser && (
        <>
          <button onClick={handleToggle}>{isEditing ? 'Cancel' : 'Edit'}</button>
          <button onClick={() => deleteIssue(_id)}>Delete</button>
        </>
      )}
      {
        isEditing &&
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
          />
          <button>Edit</button>
        </form>
      }
      <Comments issueId = {_id}/>
    </>
  )
}