//var React = require('https://cdn.bootcss.com/react/15.4.2/react.min.js');
// import React from 'react';
import ReactDOM  from 'react-dom';
//
// console.log(React);

//var AppComponent = require('./ProductBox.jsx');


// 注意：：： 用import React from 'react'; 使用的是新的版本，要如下这样写

// class ProductBox extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: 'Hello React.js!'
//     };
//   }
//   reverseMessage() {
//     this.setState({
//       message: this.state.message.split('').reverse().join('')
//     });
//   }
//   render() {
//     return (
//       <div className="productBox">
//         Hello Wolrd!
//       </div>
//     )
//   }
// }




//    <script src="https://cdn.bootcss.com/react/15.4.2/react.min.js" charset="utf-8"></script>
//    这里是旧版本，不会提示React.createClass不是函数

var ProductBox = React.createClass({
  render: function(){
    return(
      <div className="productBox">
        Hello Wolrd!!!!
      </div>
    );
  }
});


ReactDOM.render(<ProductBox/>, document.getElementById('content'));
