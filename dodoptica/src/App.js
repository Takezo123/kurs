import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items.js";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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

  }
  render(){
    return (
    <div className="wrapper">
      <Header />
      <Items items={this.state.items} />
      <Footer />  
        
      </div>

  )   
  }
}

export default App;
