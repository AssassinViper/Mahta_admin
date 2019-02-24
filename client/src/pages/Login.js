import React, {Component} from "react";
import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import lock from '../assets/svg/lock.svg'


class LoginPage extends Component{

    username = "";
    password = "";

    render(){

        return(

            <div style={s.con}>

                <div style={s.con2}>
                    <Input height={30} width="80%" placeholder="نام کاربری" onChange={(e)=>{this.username = e.target.value}}/>
                    <Input height={30} width="80%" placeholder="رمز عبور" type={"password"}onChange={(e)=>{this.password = e.target.value}}/>
                    <Button height={50} width="60%" onClick={this.authenticate} >ورود</Button>
                </div>

            </div>
        )
    }

    authenticate = ()=>{

        fetch(urls.authenticate, 
        {method:"POST", 
        body: JSON.stringify({username:this.username, password:this.password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res => {

            if(res.status === 200 ){

                this.props.history.push("/admin")

            }else{

                alert("Incorrect username or password")
            }
        })
        .catch(err => {alert(err)});
    }
}

const s = {

    con:{

        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: `url(${lock})`,
        backgroundSize:'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%', 
    },

    con2:{
        
        display:'flex',
        opacity:0.85,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:440,
        width:380,
        borderRadius:12,
        boxShadow:'4px 4px 4px rgba(0,0,0,0.5)',
        backgroundColor:'rgb(220,96,36)',
    }
}

export default LoginPage;