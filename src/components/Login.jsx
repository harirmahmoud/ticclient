import React from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'universal-cookie'


export default function Login({setIsAuth}) {
     const cookies = new Cookies();
    const [loginData, setLoginData] = React.useState({
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/login', loginData)
            .then((response) => {
                console.log(response.data);
                const { user, token } = response.data;
                cookies.set("token",token);
                cookies.set("userId",user.id);
                cookies.set("username",user.name);
                cookies.set("email",user.email);
                cookies.set("image",user.image);
                cookies.set("hashedPassword",user.hashedPassword);
                setIsAuth(true);
            })
            .catch((error) => {
                
                console.error('Error logging in:', error);
                // Handle error here
            });
        // Handle login logic here
        console.log('Login data:', loginData);
    }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
        <h1>LogIn</h1>
        <form>
            <div>
            <label htmlFor="username">Username:</label>
            <input onChange={handleChange} type="text" id="username" name="username" required />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input onChange={handleChange} type="password" id="password" name="password" required />
            </div>
            <button onClick={handleSubmit} type="submit">Log In</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}
