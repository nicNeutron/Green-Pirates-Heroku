import React, { useState, useContext, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Profile from './forum/Profile';
import NotLoggedIn from './forum/NotLoggedIn';
import { UserContext } from './UserContext';
import styled from "styled-components";

const clientId = "932974881889-v6t381i4seng1vl0avklaf70li7ok1pg.apps.googleusercontent.com";

function Login(){

    const {User, setUser} = useContext(UserContext);
    const[showLoginButton, setShowLoginButton]= useState(true);
    const[showLogoutButton, setShowLogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        setShowLoginButton(false);
        setShowLogoutButton(true);
        setUser(res.profileObj);
    };

    const onLoginFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    const onLogoutSuccess = () => {
        alert('Logout made successfully!');
        setShowLoginButton(true);
        setShowLogoutButton(false);
        setUser('');
    };
    const Button = styled.button`
    background-color: white;
    color: white;
    border-radius: 0px;
    border-width: 0px;
    margin: 10px 0px;
    cursor: pointer;
    `;
    return (
        <div className="login">
            <GoogleLogout
                    clientId={clientId}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} style={{borderRadius:'.3rem',boxShadow:'none'}}></Button>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                >
                </GoogleLogout>
            <div class="container">
                 <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
                <h1 class="font-weight-light">Profile</h1>
             </div>
            </div>
            { showLoginButton ?
                <NotLoggedIn/> :null
            }
            { showLoginButton ?
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
                <GoogleLogin
                    disabled={false}
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host origin'}
                    style={{ marginTop: '100px' }}
                    isSignedIn={true}
                />
                </div>
                : null
            }
            { showLogoutButton ?
                <Profile/> :null
            }
            { showLogoutButton ?
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'20vh'}}>
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                >
                </GoogleLogout> 
                </div>
                :null
            }
        </div>
    );
    
};


export default Login;