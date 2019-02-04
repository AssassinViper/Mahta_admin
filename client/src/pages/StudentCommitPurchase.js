import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';

const CommitPurchaseData = {

    price:"",
    familyPercent:"",
    info:""
}

class CommitPurchase extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>

                <Input height={35} width="20%" placeholder="(مبلغ خرید(تومان"  type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{CommitPurchaseData.price = event.target.value}}/>

                <Input height={35} width="20%" placeholder="درصد خانواده" type="number"
                ref={(ref=>this.familyPercentInput = ref)}
                onChange={(event)=>{CommitPurchaseData.familyPercent = event.target.value}}/>

                <PlainText height={90} width="20%" placeholder="توضیحات"
                ref={(ref=>this.infoPlainText = ref)} 
                onChange={(event)=>{CommitPurchaseData.info = event.target.value}}/>

                <Button height={50} width="15%" onClick={this.commit}>ثبت</Button>

            </div>
         );
    }

    commit = ()=>{

        if(1){
        
            this.priceInput.clear();
            this.familyPercentInput.clear();
            this.infoPlainText.clear();
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
        backgroundColor:'#a66'
    },

    space:{
        height:'5%',
    }

}
 
export default CommitPurchase;