import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items.js";
import Categories from "./components/Categories.js";



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id:1,
          title:"Title 1",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"burg",
          price:"5.99",

        },
        {
          id:2,
          title:"Title 2",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"snacks",
          price:"2.99",

        },
        {
          id:3,
          title:"Title 3",
          Image:"placeholder.jpg",
          desc:"aboba",
          category:"soda",
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
    this.state.currentItems=this.state.items
    this.addToOrder=this.addToOrder.bind(this)
    this.deleteOrder=this.deleteOrder.bind(this)
    this.chooseCategory=this.chooseCategory.bind(this)

  }
  render(){
    return (
    <div className="wrapper">
      <Header orders={this.state.orders} onDelete={this.deleteOrder} />
      <Categories chooseCategory={this.chooseCategory} />
      <Items items={this.state.currentItems} onAdd={this.addToOrder} />
      <Footer />  
        
      </div>

  )   
  }

  chooseCategory(category){

    console.log(category)
    if(category==='all'){
      this.setState({currentItems: this.state.items})
      return
    }
    
      this.setState({
        currentItems: this.state.items.filter(el => el.category === category)})
  
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
