import React, {useState} from 'react';
import { useGetAllProductsQuery, useGetProductsQuery, useGetAllUsersQuery } from '../features/aplSlice';
import { Link } from 'react-router-dom';
export const Data = () => {
    // const { data } = useGetAllProductsQuery();
    // const { data: getProduct } = useGetProductsQuery("Iphone");
    const { data , isLoading, error } = useGetAllUsersQuery();
    const [ searchQuery, setSearchQuery] = useState('') 
    const [ sortColumn, setSortColumn] = useState({key:"firstName",direction:'asc'})
    console.log(data)
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }
    const users = data?.users || [];
    if (!Array.isArray(users)) {
        return <div>Unexpected data format</div>;
    }
    const filteredUsers = users.filter(user => `${user.firstName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // const toggleSortDirection = () => {
    //     setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    // }

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortColumn.direction === 'asc') {
            return a[sortColumn.key].localeCompare(b[sortColumn.key]);
        } else {
            return b[sortColumn.key].localeCompare(a[sortColumn.key]);
        }
    });
    
    const handleClick = (key) => {   
        console.log(key)
        let direction = 'asc'
        if(sortColumn.key === key && sortColumn.direction === 'asc'){
            direction = 'desc'
        }
        
        setSortColumn({key,direction})
        console.log(sortColumn)
    }
    const userDisplay = (user) => {
        console.log("hello",user)

    }

    return (
        <div className='App'>
            <h1>Users</h1>
            <input 
                type="text" 
                placeholder="Search by name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button><Link to={'/products'}>View Products</Link></button>
            <table border={1}>
                <thead>
                    <tr>
                        <th onClick={() => handleClick('firstName')}>Name </th>
                        <th onClick={() => handleClick('email')}>Email</th>
                        <th onClick={() => handleClick('phone')}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.id}>
                            <td><Link to={`/user/${user.id}`}>{user.firstName}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
