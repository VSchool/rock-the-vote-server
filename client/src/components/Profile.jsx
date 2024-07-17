import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import IssueList from './IssueList';
import IssueForm from './IssueForm';


function Profile() {

        const {user, getUserIssues, issues, getComments } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
        getComments()
    }, [])
    
    
    return ( 
        <>
            <h1>Username: {user.username}</h1>
            <IssueForm />
            <IssueList issues = {issues}/>
        </>
     );
}

export default Profile;