import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import IssueList from './IssueList'


function Public() {

    const {allIssues, getAllIssues, getComments } = useContext(UserContext)

    useEffect(()=>{
        getAllIssues()
        getComments()
    }, [])


    return ( 
        <>
            <IssueList issues={allIssues}/>
        </>
     );
}

export default Public;