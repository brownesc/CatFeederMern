import React from 'react';
import './Form.css';
const axios = require('axios')



class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFedOnce: false,
            isFedTwice: false,
            date: null,
        }

        this.handleFirstFeeding = this.handleFirstFeeding.bind(this);
        this.handleSecondFeeding = this.handleSecondFeeding.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    async handleFirstFeeding(event) {
        await this.setState({isFedOnce: event.target.value});
        let currentState = this.state 
            await axios({
                method: 'post',
                url: '/submit',
                data: currentState,  
            })
        
    }

    async handleSecondFeeding(event) {
        await this.setState({isFedTwice: event.target.value});
        let currentState = this.state 
        await axios({
            method: 'post',
            url: '/submit',
            data: currentState,  
            })
    }

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     if (this.state.date===null) {
    //         alert('Pick a date first')
    //     }else{
    //         if (this.state.isFedOnce && this.state.isFedTwice){
    //             await this.setState(()=>({
    //                 firstSubmit: true,
    //                 secondSubmit: true,
    //             }))
    //         }else if (this.state.isFedOnce && !(this.state.firstSubmit)) {
    //             await this.setState(()=>({
    //                 firstSubmit: true,
    //             }))
    //         }else if (this.state.isFedTwice && this.state.firstSubmit && !(this.state.secondSubmit)) {
    //             await this.setState(()=>({
    //                 secondSubmit: true,
    //             }))
    //         }
    //         let currentState = this.state 
    //         await axios({
    //             method: 'post',
    //             url: 'http://localhost:3001/submit',
    //             data: currentState,  
    //         })

    //     }
        
    // }

    async handleDate(event) { 
        // alert(event.target.value);
        await this.setState({date: event.target.value})
        await axios({
            method: 'post',
            url: '/date',
            data: {
              date: this.state.date,
            }
          })
          .then((response)=>{
            let resData = response.data;

            if (resData !== null) {
                this.setState(resData)   
            }else{
                this.setState({
                    isFedOnce: false,
                    isFedTwice: false,
                    // firstSubmit:false,
                    // secondSubmit: false,
                    
                })
            }

            })
            ;
        
    }

    render() {
        return(
            <div className='container'>
                
                <form className='totalForm'>
                    {/* <div>
                        DATE
                    </div>
                    <div>
                        Fed Once?
                    </div>     
                    <div>
                        Fed Twice?  
                    </div> */}
                    <label>Pick a date!</label>
                    <label>Fed Once?</label>
                    <label>Fed Twice?</label>
                    <input type="date"  onChange={this.handleDate} />
                    <select  onChange={this.handleFirstFeeding} value={this.state.isFedOnce} disabled={this.state.date===null} >
                        First Feeding
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                    <select  onChange={this.handleSecondFeeding} value={this.state.isFedTwice} disabled={this.state.date===null || this.state.isFedOnce===false}>
                        First Feeding
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                    {/* <input type = "submit" className ="submit" onClick= {this.handleSubmit}/> */}

                </form>
            </div>
            
        )
    }

    
}

export default Form;