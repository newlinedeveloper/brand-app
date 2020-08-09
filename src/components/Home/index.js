import React, { Component } from 'react'
import { 
    Layout, Card, Avatar,notification,Button, Input,DatePicker,Tooltip,TimePicker,Modal,Badge,Statistic,Divider,
    Comment, Form,List,Rate,Drawer,Skeleton,Empty,Pagination, Row, Col
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



class Recipe extends Component {

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
        pageLoading: false,
        slotModal: false,
        description : "",
        id: "",
        image : "",
        category: "",
        label: "",
        price: "",
        foodArray: [],
        viewFood: false,
        comments: [],
        submitting: false,
        value: '',
        count: 1,
        total: 1,
        visible: false
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
                foodArray : res.data,
                userArray: res.data,
                userArrayTemp: res.data,
                totalUsers: res.total
               },
            );
          }
        });
      }

      range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }

      disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
      }

      

      showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };

      handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });

        setTimeout(() => {
            this.setState({
              submitting: false,
              value: '',
              comments: [
                {
                  author: 'Han Solo',
                  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                  content: <p>{this.state.value}</p>,
                  datetime: moment().fromNow(),
                },
                ...this.state.comments,
              ],
            });
          }, 1000);
        };

        handleChange = e => {
            this.setState({
              value: e.target.value,
            });
          };
    

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

        const { comments, submitting, value } = this.state;

        let createSlotModal = (
            <Modal
                centered
                title={this.state.name}
                visible={this.state.slotModal}
                confirmLoading="true"
                style={{marginTop: 80}}
                footer={[
                <Button
                    onClick={(e) => {
                    this.setState({ slotModal: false });
                    }}
                >
                    Cancel
                </Button>,
                <Button 
                    type="primary"
                    onClick={(e) => {
                        notification.success({
                            message: "Recipe Ordered",
                            placement: "bottomRight",
                          });
                        this.setState({ slotModal: false });
                    }}
                >
                    Order Now
                </Button>,
                ]}
                onCancel={(e) => {
                this.setState({slotModal: false });
                }}
            >
            <div className="row">

                <div className="col-sm-12">
                    <div className="form-group">
                        <label for="name">Name</label>
                        <Input
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        disabled
                        onChange={(e) =>
                            this.setState({
                            name: e.target.value,
                            errName: e.target.value !== "" ? false : true,
                            })
                        }
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="phone">category</label>
                        <Input
                        type="text"
                        placeholder="Category"
                        disabled
                        value={this.state.category}
                        onChange={(e) =>
                            this.setState({
                            category: e.target.value,
                            
                            })
                        }
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="phone">Label</label>
                        <Input
                        type="text"
                        placeholder="Label"
                        disabled
                        value={this.state.label}
                        onChange={(e) =>
                            this.setState({
                            label: e.target.value,
                            
                            })
                        }
                        />
                    </div>
                </div>


            </div>
            <div className="row">
                <div className="col-sm-5">
                    <div className="form-group">
                        <label for="phone">Price for One</label>
                        <Input
                        type="text"
                        disabled
                        placeholder="Price"
                        value={this.state.price}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label for="phone">Count</label>
                        <Input
                        type="text"
                        placeholder="count"
                        value={this.state.count}
                        onChange={(e) =>
                            this.setState({
                                count: e.target.value,
                        })
                        }
                        />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label for="phone">Total Amout</label>
                        <Input
                        type="text"
                        placeholder="count"
                        value={this.state.count * this.state.total}
                        onChange={(e) =>
                            this.setState({
                                count: e.target.value,
                        })
                        }
                        />
                    </div>
                </div>


            </div>
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
                        this.setState({ selectedUser: user }, () => {
                          console.log(this.state.selectedUser.isCustomerAdmin)
                          this.setState({ userModal: true });
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

export default Recipe;