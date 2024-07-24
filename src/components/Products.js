import React from "react";
import { useEffect, useState } from "react";
export const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        // console.log("hellp")
        const fetchData = async () => {
            const response = await fetch('https://dummyjson.com/products'); // Replace with your actual data source
            const data = await response.json();
            console.log(data)
            setProducts(data.products);
        }
        fetchData();
    },[]);
    console.log(products)
    const handleClick = (key) => {
        console.log(key)
    }
    return (
        <div>
            <h1>Products</h1>
            {/* <input 
                type="text" 
                placeholder="Search by name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            /> */}
    
            <table border={1}>
                <thead>
                    <tr>
                        <th onClick={() => handleClick('firstName')}>Name </th>
                        <th onClick={() => handleClick('email')}>Email</th>
                        <th onClick={() => handleClick('phone')}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}