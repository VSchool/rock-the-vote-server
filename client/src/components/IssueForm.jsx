import { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider"


export default function IssueForm(){

    const {addIssue} = useContext(UserContext)

    const initState = {
        title: '',
        description: '',
        imgUrl: ''
    }

    const [formData, setFormData] = useState(initState)

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        addIssue(formData)
        setFormData(initState)
    }

    return(
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
            <button>Submit</button>
        </form>
    )
}