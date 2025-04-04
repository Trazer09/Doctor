import React from 'react'
import '../styles/RegisterStyles.css'
import {Form, Input} from 'antd'
import { Link } from 'react-router-dom'

const Register = () => {


    
        const onFinishHandler = (values) => {
            console.log(values);
          };
          

  return (


   <div className='form-container'>

    <Form layout="vertical" onFinish={onFinishHandler}   className='card'>


    <h1>Register Form</h1>
<Form.Item label="Name" name = "name">

<Input type = "text" required />
</Form.Item>

<Form.Item label="Email" name = "email">

<Input type = "text" required />
</Form.Item>

<Form.Item label="Password" name = "password">

<Input type = "password" required />
</Form.Item>

<Link to='/login' className=''>Login here</Link>

<button className="bt btn-primary" type="submit" >Register </button>





    </Form>



   </div>
  )
}

export default Register