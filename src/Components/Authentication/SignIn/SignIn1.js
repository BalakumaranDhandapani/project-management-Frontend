import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import axios from 'axios';
import * as api from '../../Configurations/Api_Details'
import windowSize from 'react-window-size';

function SignUp1(props) {
    const [username, setusername] = useState("");
    const [usertype, setusertype] = useState("ADMIN");
    const [oprator_id, setoprator_id] = useState("");
    const [password, setpassword] = useState("");
    const [flag, setflag] = useState(0);

    useEffect(() => {
        if (flag == 0) {
            localStorage.clear();
        }

    }, [flag])
    function Login(e) {
        e.preventDefault();
        if (username == "" && password == "") {
            alert("Please Enter Valid Username and Password");
        }
        else if (username == "1" && password == "1" && usertype == "ADMIN") {
            localStorage.setItem('dfudfkj', "SA");
            localStorage.setItem('org_name', "SIEORA");
            localStorage.setItem('user_type', "ADMIN");
            localStorage.setItem('&s47$sfblm#5dfn', "88iifjd&^*^ddsd*^*sdffdf9987**assjsdjsd xxshddfkjdkfieru");
            localStorage.setItem('Client_Id', "1");
            localStorage.setItem('435dfsduduf', "4v3fr42dnsdhc_sfjh7_3449rgdjgfgjdfitdgkljdfgneret874sdfsd5574758wer8er)sddfgdffewr");
            localStorage.setItem('945d5fsdudu', "447v4dnsdhc_sfjh7_34@f4II88ert3f54654*&%*&&^4esdfkjert58345*(&wesdfrdd845345rge");
            localStorage.setItem('47rufjheh55', "4672dnsdhc_sfjh7_34@f4II888**3dfbdfe" + "1" + "sdfkjfsd4488745)((*57475" + "1" + "8wer8er89789erbf8vb");
            localStorage.setItem('435ererdscf', "4v3fr42dnsdhc_sfjh7_34@slfkj88*4357nfkhseadminf9934k448874sdfsd5574758weradmin8er)sddfgdff");
            localStorage.setItem('*sfk38f458e', "4v3fr42dnsdhc_sfjh7_34@slfkj8s8*4357nfkhsef99admin34k448874sdfsd557475dfgfdgdfgfdgdfg");
            window.history.replaceState(null, null, "/Dashboard");
            setflag(1)
            window.location.reload();
        }

        else if (usertype == "USER") {
            const userDetails = {
                "user_id": username,
                "password": password
            }
            const validateUser = {
                url: api.USER_VALIDATE,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: userDetails 
            }

            console.log (userDetails)
            axios(validateUser)
                .then(response => {
                    console.log (response.data)

                    if (response.data.success == true) {
                        localStorage.setItem('dfudfkj', "CA");
                        localStorage.setItem('org_name', "ADMIN");
                        localStorage.setItem('user_type', "USER");
                        localStorage.setItem('user_data',JSON.stringify(response.data.data));

                        localStorage.setItem('&s47$sfblm#5dfn', "347fbxsdf*&^h&98sf*sdhfni*BDgdd&^%sdfg78&sdfHDje7574");
                        localStorage.setItem('Client_Id', username);
                        localStorage.setItem('435dfsduduf', "4v3fr42dnsdhc_sfjh7_3449rgdjgfgjdfitdgkljdfgneret874sdfsd5574758wer8er)sddfgdffewr");
                        localStorage.setItem('945d5fsdudu', "447v4dnsdhc_sfjh7_34@f4II88ert3f54654*&%*&&^4esdfkjert58345*(&wesdfrdd845345rge");
                        localStorage.setItem('47rufjheh55', "4672dnsdhc_sfjh7_34@f4II888**3dfbdfe" + username + "sdfkjfsd4488745)((*57475" + username + "8wer8er89789erbf8vb");
                        localStorage.setItem('435ererdscf', "4v3fr42dnsdhc_sfjh7_34@slfkj88*4357nfkhsef9934k448874sdfsd5574758wer8er)sddfgdff");
                        localStorage.setItem('*sfk38f458e', "4v3fr42dnsdhc_sfjh7_34@slfkj8s8*4357nfkhsef9934k448874sdfsd557475dfgfdgdfgfdgdfg");
                        window.history.replaceState(null, null, "/PROJECT_MANAGEMENT");
                        setflag(1)
                        window.location.reload();
                    }
                    else {
                        alert("Given User Name and Password is Incorrect")
                    }
                })
                .catch(function (e) {
                    if (e.message === 'Network Error') {
                        alert("No Internet Found. Please check your internet connection")
                    }
                    else {
                        alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                    }
                });
        }

        else {
            alert("Give User Name and Password is Incorrect")


        }


    }

    return (
        <Aux>
            <div className="auth-wrapper" style={{
                // backgroundImage: `url(${backgroundImage})`,
                backgroundImage: 'linear-gradient(to right, #28147a, #4218ed)',
                // backgroundColor:'line',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
            }}>
                <div className="auth-content">

                    <div className="card">
                        <form onSubmit={Login}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                    {/* <img src={logo} alt="" style={{width:70,height:70}}/> */}

                                </div>
                                <h3 className="mb-4">Project Board Login</h3>
                                <div className="input-group mb-3">
                                    <select className="form-control" value={usertype} onChange={(e) => setusertype(e.target.value)}>
                                        <option className="form-control" value="ADMIN" >ADMIN</option>
                                        <option className="form-control" value="USER">USER</option>
                                    </select>
                                </div>


                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="User Id" value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>


                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={Login} type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    );

}

export default windowSize(SignUp1);
