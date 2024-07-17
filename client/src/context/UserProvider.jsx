import React, { useState } from "react"
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    const [allIssues, setAllIssues] = useState([])

    const [comments, setComments] = useState([])

    async function signup(creds) {
        try {
            const res = await axios.post('/api/auth/signup', creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function login(creds) {
        try {
            const res = await axios.post('/api/auth/login', creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function logout() {
        try {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    token: "",
                    user: {}
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg
            }
        })
    }

    function resetAuthErr() {
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg: ""
            }
        })
    }

    async function getUserIssues() {
        try {
            const res = await userAxios.get('/api/main/issues/user')
            setUserState(prevState => {
                return {
                    ...prevState,
                    issues: res.data
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function addIssue(newIssue) {
        try {
            const res = await userAxios.post('/api/main/issues', newIssue)
            setUserState(prevState => {
                return {
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    //get all issues
    async function getAllIssues() {
        try {
            const res = await userAxios.get('/api/main/issues/allIssues')
            setAllIssues(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteIssue(id) {
        try {
            const res = await userAxios.delete(`/api/main/issues/${id}`)
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.filter(issue => issue._id !== id))
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: prevUserState.issues.filter(issue => issue._id !== id)
            }))
        } catch (err) {
            console.log(err)
        }
    }

    async function editIssue(id, update){
        try {
            const res = await userAxios.put(`/api/main/issues/edit/${id}`, update)
            setAllIssues(prevIssues => prevIssues.map(issue => issue._id !== id ? issue : res.data))
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: prevUserState.issues.map(issue => issue._id !== id ? issue : res.data)
            }))
        } catch (error) {
            console.log(error)
        }
    }

    async function handleUpvote(issueId) {
        try {
            const res = await userAxios.put(`/api/main/issues/upvotes/${issueId}`)
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function handleDownvote(issueId) {
        try {
            const res = await userAxios.put(`/api/main/issues/downvotes/${issueId}`)
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function getComments() {
        try {
            const res = await userAxios.get(`/api/main/comments/`)
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function addComment(newComment, issueId) {
        try {
            const res = await userAxios.post(`/api/main/comments/${issueId}`, newComment)
            setComments(prevComments => [...prevComments, res.data])
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteComment(commentId) {
        try {
            const res = await userAxios.delete(`/api/main/comments/${commentId}`)
            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            getUserIssues,
            addIssue,
            handleAuthErr,
            resetAuthErr,
            getAllIssues,
            allIssues,
            handleUpvote,
            handleDownvote,
            deleteIssue, 
            editIssue,
            comments,
            getComments,
            addComment,
            deleteComment
        }}>
            {props.children}
        </UserContext.Provider>
    )

}