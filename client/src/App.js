import React from 'react';
import './App.css';
import Holder from './Components/Holder/Holder';
import Form from './Components/Form/Form';


// "https://cdn2.thecatapi.com/images/ed1.jpg"




class App extends React.Component {

  // constructor(props) {
  //   super (props);
  // };
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Holder className="toHold"/>
        <h1>
          Have you fed the cat yet?
        </h1>
        <div className='container'>
             
        <Form/>
        </div>
      </header>
    </div>
  );
};

};


export default App;
