import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Alert,
  List,
  message,
  Col,
  Button,
} from 'antd';
import { UserOutlined, EnvironmentOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import handleSignUp from '../../apis/handleRequests';
import { AuthContext } from '../../contexts/AuthContext';


import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
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
  // const [form] = Form.useForm();
  let formRef = React.createRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const onFinish = (values) => {
    setError('')
    setLoading(true)

    const { firstname, gender, location, email, password } = values
    handleSignUp({ gender, location, email, password, firstName: firstname })
      .then(user => {
        if (user.error) {
          setLoading(false)
          return message.error(user.error);
        }
        console.log(user)
        setLoading(false)
        setUser(user.user)
        // redirect to dashboard
        return history.push('/dashboard')
      })
  };


  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };


  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        formRef.current.setFieldsValue({
          location: `${description} ( Long: ${lng.toFixed(2)} | Lat: ${lat.toFixed(2)} )`,
        });
        clearSuggestions()
      })
      .catch((error) => {
        formRef.current.setFieldsValue({
          location: error.message,
        });
      });
  };

  const renderSuggestions = () => {


    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={suggestion => {
          const {
            id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
          return (
            <List.Item className="location_list" key={id} onClick={handleSelect(suggestion)}>
              <List.Item.Meta
                avatar={<EnvironmentOutlined className="site-form-item-icon" />}
                title={main_text}
                description={secondary_text}
              />
            </List.Item>
          )

        }
        }
      />
    );

  }





  return (
    <div className="form-container">

      <h3>sign up to have an account</h3>


      <Form
        {...formItemLayout}
        ref={formRef}
        layout="vertical"
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        {error &&
          <Col sm={{ offset: 8, span: 8 }}>
            <Alert message={error} type="error" />
          </Col>}
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
              message: 'Gender is required'
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
          key="location"
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
          <Input disabled={!ready} onChange={handleInput} type="text" prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="Type your location here" />
        </Form.Item>
        <Col sm={{ offset: 8, span: 8 }}>
          {status === "OK" && renderSuggestions()}
        </Col>







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
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Enter your email" />
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