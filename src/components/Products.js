import React from "react";
import { useEffect, useState } from "react";
export const Products = () => {
    const [products, setProducts] = useState([])
    const [pid,setPid] = useState("")
    const [pname, setPname] = useState("")
    const [pprice, setPprice] = useState("")
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
    if (!products) {
        return <div>Loading...</div>;
    }
    const handleSubmit = async (pid,pname,pprice) => {
        // console.log(pid,pname,pprice)
        const newProduct = {
            id: Number(pid),
            title: pname,
            price : Number(pprice)
        }
        setProducts((prevProducts)=> {
            // console.log(prevProducts)
            const existingProductIndex = prevProducts.findIndex((product) => product.id === newProduct.id);
            console.log(existingProductIndex)
            if (existingProductIndex !== -1) {

                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = newProduct;
                return updatedProducts;
              } else {
                return [...prevProducts, newProduct];
              }
        }) 
        console.log(products)
        try {
            const response = await fetch('https://dummyjson.com/products/add',{
                method:'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Product saved successfully:', result);
            
        } 
        catch(error){
            console.error('There was a problem with the POST request:', error);
        }
        

    }
    const handleDelete = (id) => { 
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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
            <input type="text" placeholder="Enter Product ID" value={pid} onChange={(e) => setPid(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Product Name" value={pname} onChange={(e) => setPname(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Product Price" value={pprice} onChange={(e) => setPprice(e.target.value)}/><br/>
            <button onClick={() => handleSubmit(pid,pname,pprice)}>Submit</button>
            <table border={1}>
                <thead>
                    <tr>
                        <th onClick={() => handleClick('firstName')}>ID</th>
                        <th onClick={() => handleClick('email')}>Product Name</th>
                        <th onClick={() => handleClick('phone')}>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td onClick={() => handleDelete(product.id)}>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}