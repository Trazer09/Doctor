import React from 'react'
import '../styles/RegisterStyles.css'
import {Form, Input} from 'antd'
import { Link } from 'react-router-dom'

const Login = () => {
    const onFinishHandler = (values) => {
        console.log(values);
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