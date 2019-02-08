
const PostReq = (url, json, onSuccess, onFail)=>{

    fetch(url, {
        
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',

    }).then( res =>{

        if(res.status === 200){
            
            onSuccess(res);

        }else{

            onFail(res.error);
        }

    }).catch(err =>{

        onFail("catch->"+err);
    });

}

const GetReq = (url)=>{

    return fetch(url, {
              
        method: 'GET',
        credentials: 'include',
    })
}

export{PostReq, GetReq}