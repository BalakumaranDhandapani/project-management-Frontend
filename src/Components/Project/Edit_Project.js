import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Aux from "../../hoc/_Aux";

function FormsElements(props) {
 

    useEffect(() => {
        console.log("load data");
    let load_data=()=>{
        
        const getStocksData = {
            url: api.USER_CREATION,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(getStocksData)
            .then(response => {
                console.log(response.data,"vcugdscudcudv")
                let array=[]
                response.data.map((val)=>{
array.push(val.username)
                })
setuser_array(array)
            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }           

            });

                    
    
            


    }
        
load_data()
       

       

    }, []

    )

    const [project_name, setproject_name] = useState(props.data.project_name);
    const [assigned_to, setassigned_to] = useState(props.data.assigned_to);
    const [status, setstatus] = useState(props.data.status);
    const [qty, setqty] = useState(props.data.qty);
    const [price, setprice] = useState(props.data.price);
    const [project_id, setproject_id] = useState(props.data.project_id);
    const [expiry_date, setexpiry_date] = useState(props.data.expiry_date);
    const [start_date, setstart_date] = useState(props.data.start_date);
    const [user_array, setuser_array] = useState([]);
    const [createopen, setcreateopen] = useState(false);



    return (
        <Aux>




            <Row>
                <Col>
                    <Card>
                        {/* <Card.Header>
                                <Card.Title as="h5">CREATE NEW AGENCY </Card.Title>
                                <hr/>

                            </Card.Header> */}
                        <Card.Body>
                            <h5>EDIT STOCK DETAILS </h5>
                            <hr />
                            <Row>
                            <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>PROJECT NAME *</Form.Label>
                                            <Form.Control
                                               disabled={localStorage.getItem("user_type")=="USER"}
                                                type="text"
                                                placeholder="Enter Project Name"
                                                value={project_name}
                                                onChange={(event) => { setproject_name(event.target.value) }}

                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>PROJECT VALUE *</Form.Label>
                                            <Form.Control
                                               disabled={localStorage.getItem("user_type")=="USER"}
                                                type="number"
                                                placeholder="Project Value"
                                                value={price}
                                                onChange={(event) => { setprice(event.target.value) }}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>WORKERS INVOLVED *</Form.Label>
                                            <Form.Control
                                                disabled={localStorage.getItem("user_type")=="USER"}
                                                type="number"
                                                placeholder="Workers Involved"
                                                value={qty}
                                                onChange={(event) => { setqty(event.target.value) }}
                                            />
                                        </Form.Group>

                                        {
                localStorage.getItem("user_type")=="ADMIN"?(
                    <Form.Group controlId="formBasicSelect">
                    <Form.Label> PROJECT STATUS</Form.Label>
                    <Form.Control
            
                      as="select"
                      value={status}
                      onChange={e => {
                       
                        setstatus(e.target.value);
                      }}
                    >
                        
                                <option value="IN PROCESS">IN PROCESS</option>
                                <option value="TO DO">TO DO</option>
                                <option value="COMPLETED">COMPLETED</option>
                         
                                            
                    </Form.Control>
                  </Form.Group>
                )
                :(
                    <Form.Group controlId="formBasicSelect">
                    <Form.Label> PROJECT STATUS</Form.Label>
                    <Form.Control
            
                      as="select"
                      value={status}
                      onChange={e => {
                       
                        setstatus(e.target.value);
                      }}
                    >
                        
                                <option value="IN PROCESS">IN PROCESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                         
                                            
                    </Form.Control>
                  </Form.Group>
                )
            }             


                                    </Form>
                                </Col>
                                <Col md={6}>
                                   
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>START DATE *</Form.Label>
                                        <Form.Control
                                            disabled={localStorage.getItem("user_type")=="USER"}
                                            type="date"
                                            placeholder="Start Date"
                                            value={start_date}
                                            onChange={(event) => {
                                                setstart_date(event.target.value)

                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>DEAD LINE DATE *</Form.Label>
                                        <Form.Control
                                            disabled={localStorage.getItem("user_type")=="USER"}
                                            type="date"
                                            placeholder="Dead Line"
                                            value={expiry_date}
                                            onChange={(event) => {
                                                setexpiry_date(event.target.value)

                                            }}
                                        />
                                    </Form.Group>
                                   
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>PROJECT ID *</Form.Label>
                                            <Form.Control
                                               disabled={localStorage.getItem("user_type")=="USER"}
                                                type="text"
                                                placeholder="Project Id"
                                                value={project_id}
                                                onChange={(event) => { setproject_id(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSelect">
        <Form.Label>ASSIGNED TO</Form.Label>
        <Form.Control
          disabled={localStorage.getItem("user_type")=="USER"}
          as="select"
          value={assigned_to}
          onChange={e => {
           
            setassigned_to(e.target.value);
          }}
        >
            {
                user_array.map((val)=>[
                    <option value={val}>{val}</option>
                ])
            }
        </Form.Control>
      </Form.Group>
                                      
                                </Col>

                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="success"
                                        onClick={() => {
                                                const stock_details = {
                                                    "project_name": project_name,
                                                    "assigned_to": assigned_to,
                                                    "qty": qty,
                                                    "price": price,
                                                    "expiry_date": expiry_date,
                                                    "start_date": start_date,
                                                    "project_id": project_id,
                                                    "status":status
                                                };
                                    
                                                const options = {
                                                    url: api.CREATE_PROJECT+props.data._id,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: JSON.stringify(stock_details)
                                                };
                                                axios(options)
                                                    .then(response => {
                                                        props.callback()

                                                    })
                                    
                                                    .catch(function (e) {
                                                        props.callback()
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }
                                    
                                                        else {
                                    
                                                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                                        }
                                                       
                                    
                                                    });
                                         


                                        }}
                                    >
                                        SUBMIT
                                            </Button>

                                    <Button variant="outline-dark"
                                        onClick={() => {
                                            props.callback()
                                        }}>
                                        CANCEL
                                            </Button>

                                </div>


                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default windowSize(FormsElements);