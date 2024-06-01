import React, { Component } from 'react'
import Item from  './Item'
export class items extends Component {
  render() {
    return (
      <main>
        {this.props.items.map(el=>(
            <Item item={el} />
        ))}
      </main>
    )
  }
}

export default items