import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col ,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import  {listOrder} from '../actions/orderAction'
import { ORDER_CREATE_REQUEST } from "../constants/orderConstant";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;


const orderList = useSelector(state => state.orderList)
const {loading: loadingOrders, orders, error:errorOrder} = orderList

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>Personal Information</h2>
          {error && <Message varient="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          {message && <Message variant="danger">{message}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>COnfirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h1  style={{paddingTop:"9px", paddingBottom:"20px"}}>Order lists</h1>
          {
            loadingOrders ? <Loader/> : errorOrder ? <Message variant="danger">{error}</Message>
            :(
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>PAID</td>
                    <td>DELIVED</td>
                    <td>Details</td>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map(order => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createAt}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.isPaid ? order.paidAT:(
                            <i className="fas fa-times" style={{color:"red"}}></i>
                          )}</td>
                          <td>{order.isDelevered ? order.deleveredAT:(
                            <i className="fas fa-times" style={{color:"red"}}></i>
                          )}</td>

                          <td><LinkContainer to={`/orders/${order._id}`}>
                            <Button>Details</Button></LinkContainer></td>
                        </tr>
                      ))
                    }
                  </tbody>
              </Table>
            )
          }
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
