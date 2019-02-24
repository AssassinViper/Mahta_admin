import urls from '../consts/urls';

const StudentGPListHandler = (json, onFetched, onError)=>{

    fetch(urls.studentGPList, {
        method:"POST", 
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                res.json().then(res=> onFetched(res));
            
            }else{

                onError("error");
            }
        }).catch(err=>{

            onError(err);
        });
}

export default StudentGPListHandler;