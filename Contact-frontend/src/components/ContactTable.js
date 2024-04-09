import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import ContactEditForm from './ContactEditForm';
import './ContactTable.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setContacts ,deleteContact} from '../redux/contactSlice';

const ContactTable = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contact.contacts);
  const [loading, setLoading] = useState(true);
  const [editContact, setEditContact] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/');
      dispatch(setContacts(response.data.data));
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditContact(record);
    setEditVisible(true);
  };

  const handleCancelEdit = () => {
    setEditVisible(false);
    setEditContact(null);
  };

  const handleUpdate = async (id, values) => {
    try {
      await axios.put(`http://localhost:8080/update/${id}`, values);
      message.success('Contact updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to update contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      dispatch(deleteContact(id)); 
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const columns = [
    {
      title: 'S.No',
      dataIndex: 'serial',
      key: 'serial',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Address line 1',
      dataIndex: 'address1',
      key: 'address1',
    },
    {
      title: 'Address line 2',
      dataIndex: 'address2',
      key: 'address2',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip',
      key: 'zip',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className='actions-container'>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} className='edit-button'/>
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className='delete-button'/>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'1%' }}>
        <h2 style={{textAlign:'center', margin: 0}}>Contact List</h2>
        <Link to="/contactForm">
          <Button type="primary" icon={<PlusOutlined />} className="add-contact-button">Add Contact</Button>
        </Link>
      </div>
      <div className="contact-table-container">
        <Table
          dataSource={contacts}
          columns={columns.map(col => ({
            ...col,
            onHeaderCell: () => ({
              style: { background: '#000080',color:'white' },
            }),
          }))}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
        />
        {editVisible && (
          <ContactEditForm
            contact={editContact}
            visible={editVisible}
            onCancel={handleCancelEdit}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default ContactTable;
