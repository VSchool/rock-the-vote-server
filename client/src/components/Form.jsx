import React, { useState } from 'react';

function Form(props) {

    const initState = { username: '', password: '' }

    const [formData, setFormData] = useState(initState)

    const { isMember, submit } = props

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        submit(formData)
    }

    return (

        <form name='auth-form' id='auth-form' onSubmit={handleSubmit}>

            <h2>Welcome to RTV!</h2>
            <input
                placeholder='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
            />
            <input
                placeholder='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            <button>{isMember ? "Login" : "Signup"}</button>

        </form>

    );
}

export default Form;