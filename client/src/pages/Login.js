import React from 'react'
import '../styles/RegisterStyles.css'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate()

    const onFinishHandler = async(values) => {
      try {
        const res = await axios.post('/api/v1/user/login', values); // Sending a POST request with login credentials.
    
        // Backend checks the user and responds with success/failure and a token if successful.
        if (res.data.success) {
          localStorage.setItem("token", res.data.token); // Save the token in localStorage for later use.
          message.success("Login Successfully"); // Display success message.
          navigate('/'); // Redirect to the homepage.
        } else {
          message.error(res.data.message); // Display error message from backend if login fails.
        }
    
      } catch (error) {
        console.log(error); // Log any error that occurs.
        message.error('Something went wrong'); // Display a general error message.
      }
    };
      

return (


<div className='form-container'>

<Form layout="vertical" onFinish={onFinishHandler}   className='card'>


<h3>Login Form</h3>


<Form.Item label="Email" name = "email">

<Input type = "text" required />
</Form.Item>

<Form.Item label="Password" name = "password">

<Input type = "password" required />
</Form.Item>

<Link to='/register'>Register Here</Link>

<button className="bt btn-primary" type="submit" >Login </button>





</Form>



</div>
)
}

export default Login