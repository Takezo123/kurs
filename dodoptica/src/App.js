import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items.js";
import Categories from "./components/Categories.js";
// import Order from "./components/Order.js";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orders:[],
      items:[
        {
          id:1,
          title:"Title 1",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"sub",
          price:"5.99",

        },
        {
          id:2,
          title:"Title 2",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"drinks",
          price:"2.99",

        },
        {
          id:3,
          title:"Title 3",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"drinks",
          price:"1.58",

        },
        {
          id:4,
          title:"Title 4",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"pizza",
          price:"14.89",

        },
       
      ]
    }
    this.addToOrder=this.addToOrder.bind(this)
    this.deleteOrder=this.deleteOrder.bind(this)
  }
  render(){
    return (
    <div className="wrapper">
      <Header orders={this.state.orders} onDelete={this.deleteOrder} />
      <Categories />
      <Items items={this.state.items} onAdd={this.addToOrder} />
      <Footer />  
        
      </div>

  )   
  }

  deleteOrder(id){
    this.setState({orders: this.state.orders.filter(el  => el.id !== id)})  
  }

  addToOrder(item) {
    let isInArray= false
    this.state.orders.forEach(el => {
      if(el.id === item.id){
        isInArray= true
      }
    })
    if(!isInArray){
      this.setState({orders: [...this.state.orders, item]}) }
  }
}

export default App;
