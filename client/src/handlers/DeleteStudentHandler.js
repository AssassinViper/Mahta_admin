import urls from '../consts/urls';

const DeleteStudentHandler = (json, onFetched, onError)=>{

    fetch(urls.deleteStudent, {
        method:"POST",
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                onFetched(res);
            
            }else{

                onError("error");
            }
        }).catch(err=>{

            onError(err);
        });
}

export default DeleteStudentHandler;