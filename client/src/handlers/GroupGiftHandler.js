import urls from '../consts/urls';

const GroupGiftHandler = (json, onFetched, onError)=>{

    fetch(urls.groupGift, {
        method:"POST",
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                res.json().then(res=> onFetched(res))
                .catch(err=>{ onFetched(res) });
            
            }else{

                res.json().then(res=> onError(res.error))
                .catch(err=>{ onError(res) });
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

export default GroupGiftHandler;