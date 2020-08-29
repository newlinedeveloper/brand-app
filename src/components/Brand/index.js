import React, { Component } from 'react'
import { 
    Layout, Card, Avatar,notification,Button, Input,DatePicker,Tooltip,TimePicker,Modal,Badge,Statistic,Divider,
    Comment, Form,List,Rate,Drawer,Skeleton,Empty,Pagination, Row, Col,Descriptions
} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,LikeOutlined,CoffeeOutlined,HeartOutlined,SearchOutlined } from '@ant-design/icons';
import moment from 'moment';


  import { fetchAllUsers,fetchAllBrands } from "../../actions";
  
import Logo from "./../../assets/bi_polar.png";
import Recipe from "./../../assets/recipe.jpg";
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



class Dashboard extends Component {

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
        comments: [],
        submitting: false,
        value: '',
        brandArray : [],
        brandArrayTemp : [],
        totalBrands: 0,
        selectedBrand: null,
        brand : "",
        variety : "",
        style: "",
        country: "",
        stars: 0,
        topTen : "",
        count : 1,
        
    }

    componentDidMount() {
       
        
        this._getBrandsInfo();
        notification.success({
            message: "Welcome!!!!",
            placement: "bottomRight",
            });
        }

      _getBrandsInfo = () => {
        let usersDetails = fetchAllBrands();
        usersDetails.then((res, err) => {
          if (err) console.log(err);
          else {
            res = this.getUnique(res,"Brand")
            console.log(res.length)
            this.setState(
              { 
  
                brandArray: res,
                brandArrayTemp: res,
                totalBrands: res.length
               },
            );
          }
        });
      }
    

          handleSearch = (value) => {
            this.setState({ 
              brandArray : this.state.brandArrayTemp,
              searchField : value
             }, () => {
                this.setState((prevState) => (
                  {
                    brandArray : prevState.brandArray.filter((brand) => {
                    if(brand.Brand.toLowerCase().includes(value.toLowerCase()) || brand.Country.toLowerCase().includes(value.toLowerCase())) {
                      return brand
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
                  brandArray:[]
                });
                this._getBrandsInfo();
            }
          };

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

          getUnique = (arr, index) => {

            const unique = arr
                 .map(e => e[index])
          
                 // store the keys of the unique objects
                 .map((e, i, final) => final.indexOf(e) === i && i)
          
                 // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);      
          
             return unique;
          }




    render() {

      const { comments, submitting, value } = this.state;

          let createSlotModal = (
            <Modal
                centered
                title={this.state.brand}
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
                            message: "Ordered Successfully",
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
                        value={this.state.brand}
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

                <Col className="gutter-row" span={24}>
                    <div className="form-group">
                        <label for="name">Variety</label>
                        <Input
                        type="text"
                        placeholder="Name"
                        value={this.state.variety}
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
                        <label for="phone">Style</label>
                        <Input
                        type="text"
                        placeholder="Category"
                        disabled
                        value={this.state.style}
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
                        <label for="phone">Country</label>
                        <Input
                        type="text"
                        placeholder="Label"
                        disabled
                        value={this.state.country}
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
                <Col className="gutter-row" span={12}>
                    <div className="form-group">
                        <label for="phone">Stars</label>
                        <Input
                        type="text"
                        placeholder="Category"
                        disabled
                        value={this.state.stars}
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
                        <label for="phone">Top Ten</label>
                        <Input
                        type="text"
                        placeholder="Top Ten"
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


            </Row>
            </Modal>
          );




          let content = (
            <div style={{marginLeft: 20}}>
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
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 4,
                            xxl: 4,
                          }}
                          style = {{marginTop : 20}}
                        dataSource={this.state.brandArray}
                        renderItem={brand => (
                            <List.Item>
                            {/* <div className="col-md-4" style={{marginTop: 5 }}> */}
                                <Card
                                    style={{ width: 300 }}
                                    cover={
                                    <img
                                        alt="food"
                                        src= {Recipe}
                                        style = {{ width : "100%" , height: "175px" }}
                                    />
                                    }
                                    actions={[
                                        <Tooltip title="settings">
                                        <SettingOutlined key="setting" />
                                        </Tooltip>,
                                        <Tooltip title="Order">
                                        <EditOutlined
                                            key="order"
                                            onClick={() => {
                                            this.setState({
                                                slotModal: true,
                                                brand : brand.Brand,
                                                variety : brand.Variety,
                                                style: brand.Style,
                                                country: brand.Country,
                                                stars: brand.Stars,

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
                                                brand : brand.Brand,
                                                variety : brand.Variety,
                                                style: brand.Style,
                                                country: brand.Country,
                                                stars: brand.Stars,
                                            });
                                        }}
                                         />
                                        </Tooltip>,
                                    ]}
                                >
                                    <Meta
                                    avatar={<Avatar src={Logo} alt="Logo" />}
                                    title={brand.Brand}
                                    description={brand.Variety}
                                    />
                                </Card>
                            {/* </div> */}
                            </List.Item>

                            // </div>
                        )}
                    />
            </div>
          );


        return (
            
            <div style={{ padding: "2%" }}>
                {createSlotModal}
                    { this.state.brandArray.length > 0 ? (
                        content
                        ) : (
                        <Empty
                            imageStyle={{
                            height: 300,
                            }}
                            description={<h2 style={{ fontWeight: "200" }}>No Brands yet!</h2>}
                        >
                        </Empty>
                        )}
                        <Drawer
                    title={this.state.Brand}
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
                            src= {Recipe}
                            style = {{ width : "75%",height: "200px"}}
                        />
                        <Divider />
                        <h5>Descriptions: </h5>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                        </div>

                        <Divider />
                        <h5>Details : </h5>
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
                        <h2>{this.state.brand}</h2>
                        <p>
                            <Rate disabled defaultValue={this.state.stars} />
                        </p>

                        <p>Variety</p>
                        <h6>
                            {this.state.variety}
                        </h6>

                        <div className="row" style={{marginTop: 30}}>
                            <div className="col-sm-6">
                            <Badge.Ribbon text="Style">
                              <Card style={{padding : 10}}>
                              <Meta
                                title={this.state.style}
                                />
                                
                              </Card>
                            </Badge.Ribbon>
                                
                            </div>
                            <div className="col-sm-6">
                            <Badge.Ribbon text="Country">
                            <Card style={{padding : 10}}>
                              <Meta
                                title={this.state.country}
                                />
                                
                              </Card>
                            </Badge.Ribbon>
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
                    <div style={{ textAlign: "center" }}>
                        <Pagination
                            current={1}
                            total={this.state.totalBrands}
                        />
                    </div>
                    
            
            </div>
        )
    }
}

export default Dashboard;