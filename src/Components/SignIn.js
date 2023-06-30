import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/homepage')
            }
        });
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message))
    }

    const handleRegister = () => {
        if(registerInfo.email !== registerInfo.confirmEmail) {
            alert('Entered emails do not match')
            return
        } else if (registerInfo.password !== registerInfo.confirmPassword) {
            alert('Entered passwords do not match')
            return
        }
        createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
            .then(()=> {
                navigate('/homepage')
        }).catch((err) => alert(err.message))
    }

    return (
        <div className='sign-in'>
            <div className='login-register-container'>
                {isRegistering ? (
                    <>
                        <input 
                        type='email' 
                        placeholder='Email' 
                        value={registerInfo.email} 
                        onChange={(e)=> setRegisterInfo({...registerInfo, email: e.target.value})} 
                        />

                        <input 
                        type='email' 
                        placeholder='Confirm Email' 
                        value={registerInfo.confirmEmail}
                        onChange={(e)=> setRegisterInfo({...registerInfo, confirmEmail: e.target.value})} 

                        />

                        <input 
                        type='password' 
                        placeholder='Password' 
                        value={registerInfo.password}
                        onChange={(e)=> setRegisterInfo({...registerInfo, password: e.target.value})} 
                        />

                        <input 
                        type='password' 
                        placeholder='Confirm Password' 
                        value={registerInfo.confirmPassword}
                        onChange={(e)=> setRegisterInfo({...registerInfo, confirmPassword: e.target.value})} 

                        />

                        <button onClick={handleRegister}>Register</button>
                        <button onClick={() => setIsRegistering(false)}>Go Back to Login</button>
                    </>
                ) : (
                    <>
                        <input type='email' value={email} placeholder='Email' onChange={handleEmailChange}></input>
                        <input type='password' value={password} placeholder='Password' onChange={handlePasswordChange}></input>
                        <button onClick={handleSignIn}>Sign-In</button>
                        <button onClick={() => setIsRegistering(true)}>Create an Account</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default SignIn