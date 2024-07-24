import './App.css';
import {Data} from "./components/Data"
import { store } from "./store"
import { Provider } from "react-redux";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { productsApi } from './features/aplSlice';
import { Products } from './components/Products';
import { Route, Router, Routes, Link } from 'react-router-dom';
import {User} from "./components/user"
function App() {

  return (
    <Provider store={store}>
      {/* <ApiProvider api={productsApi}> */}
        <div className='App'>
          <Routes>
            <Route path='/' element={<Data/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/user/:id' element={<User/>}/>
          </Routes> 
          {/* <user/> */}
        </div>
        
      {/* </ApiProvider> */}
    </Provider>
  );
}

export default App;
