import React from 'react';
// followed a lil react tutorial :D
// https://codejedi.hashnode.dev/your-first-react-project

class ColoredObject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      object: "car",
      color: "red"
    };
  }

  changeColor = () => {
    var col = ["blue", "turquoise", "purple", "green", "pink", "brown", "red", "orange"]
    var rand = Math.floor(Math.random() * 8 +0);

    this.setState({color: col[rand]});
  }

  changeObject = () => {
    var ob = ["car", "phone", "table", "bike", "chair", "computer", "coat", "guitar"]
    var rand2 = Math.floor(Math.random() * 8 + 0);

    this.setState({object: ob[rand2]});
  }

  render() {
    return (
      <div>
        <p style={{color: this.state.color}}>
          {this.state.object}
        </p>
        <button
          type="button"
          onClick={this.changeColor}
          >Change Color</button>
        <button
          type="button"
          onClick={this.changeObject}
          >Change Object</button>
      </div>
    );
  }
}

export default ColoredObject;