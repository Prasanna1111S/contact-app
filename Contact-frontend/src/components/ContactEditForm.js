import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Select } from 'antd';

const { Option } = Select;

const ContactEditForm = ({ contact, visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(contact); 
  }, [contact]); 

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      onUpdate(contact._id, values);
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Validation Error:', error);
      message.error('Failed to update contact. Please check the form fields.');
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Edit Contact"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            { required: true, message: 'Please enter first name' },
            { pattern: /^[A-Za-z]+$/, message: 'Only alphabets allowed!' },
            { min: 3, message: 'Minimum length is 3!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            { required: true, message: 'Please enter last name' },
            { pattern: /^[A-Za-z]+$/, message: 'Only alphabets allowed!' },
            { min: 3, message: 'Minimum length is 3!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            { required: true, message: 'Please select gender!' },
          ]}
        >
          <Select>
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="OTHERS">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="address1"
          label="Address Line 1"
          rules={[{ required: true, min: 8, message: 'Minimum length is 8!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address2"
          label="Address Line 2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, transform: (value) => value && value.toUpperCase() }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="zip"
          label="Zip Code"
          rules={[{ required: true, max: 6 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email', required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, pattern: /^[0-9]+$/, message: 'Please input valid phone number!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactEditForm;
