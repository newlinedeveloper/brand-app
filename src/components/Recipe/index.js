import React, { Component } from 'react'
import { 
    Layout, Card, Avatar,notification,Button, Input,DatePicker,Tooltip,TimePicker,Modal,Badge,Statistic,Divider,
    Comment, Form,List,Rate,Drawer,Empty,Row,Col
} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,LikeOutlined,CoffeeOutlined,HeartOutlined } from '@ant-design/icons';
import moment from 'moment';


  import { fetchAllFoods } from "../../actions";
  
import Logo from "../../assets/bi_polar.png";

// import { Modal } from "react-bootstrap";

const { Content } = Layout;
const { Meta } = Card;
const { TextArea } = Input;



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
        user: "",
        name: "",
        email: "",
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
        
          this._getFoodsInfo();
          notification.success({
                message: "Recipe panel Opened",
                placement: "bottomRight",
              });

      }

      _getFoodsInfo = () => {
        let foodDetails = fetchAllFoods();
        foodDetails.then((res, err) => {
          if (err) console.log(err);
          else {
            console.log(res);
            this.setState(
              { 
                foodArray : res,
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
            <Row gutter={24} style={{margin: 5}}>

                <Col className="gutter-row" span={24}>
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
                </Col>
            </Row>
            <Row gutter={24} style={{margin: 5}}>
                <Col className="gutter-row" span={12}>
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
                </Col>
                <Col className="gutter-row" span={12}>
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
                </Col>


            </Row>
            <Row gutter={24} style={{margin: 5}}>
                <Col className="gutter-row" span={8}>
                    <div className="form-group">
                        <label for="phone">Price for One</label>
                        <Input
                        type="text"
                        disabled
                        placeholder="Price"
                        value={this.state.price}
                        />
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
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
                </Col>
                <Col className="gutter-row" span={8}>
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
                </Col>


            </Row>
            </Modal>
          );


        return (
          <div style={{ margin : 50 }}>
            {createSlotModal}
              { this.state.foodArray.length > 0 ? (
                //   <div>
                  
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3,
                          }}
                        dataSource={this.state.foodArray}
                        renderItem={food => (
                            <List.Item>
                            {/* <div className="col-md-4" style={{marginTop: 5 }}> */}
                                <Card
                                    style={{ width: 300 }}
                                    cover={
                                    <img
                                        alt="food"
                                        src= {food.image}
                                        style = {{ width : "100%" , height: "175px" }}
                                    />
                                    }
                                    actions={[
                                        <Tooltip title="settings">
                                        <SettingOutlined key="setting" />
                                        </Tooltip>,
                                        <Tooltip title="Booking">
                                        <EditOutlined
                                            key="order"
                                            onClick={() => {
                                            this.setState({
                                                slotModal: true,
                                                id: food.id,
                                                name: food.name,
                                                category: food.category,
                                                label: food.label,
                                                price: food.price,
                                                total: food.price,
                                                description: food.description,
                                                image : food.image
                                            });
                                        }}
                                        />
                                        </Tooltip>,
                                        <Tooltip title="View">
                                        <EllipsisOutlined 
                                            key="ellipsis"
                                            onClick={() => {
                                            this.setState({
                                                visible: true,
                                                id: food.id,
                                                name: food.name,
                                                category: food.category,
                                                label: food.label,
                                                price: food.price,
                                                total: food.price,
                                                description: food.description,
                                                image: food.image
                                            });
                                        }}
                                         />
                                        </Tooltip>,
                                    ]}
                                >
                                    <Meta
                                    avatar={<Avatar src={Logo} alt="Logo" />}
                                    title={food.name}
                                    description={food.description}
                                    />
                                </Card>
                            {/* </div> */}
                            </List.Item>

                            // </div>
                        )}
                    />
                    ) : (
                        <Empty
                            imageStyle={{
                            height: 300,
                            }}
                            description={<h2 style={{ fontWeight: "200" }}>No Recipes yet!</h2>}
                        >
                        </Empty>
                        )}
                    <Drawer
                    title={this.state.name}
                    width={900}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                        >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button 
                        onClick={(e) => {
                            this.setState({
                                visible: false,
                                slotModal: true
                                });
                            }} 
                            type="primary">
                            Order Now
                        </Button>
                    </div>
                    }
                    >
                    <div className="row" style={{marginTop: 50}}>
                    <div className="col-md-6" style={{marginTop: 5 }}>
                        <img
                            alt="food"
                            src= {this.state.image}
                            style = {{ width : "75%",height: "200px"}}
                        />
                        <Divider />
                        <h5>Ingredients: </h5>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                        </div>

                        <Divider />
                        <h5>How to prepare : </h5>
                        <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                        </div>

                    </div>
                    <div 
                        className="col-md-6"
                         style={{
                            marginTop: 5,
                            textAlign: "right"
                            
                         }}>
                        <h2>{this.state.name}</h2>
                        <p>
                            <Rate disabled defaultValue={5} />
                        </p>

                        <p>Description</p>
                        <h6>
                            {this.state.description}
                        </h6>

                        <div className="row" style={{marginTop: 30}}>
                            <div className="col-sm-4">
                                <Statistic title="Likes" value={1128} prefix={<LikeOutlined />} />
                            </div>
                            <div className="col-sm-4">
                                <Statistic title="Calories" value={305} prefix={<CoffeeOutlined />} />
                            </div>
                            <div className="col-sm-4">
                                <Statistic title="Feedback" value={806} prefix={<HeartOutlined />} />
                            </div>
                        </div>

                        <div class="row">

                        </div>
                        <Divider />

                         <div className="row">
                             <div className="col-sm-12">
                             {comments.length > 0 && <CommentList comments={comments} />}
                                <Comment
                                avatar={
                                    <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                    />
                                }
                                content={
                                    <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                    />
                                }
                                />
                             </div>
                        </div>

                    </div>
                </div>

                    </Drawer>
                     
                {/* </Content> */}
                
            {/* </Layout> */}
            {/* {viewFoodDetails} */}
        </div>
        )
    }
}

export default Recipe;