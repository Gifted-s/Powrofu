import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Alert,
  Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PlacesAutocomplete from './SuggestPlace';
import handleSignUp from '../../apis/handleRequests';
import { AuthContext } from '../../contexts/AuthContext';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    sm: {
      span: 8,
      offset: 8
    },
    xs: {
      span: 8,
      offset: 0
    }

  },
  wrapperCol: {
    sm: {
      span: 8,
      offset: 8
    },
    xs: {
      span: 8,
      offset: 0
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 8
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = ({ history }) => {
  const { setUser } = React.useContext(AuthContext)
  const [form] = Form.useForm();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const onFinish = (values) => {
    setLoading(true)
    setError('')
    handleSignUp({ firstName: values.firstname, gender: values.gender, location: values.location, email: values.email, password: values.password }, (err, result) => {
      if (err) {
        setLoading(false)
        return setError(err)
      }
      setLoading(false)
      setUser(result.user)
      // redirect to dashboard
      return history.push('/dashboard')
    })

  };




  return (
    <div className="form-container">

      <h3>sign up to have an account</h3>
      

      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        {error && <Alert message={error} type="error" />}
        <Form.Item

          name="firstname"
          label="First name"
          rules={[
            {
              required: true,
              message: 'Please input your firstname',
              whitespace: true,
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First name" />
        </Form.Item>
        <Form.Item

          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message:'Gender is required'
            },
          ]}
        >
          <Select

            placeholder="Select a option and change input text above"

            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>

          </Select>
        </Form.Item>
          <Form.Item

                name="location"
                label="Enter your location"
                rules={[
                    {
                        required: true,
                        message: 'Please type you location here',
                        whitespace: true,
                    },
                ]}
            >
        <PlacesAutocomplete />
        </Form.Item>

        <Form.Item
          name="email"
          className="input"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"

          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" />
        </Form.Item>


        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Retype your password" />
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          {
            loading ? <Button className="btn" type="primary" loading>Loading</Button> :
              <Button className="btn" type="primary" htmlType="submit">
                Signup
              </Button>
          }
        </Form.Item>
      </Form>
    </div>
  );
};


export default SignUp