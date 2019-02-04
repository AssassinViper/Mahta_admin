import React, {Component} from "react";
import Button from '../components/Button';
import Input from '../components/Input';
import {PostReq} from '../helpers/HttpRequest';
import urls from '../consts/urls';


class LoginPage extends Component{

    render(){

        return(

            <div style={s.con}>
            
                <Input height={30} width="80%" placeholder="نام کاربری" onChange={(e)=>{this.username = e.target.value}}/>
                <Input height={30} width="80%" placeholder="شناسه کاربری" onChange={(e)=>{this.password = e.target.value}}/>
                <Button height={50} width="60%" onClick={this.authenticate} >ورود</Button>

            </div>
        )
    }

    authenticate = ()=>{

        /*fetch("https://support.oneskyapp.com/hc/en-us/article_attachments/202761627/example_1.json")
        .then( res => res.json())
        .then( res => alert(res.fruit))
        .catch( error => alert(error));*/

        fetch("http://admin.alphaproject.info/api/admin/authenticate", 
        {method:"POST", 
        body: JSON.stringify({username:"admin", password:"adminpassword"}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res => {res.json()})
        .then(res => {alert('aa')})
        .catch(err => {alert(err)});
    }
}

const s = {

    con:{
        
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:100,
        height:400,
        width:360,
        backgroundColor:'rgba(0,0,0,0.6)',
    }
}

export default LoginPage;