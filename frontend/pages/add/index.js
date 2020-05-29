import React, {useState,useEffect} from 'react';
import {Row, Col, Form, Input, InputNumber, Button} from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {submitUserData} from '../../services/api';

export default function Add() {

    const [multipleAddress, setMultipleAddress] = useState(['']);
    const [form] = Form.useForm();

    const setThisAddress = (e,idx) => {
        let copyMultipleAddress = [...multipleAddress];
        copyMultipleAddress[idx] = e.target.value;
        setMultipleAddress(copyMultipleAddress);
    }

    const addNewAddress = (e) => {
        e.preventDefault();
        setMultipleAddress([...multipleAddress,""]);
    }

    const deleteThisAddress = (e,idx) => {
        e.preventDefault();
        setMultipleAddress(multipleAddress.filter((item,index) => index != idx));
    }

    const submitNewUser = async(e) => {
        let fieldValues = await form.validateFields();
        let joinAddress = multipleAddress.join('\n');
        submitUserData(fieldValues.nama,fieldValues.hp,fieldValues.email,joinAddress)
        .then(data => {
            if (data.status == 'success') {
                window.location.href = '/';
            } else {
                alert("Something wrong while submitting new user. Try again later.");
            }
        })
    }

    return (
        <div className="container">
            <div style={{height:'5vh'}}>
                <Row className="py-3">
                    <Col span={6}>
                        <h4>CREATE USERS</h4>
                    </Col>
                </Row>
            </div>
            <div className="py-5" style={{height:'80vh'}}>
                <Form layout={'horizontal'} form={form} name="add-new-user" onFinish={submitNewUser}>
                    <Row style={{paddingBottom:'10px',paddingLeft:'30px',paddingRight:'30px'}}>
                        <Col span={24}>
                            <div className="row">
                                <div className="col-9">
                                    <Form.Item
                                        name="nama"
                                        label={<strong>Nama</strong>}
                                        labelCol={{span:3}}
                                        labelAlign={"left"}
                                        colon={false}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama should not be empty!'
                                            },
                                            {
                                                max: 50,
                                                message: 'Nama can only have 50 maximum characters!'
                                            }
                                        ]}>
                                        <Input placeholder="Nama" style={{width:'100%'}} />
                                    </Form.Item>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:'10px',paddingLeft:'30px',paddingRight:'30px'}}>
                        <Col span={24}>
                            <div className="row">
                                <div className="col-9">
                                    <Form.Item
                                        name="hp"
                                        label={<strong>No HP</strong>}
                                        labelCol={{span:3}}
                                        labelAlign={"left"}
                                        colon={false}
                                        rules={[
                                            {
                                                required : true,
                                                message : 'No HP should not be empty!'
                                            },
                                            {
                                                min : 10,
                                                message : 'No HP should contain minimum 10 digits'
                                            },
                                            {
                                                pattern : "^[0-9]{10,}$",
                                                message : 'No HP should contain digits only!'
                                            }
                                        ]}>
                                          <Input placeholder="No HP" style={{width:'100%'}}/>
                                    </Form.Item>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:'10px',paddingLeft:'30px',paddingRight:'30px'}}>
                        <Col span={24}>
                            <div className="row">
                                <div className="col-9">
                                    <Form.Item
                                        name="email"
                                        label={<strong>Email</strong>}
                                        labelCol={{span:3}}
                                        labelAlign={"left"}
                                        colon={false}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Email should not be empty!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Use format email xxxx@xxx.xxx!'
                                            }
                                        ]}>
                                        <Input placeholder="Email" style={{width:'100%'}}/>
                                    </Form.Item>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:'30px',paddingLeft:'30px',paddingRight:'30px'}}>
                        <Col span={24}>
                            <div className="mb-3">
                                {
                                    multipleAddress.map((item,index) => (
                                        <div className="row">
                                            <div className="col-9">
                                                <Form.Item
                                                    name={`alamat${index}`}
                                                    label={<strong>{`Alamat ${index+1}`}</strong>}
                                                    labelCol={{span:3}}
                                                    labelAlign={"left"}
                                                    colon={false}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Alamat should not be empty!'
                                                        }
                                                    ]}>
                                                    <Input value={item} onChange={(e)=>setThisAddress(e,index)} placeholder="Alamat" style={{width:'100%'}}/>
                                                </Form.Item>
                                            </div>
                                            <div className="col-3 text-left">
                                                {
                                                    (index == 0) ?
                                                        <Button type="primary" onClick={(e)=>addNewAddress(e)} ghost>
                                                            <PlusOutlined />
                                                        </Button>
                                                    :   <Button type="primary" onClick={(e)=>deleteThisAddress(e,index)} ghost>
                                                            <MinusOutlined />
                                                        </Button>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:'30px',paddingLeft:'30px',paddingRight:'30px'}}>
                        <Col span={24}>
                            <Button type="primary" htmlType="submit">
                                Simpan
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}
