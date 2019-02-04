import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';

const SpendCreditData = {

    familyCode:"",
    price:""
}

class SpendCredit extends Component {
    state = { usefrom:"credit" }
    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>
                
                <Input height={35} width="20%" placeholder="کد خانواده" type="number"
                ref={(ref=>this.familyCodeInput = ref)}
                onChange={(event)=>{SpendCreditData.familyCode = event.target.value}}/>

                <Input height={35} width="20%" placeholder="(مبلغ خرید(تومان"  type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{SpendCreditData.price = event.target.value}}/>

                
                <label style={s.usefrom_con}>
                از اعتبار&emsp;
                    <input type="radio" value="credit" name="credit" 
                        checked={this.state.usefrom === "credit"}
                        onChange={this.onUseFromChanged} name="usefrom"/>
                </label>

                <label style={s.usefrom_con}>
                از هدیه&emsp;
                    <input type="radio" value="gift" name="gift" 
                        checked={this.state.usefrom === "gift"}
                        onChange={this.onUseFromChanged}name="usefrom"/>
                </label>
                
                <Button height={50} width="15%" onClick={this.commit}>ثبت</Button>

            </div>
         );
    }

    onUseFromChanged = (event)=>{

        this.setState({usefrom:event.currentTarget.value});
    }

    commit = ()=>{

        alert(this.state.usefrom)

        if(1){
        
            this.familyCodeInput.clear();
            this.priceInput.clear();
        }
    
    }
}

const s = {

    con:{
        height:520,
        width: 1200,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'green'
    },

    space:{
        height:'5%',
    },

    usefrom_con:{
        height:'5%',
        width:'20%',
    }

}
 
export default SpendCredit;