import React, {useState,useEffect} from 'react'
import {Row, Col, Table, Input, Button} from 'antd'
import {fetchUserData} from '../services/api';
import Link from 'next/link';

export default function Home() {

    const [keyword, setKeyword] = useState(null);
    const [dataUser, setDataUser] = useState([]);

    const columnIndex = [
        {
            title : 'Name',
            dataIndex: 'nama',
            defaultSortOrder: 'ascend',
            sorter: (a,b) => {return a.nama.localeCompare(b.nama)}
        },
        {
            title : 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'ascend',
            sorter: (a,b) => {return a.email.localeCompare(b.email)}
        }
    ]

    useEffect(() => {
        fetchUserData(keyword)
        .then(data => setDataUser(data.data));
    }, [keyword]);

    return (
        <div className="container">
            <div style={{height:'5vh'}}>
                <Row className="py-3">
                    <Col span={6}>
                        <h4>LIST USERS</h4>
                    </Col>
                </Row>
            </div>
            {
                (dataUser.length > 0 || keyword != null) ?
                    <div style={{height:'80vh'}}>
                        <Row className="py-3" align="middle">
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search..." style={{width:'100%'}} />
                            </Col>
                        </Row>
                        <Row className="py-3" align="middle">
                            <Col span={24}>
                                <Table columns={columnIndex} pagination={{defaultPageSize:6}} dataSource={dataUser} />
                            </Col>
                        </Row>
                    </div>
                :   <div style={{height:'80vh'}}>
                        <div className="row h-100 align-items-center text-center">
                            <div className="col-12">
                                <div style={{fontWeight:'bold',textDecoration:'underline'}}>
                                    There is currently no data exists.<br />
                                    Please create by clicking the ADD button below.
                                </div>
                            </div>
                        </div>
                    </div>

            }
            <div className="row py-3 h-100 text-right" style={{height:'5vh'}}>
                <div className="col-12">
                    <Link href={'/add'}>
                        <Button type="primary">
                            Add User
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
