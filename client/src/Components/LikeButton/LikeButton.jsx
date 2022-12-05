import React, { Component } from "react";



className LikeButton  extends Component {
  state = {
    num: 0,
    val: 'Me gusta'
  }

  incrementLikes = () => {
    if (this.state.num === 0) {
      return this.setState({
        num: this.state.num + 1,
        val: 'Me gusta'
      })
    } else {
      return this.setState({
        num: this.state.num + 1,
        val: 'MeGusta'
      })
    }
  }
  render() {
    return (
      <div className="App" >
        <button
        onClick={this.incrementLikes}
        className="flex-nowrap"
        >
          {this.state.num}
          <img src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668609505/Donde-Suena-Assets/reshot-icon-horn-ZYFECLUMTD_cajil8.svg" alt="like icon" className="w-7 h-7"/>{this.state.val}</button>
      </div>
    )
  }
}

export default LikeButton
