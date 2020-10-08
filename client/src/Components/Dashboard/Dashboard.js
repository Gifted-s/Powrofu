import React, { useState } from 'react'
import {
    Input,
    PageHeader,
    List,
    Button,
    Table,
    Modal,
    Pagination,
} from 'antd';
import { data, columns } from '../../utils/userdata'
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

function DashBoard() {
    const [current, setCurrent] = useState(1);
    const [searchResult, setSearchResult] = useState(0)
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState({})
    const { user: userDetails } = React.useContext(AuthContext)
    if(!userDetails._id){
        return <Redirect to="/"/>
    }
    const pageSize = 7;
    const getData = (current, pageSize) => {
        // Slice data to chunck it 
        return data.slice((current - 1) * pageSize, current * pageSize);
    };
    const MyPagination = ({ total, onChange, current }) => {
        return (
            <Pagination
                onChange={onChange}
                total={total}
                current={current}
                pageSize={pageSize}
            />
        );
    };

    return (
        <div className="">
            <PageHeader
                className="site-page-header-responsive"
                title={`Welcome  ${userDetails.firstName}`}
                subTitle=""
                extra={[
                    <Input key={1}
                        onChange={(e) => {
                            const textSearched = e.target.value
                            let filtered = (searchResult.length > 0 ? searchResult : data).filter((userObj) => {
                                //checking if text exists in each user email
                                return userObj.email.search(new RegExp(textSearched, 'i')) === -1
                                    ||
                                    textSearched === "" ? false : true
                            })
                            setSearchResult(filtered)
                        }}
                        prefix={< SearchOutlined className="site-form-item-icon" />} placeholder="type email to search" />
                ]}

            ></PageHeader>

            <div className="dashboard-container">
                <div style={{ overflowX: 'scroll' }}>
                    <React.Fragment>
                        {
                            searchResult.length > 0 && <List
                                itemLayout="horizontal"
                                dataSource={searchResult}

                                renderItem={item => (
                                    <List.Item className="search_item" onClick={() => { setUser(item); setVisible(true); }} style={{ padding: 20 }}>
                                        <List.Item.Meta
                                            avatar={<UserOutlined className="site-form-item-icon" />}
                                            title={item.email}
                                            description={item.name}
                                        />
                                    </List.Item>
                                )}
                            />
                        }
                        <Modal
                            visible={visible}
                            title="Found User"
                            onCancel={() => setVisible(false)}
                            footer={[
                                <Button key="back" type="primary" onClick={() => setVisible(false)}>
                                    Return
                                </Button>
                            ]}
                        >
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Location: {user.location}</p>
                            <p>Gender: {user.gender}</p>

                        </Modal>


                        <MyPagination
                            total={data.length}
                            current={current}
                            onChange={setCurrent}
                        />
                        <Table
                            columns={columns}
                            dataSource={getData(current, pageSize)}
                            pagination={false}
                        />
                    </React.Fragment>
                </div>

            </div>



        </div>
    )
}

export default DashBoard
