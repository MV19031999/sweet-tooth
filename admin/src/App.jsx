import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


import Login from './Pages/Login/Login'
import DashBoard from './Pages/DashBoard/DashBoard'
import ItemManagement from './Pages/ItemManagement/ItemManagement'
import UpdateItem from './Pages/UpdateItem/UpdateItem'
import Orders from './Pages/Orders/Orders'
import AddItem from './Pages/AddItem/AddItem'
import CategoryManagement from './Pages/CategoryManagement/CategoryManagement'
import CategoryItems from './Pages/CategoryItems/CategoryItems'
import PasswordReset from './Pages/PasswordReset/PasswordReset'

function App() {

const url = 'http://localhost:8080'

return(
<>
<ToastContainer/>

<Routes>
  <Route path='/' element={<Login url = {url}/>} />
  <Route path='/dash-board' element={<DashBoard/>}>
    <Route path='add-item' element={<AddItem url = {url} />} />
    <Route path='category-management' element={<CategoryManagement url = {url}/>} />
    <Route path='category-items' element={<CategoryItems url={url}/>} />
    <Route path='item-management' element={<ItemManagement url = {url}/>} />
    <Route path='update-item' element={<UpdateItem url={url}/>} />
    <Route path='orders' element={<Orders url = {url}/>} />
    <Route path='password-reset' element={<PasswordReset url={url}/>} />
  </Route>
</Routes>

</>

)}

export default App
