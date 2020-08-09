import React, { Component } from 'react'
import { 
    Layout, Card, Avatar,notification,Button, Input,DatePicker,Tooltip,TimePicker,Modal,Badge,Statistic,Divider,
    Comment, Form,List,Rate,Drawer,Skeleton,Empty,Pagination, Row, Col,Descriptions
} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,LikeOutlined,CoffeeOutlined,HeartOutlined,SearchOutlined } from '@ant-design/icons';
import moment from 'moment';


  import { fetchAllUsers } from "../../actions";
  
// import Logo from "./../../assets/bi_polar.png";

// import { Modal } from "react-bootstrap";

const { Content } = Layout;
const { Meta } = Card;
const { TextArea,Search } = Input;



const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );



class Home extends Component {

    state = {

        userId: "",
        user: null,
        name: "",
        firstName: "",
        lastName:"",
        email: "",
        userArray : [],
        userArrayTemp:[],
        searchField: "",
        currentPage: 1,
        totalUsers: 0,
        selectedUser: null,
        pageLoading: false,
        slotModal: false,
        image : "",
        
    }

    componentDidMount() {
       
        this._getUsersInfo();
        notification.success({
            message: "Welcome!!!!",
            placement: "bottomRight",
            });
        }

      _getUsersInfo = () => {
        let usersDetails = fetchAllUsers(this.state.currentPage);
        usersDetails.then((res, err) => {
          if (err) console.log(err);
          else {
            console.log(res);
            this.setState(
              { 
                userArray: res.data,
                userArrayTemp: res.data,
                totalUsers: res.total
               },
            );
          }
        });
      }
    

          handleSearch = (value) => {
            this.setState({ 
              userArray : this.state.userArrayTemp,
              searchField : value
             }, () => {
                this.setState((prevState) => (
                  {
                    userArray : prevState.userArray.filter((user) => {
                    if(user.first_name.toLowerCase().includes(value.toLowerCase()) || user.last_name.toLowerCase().includes(value.toLowerCase()) || user.email.toLowerCase().includes(value.toLowerCase())) {
                      return user
                    }
                  })
                }))
              });
          }
        
          handleClear = (e) => {
            if(e.target.value === '' ) {
              this.setState(
                {
                  searchField: "",
                  //  userArray : this.state.userArrayTemp
                  userArray:[]
                });
                this._getUsersInfo();
            }
          };




    render() {


        let createSlotModal = (
            <Modal
                centered
                title={this.state.name}
                visible={this.state.slotModal}
                style={{marginTop: 80}}
                onCancel={(e) => {
                this.setState({slotModal: false });
                }}
            >
                <Row>
                <Col span={16} offset={8}>
                    <Avatar
                        size={100}
                        src={this.state.image}
                        >
                    </Avatar>
                </Col>
                </Row>
                
                 <Descriptions layout="vertical" style={{marginTop:40}}>
                    <Descriptions.Item label="Id">{this.state.userId}</Descriptions.Item>
                    <Descriptions.Item label="FirstName">{this.state.firstName}</Descriptions.Item>
                    <Descriptions.Item label="LastName">{this.state.lastName}</Descriptions.Item>
                    <Descriptions.Item label="Email Id">{this.state.email}</Descriptions.Item>
                    <Descriptions.Item label="image" span={2}>
                    {this.state.image}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Badge status="processing" text="Active User" />
                    </Descriptions.Item>
                </Descriptions>
            
            </Modal>
          );


          let content = (
            <div style={{marginLeft: 50, marginRight: 50}}>
                <Row>
                    <Col span={6} offset={18}>
                        <Search
                            placeholder='Search'
                            enterButton={<SearchOutlined/>}
                            size="medium"
                            allowClear
                            onChange={this.handleClear}
                            onSearch={this.handleSearch}
                            // style={{ width: 250}}
                        /> 
                    </Col>
                </Row>
                
              <List
                itemLayout="horizontal"
                dataSource={this.state.userArray}
                renderItem={(user) => (
                  <List.Item
                    className="list-item"
                    style={{
                      padding: "1.5%",
                      paddingTop: "2.5%",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                        size={60}
                        src={user.avatar}
                        >
                        </Avatar>
                      }
                      title={
                        <span style={{ fontSize: "18px", fontWeight: "500" }}>
                          {user.first_name} {user.last_name}
                        </span>
                      }
                      description={
                        <div>
                          <p>
                            <span style={{ fontSize: "12px" }}>{user.id}</span>
                            <Divider type="vertical" />
      
                            <span style={{ fontSize: "14px",color: "#16bdc8" }}>{user.email}</span>
      
                            <Divider type="vertical" />
                          </p>
                        </div>
                      }
                      onClick={() => {
                        this.setState({ 
                            selectedUser: user,
                            userId: user.id,
                            name: user.first_name+" "+user.last_name,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            email: user.email,
                            image: user.avatar
                         },
                          () => {
                            console.log("clicked");
                          this.setState({ slotModal: true });
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </List.Item>
                )}
              />
            </div>
          );


        return (
            
            <div style={{ padding: "2%" }}>
                {createSlotModal}
                    { this.state.userArray.length > 0 ? (
                        content
                        ) : (
                        <Empty
                            imageStyle={{
                            height: 300,
                            }}
                            description={<h2 style={{ fontWeight: "200" }}>No Users yet!</h2>}
                        >
                        </Empty>
                        )}
                    <div style={{ textAlign: "center" }}>
                        <Pagination
                            current={this.state.currentPage}
                            onChange={(page) => {
                            this.setState({ currentPage: page }, () => {
                                this._getUsersInfo();
                            });
                            }}
                            total={this.state.totalUsers}
                        />
                    </div>
                    
            
            </div>
        )
    }
}

export default Home;