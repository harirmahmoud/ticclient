import React from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import Cookies from 'universal-cookie'

export default function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [signupData, setSignupData] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/signup', signupData)
        .then(response => {
            console.log('Signup successful:', response.data);
            const { userData, userToken } = response.data;
            cookies.set("token",userToken);
            cookies.set("userId",userData.id);
            cookies.set("username",userData.name);
            cookies.set("email",userData.email);
            cookies.set("image",userData.image);
            cookies.set("hashedPassword",userData.hashedPassword);
            setIsAuth(true);
        })
        .catch(error => {
            console.error('Error during signup:', error);
            // Handle error here (e.g., show error message)
        }
        );
       
        console.log('Signup data:', signupData);
    }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>    
        <h1>Sign Up</h1>
        <form>
            <div>
            <label htmlFor="username">Username:</label>
            <input onChange={handleChange} type="text" id="username" name="username" required />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input onChange={handleChange} type="email" id="email" name="email" required />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input onChange={handleChange} type="password" id="password" name="password" required />
            </div>
            <button onClick={handleSubmit} type="submit">Sign Up</button>
        </form>
        <p>Don't have an account? <Link to="/">Log In</Link></p>
    </div>
  )
}
