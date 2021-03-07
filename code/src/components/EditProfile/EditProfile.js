import React from 'react';

import './EditProfile.css';

async function editProfile(credentials) {
  //TODO make call to node API
  
  let json = {
    "token": "aoeuhjkl"
  };
  return json;
}

function editmyprofile({}){
    // <div className="container">
    //     <div className="row">
    //         <div className="col">
    //         <h2> Your account </h2>
    //         </div>
    //         <div className="col">
    //         <div className="login-wrapper">
    //             <header>Login</header>
    //             <form onSubmit={handleSubmit}>
    //                 <label>
    //                 <p>Email</p>
    //                 <input type="text" 
    //                 placeholder="Email" 
    //                 onChange={e => setUserName(e.target.value)}/>
    //                 </label>
    //                 <label>
    //                 <p>Password</p>
    //                 <input type="password" 
    //                 placeholder="Password"
    //                 onChange={e => setPassword(e.target.value)}/>
    //                 </label>
    //                 <div>
    //                 <button type="submit">Submit</button>
    //                 </div>
    //             </form>
    //             </div>
    //         </div>
    //     </div>
    // </div>
}

function viewmyprofile() {
    //if (loggedIn){
        <div class="container">
            <div class="col-sm-10">
                        <img class="rounded-circle" src = "img_profile.png" width="300"></img>
            </div>
                    <div class="col-sm-10">
                        <div class="row">
                            <h4 class="card-title">Name:&nbsp;</h4>
                            <h4 class="card-text">John Sullivan</h4>
                        </div>
                        <div class="row">
                            <h4 class="card-title">Bio:&nbsp;</h4>
                            <div class="card-body"> 
                                <p class="card-text">John Sullivan is a Human Resources specialist with a decade of successful experience in hiring and employee management. John specializes in Human Resource technologies and regularly attends national training sessions to showcase new HR tech trends, such as self-service, wellness apps, and people analytics tools. A strong believer in the power of positive thinking in the workplace, John regularly develops internal wellness campaigns to assist employees with effective mental health techniques. John enjoys a good Netflix binge but can also be found on long bike rides on hilly country roads.</p>
                            </div>
                        </div>
                    </div>
        </div>
    // }
    // else {
    //     //Send to login page
    // }
}

export default viewmyprofile();
