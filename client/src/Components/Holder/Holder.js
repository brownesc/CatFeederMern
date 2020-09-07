import React from 'react';
import './Holder.css';
const axios = require('axios');

class Holder extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        url: 'https://cdn2.thecatapi.com/images/ed1.jpg',
      }
    }
  
    /**
   * This function grabs a random cat photo URL from the catAPI
   * @returns the URL of a random cat photo from the cat API
   */
    async  getURL() {
        //Aquire the url and  upate the state
      let output = await axios({
          method: 'get',
          url: 'https://api.thecatapi.com/v1/images/search',
          headers: {
              'x-api-key': '52668de1-493d-4cf7-99a5-ebd3219a0d68',
          }}).then(function (response) {
            let resData = response.data;
            let imageURL = resData[0].url;
            // console.log(imageURL, "HELLO")
                  
            
            return imageURL;
          });
      this.setState({
        url: output,
      })
      return output;
      
    }
    //REfresh the images
    componentDidMount() {
        this.timerID = setInterval(
            () => this.getURL(),
            10000
          );
    }
  
    componentWillUnmount() {
    }

    render() {
        return(
          <div className='container'>
              <img src={this.state.url} alt='alt'/>
          </div>

        // <div className= 'HoldImage'>
        // </div>
        
        );
    }
  
    
  
  }

  export default Holder;