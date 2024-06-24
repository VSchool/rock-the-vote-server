import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import Issue from "./Issue"


function Public() {

    const {allIssues, getAllIssues } = useContext(UserContext)

    useEffect(()=>{
        getAllIssues()
    }, [])

    const issueElements = allIssues.map(issue => {
        return (
            <Issue {...issue} key = {issue._id}/>
        )
    })
    return ( 
        <>
            {issueElements}
        </>
     );
}

export default Public;