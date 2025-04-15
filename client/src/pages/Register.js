import React from 'react'
import '../styles/RegisterStyles.css'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';



const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
        const onFinishHandler = async(values) => {
      
          try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            // Sends the values (form data like name, email, password) to the backend /register route using POST.
            dispatch(hideLoading());
            // ✅ If registration was successful, show success message and send user to the login page.
            // ❌ If not, show the error message from backend.
          
            if (res.data.success) {  // Checking whether the values have been transferred or not
              message.success('Register Successfully!'); // Showing success with the help of Ant Design's message
              navigate('/login');
            } else {
              message.error(res.data.message);
            }
          
          } catch (error) {  // Catches any crash or server issue and shows a generic error.
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');  // Import message from Ant Design
          }
          



          };
          

  return (


   <div className='form-container'>

    <Form layout="vertical" onFinish={onFinishHandler}   className='card'>


    <h3>Register Form</h3>
<Form.Item label="Name" name = "name">

<Input type = "text" required />
</Form.Item>

<Form.Item label="Email" name = "email">

<Input type = "text" required />
</Form.Item>

<Form.Item label="Password" name = "password">

<Input type = "password" required />
</Form.Item>

<Link to='/login'>Login here</Link>

<button className="bt btn-primary" type="submit" >Register </button>





    </Form>



   </div>
  )
}

export default Register