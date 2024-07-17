import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"



function Comments({ issueId }) {

    const [formData, setFormData] = useState({
        comment: ""
    })

    const { addComment, comments, user, deleteComment } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    console.log(comments)

    const handleSubmit = (e) => {
        e.preventDefault()
        addComment(formData, issueId)
        setFormData({
            comment: ""
        })
    }

    const filteredComments = comments.filter(comment => comment.issueId === issueId)

    const commentElements = filteredComments.map(comment => {
        return (
            <div key={comment._id}>
                <h3>{comment.username} says:</h3>
                <p>{comment.comment}</p>
                {comment.userId === user._id && (
                    <button onClick={() => deleteComment(comment._id)}>Delete</button>
                )}
            </div>
        )
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Add a comment..."
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                />
                <button>Comment</button>
            </form>
            <div>
                {commentElements}
            </div>
        </div>
    )
}

export default Comments