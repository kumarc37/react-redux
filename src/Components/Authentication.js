import React from 'react'
import axios from 'axios';
function Authentication() {
    const body={
        email:"smithcheryl@yahoo.com",
        password:"12345678"
    }
    const userID=axios.post('https://stage.api.sloovi.com/login',body).then(res=>{
        debugger;
        const headers = {
            'Authorization': 'Bearer ' + res.data.results.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        axios.get('https://stage.api.sloovi.com/user',{headers}).then(res=>{
            console.log(res.data);
        }).catch(err=> console.log(err))
        const users=axios.get('https://stage.api.sloovi.com/team',{headers}).then(res=>{
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                    })
    }).catch(err=> console.log(err))

    console.log(userID);
    return (
        <div>
            <h1>Authentication</h1>
        </div>
    )
}

export default Authentication
