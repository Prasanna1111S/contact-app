import React from 'react';
import { Form, Input, Select, Button, message, Row, Col } from 'antd';
import axios from 'axios';
import './ContactForm.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactSlice';

const { Option } = Select;

const ContactForm = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const transformedValues = {
        ...values,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        country: values.country,
        zip: values.zip,
      };

     
      const response = await axios.post('http://localhost:8080/create', transformedValues);
      console.log('Response:', response.data);
      message.success('Contact created successfully');
      window.location.reload();
      dispatch(addContact(values));
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to create contact');
    }
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    string: {
      min: '${label} must be at least ${min} characters long!',
    },
  };

  return (
    <div className='container'>
      <h1>Contact</h1>
      <Form
        name="custom_form"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout="vertical" 
      >
        <Row gutter={[16, 16]}>
          
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name={['firstName']}
              label="First Name"
              rules={[
                { required: true },
                { min: 3, message: 'Minimum length is 3!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['lastName']}
              label="Last Name"
              rules={[
                { required: true },
                { min: 3, message: 'Minimum length is 3!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['gender']}
              label="Gender"
              rules={[
                { required: true },
              ]}
            >
              <Select>
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="OTHERS">Others</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={['phone']}
              label="Phone"
              rules={[
                { required: true },
                { pattern: /^[0-9]+$/, message: 'Please input valid phone number!' },
                { min: 3, message: 'Minimum length is 3!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['email']}
              label="Email"
              rules={[
                { required: true },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name={['address1']}
              label="Address Line 1"
              rules={[{ required: true, min: 8, message: 'Minimum length is 8!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['address2']}
              label="Address Line 2"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['city']}
              label="City"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['country']}
              label="Country"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['zip']}
              label="Zip Code"
              rules={[{ required: true, max: 6 }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: 'center' }}> {/* Center-align the submit button */}
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
