import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
export const User = () => {
    const { id } = useParams();
    console.log(id)
    const [user,setUser] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('https://dummyjson.com/users'); 
          console.log(response)
          const data = await response.json();
          console.log(data)
          const selectedUser = data.users.find(user => user.id === parseInt(id));
          setUser(selectedUser);
        };
        
        fetchData();
      }, [id]);
    console.log(user)
    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>User
                <Link to="/">Back to User List</Link>
                <table border={1}>
                <thead>
                    <tr>
                        <th>Name </th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
   
                        <tr>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
          
                </tbody>
                </table>
        </div>
  )
}
