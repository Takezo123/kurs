import React, { Component } from 'react'
import { RxCross2 } from "react-icons/rx";

export class Order extends Component {
  render() {
    return (
      <div className='item'>
        <img src={"./img/"+this.props.item.Image} alt='' />
        <h2>{this.props.item.title}</h2>
        <b>{this.props.item.price} $</b>
        <RxCross2 className='delete-item' onClick={()=> this.props.onDelete(this.props.item.id)} />
      </div>
    )
  }
}
 
export default Order