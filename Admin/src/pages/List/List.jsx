import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"
import SaleForm from '../Sale/Sale.jsx'
const List = ({url}) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [list,setList]=useState([]);

  const fetchList=async ()=>{
    const response=await axios.get(`${url}/api/food/list`);

    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  const handleItemSelect = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };
  const removeFood= async (foodId)=>{
    const response = await axios.post(`${url}/api/food/delete`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])


  return (

<div className='list add flex-col'>
    <p>Список всех продуктов</p>
    <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
  const isSelected = selectedItems.includes(item._id);
  return (
    <div key={index} className="list-table-format">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleItemSelect(item._id)}
      />
      <img src={`${url}/images/`+item.image} alt=''/>
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>${item.price}</p>
      <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
    </div>
  )
})}
      </div>
      <SaleForm url={url} selectedItems={selectedItems} />
    </div>
  )
}

export default List