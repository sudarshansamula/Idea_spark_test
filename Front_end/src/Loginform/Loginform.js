import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import twitterlogo from '../assets/images/twitterlogo.png';
import DocumentTitle from 'react-document-title';
import  { Service }  from "../Service/Service";
import './login.css';
export class LoginForm extends Component {
  constructor(props) {
    super(props) 
    this.state = { }
  }
  renderTableData() {
    let i=0
    return this.state.user_data.map((each_url, index) => {
       const { URL, TEXT } = each_url //destructuring
       i++
       return (
          <tr key={i}>
             <td>{URL}</td>
             <td>{TEXT}</td>
          </tr>
          
       )
    })
 }
  getTable = () => {
    return (
      <div>
         <h1 id='title'>User Tweets</h1>
         <table id='students'>
            <tbody>
               {this.renderTableData()}
            </tbody>
         </table>
      </div>
   )
  }
  createTable = (data) => {
    //document.getElementById('id01').style.display="none"
    this.setState(state => (data));
    return ReactDOM.render(this.getTable(), document.getElementById('root')) 
  }
  loginUser = event => {
    event.preventDefault();
    let body_data = {
        user_name:document.getElementById('uname').value,
        password:document.getElementById('psw').value
    }
    const request = {
        url: 'http://34.201.173.60:5001/twitter/login',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        },
        query: JSON.stringify(body_data)
      };
      Service.callApi(request)
        .then(response => {
          this.onSignUpSucess(response.data);
        })
        .catch(error => {
          this.onSignUpFailure(error);
        });
  }
  onSignUpFailure(error) {
    console.log("eroorrrrrr***",error)
    return alert('Please check twitter credentials')
  }
  onSignUpSucess(data){
    //load table
    if(data === undefined){
      return alert('No user matches for specified terms')
    }
    this.createTable(data);
  }
  render() {
    return (
      <DocumentTitle title="Sign in | Idea Spark"> 
          <div id="id01" class="modal">
            <form class="modal-content">
              <div class="imgcontainer">
                <span  class="close" title="Close Modal">&times;</span>
                <img src={twitterlogo} alt="Avatar" class="avatar"/>
              </div>
              <div class="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" id="uname" required/><br/>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="psw" required/><br/>
                  
                <button type="submit" onClick={this.loginUser}>Login</button>
              </div>
            </form>
          </div>
    </DocumentTitle>
    )
  }
}
export default LoginForm