import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";
import { array } from 'prop-types';

function FormsElements(props) {
    const [project_name, setproject_name] = useState("");
    const [assigned_to, setassigned_to] = useState("null");
    const [status, setstatus] = useState("IN PROCESS");
    const [qty, setqty] = useState("");
    const [price, setprice] = useState("");
    const [project_id, setproject_id] = useState("");
    const [expiry_date, setexpiry_date] = useState("");
    const [start_date, setstart_date] = useState("");
    const [user_array, setuser_array] = useState([]);
    const [comments_array, setcomments_array] = useState([]);



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

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>

                        <Card.Body>
                            <h5>ADD PROJECT </h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>PROJECT NAME *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Project Name"
                                                value={project_name}
                                                onChange={(event) => { setproject_name(event.target.value) }}

                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>PROJECT VALUE *</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Project Value"
                                                value={price}
                                                onChange={(event) => { setprice(event.target.value) }}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>WORKERS INVOLVED *</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Workers Involved"
                                                value={qty}
                                                onChange={(event) => { setqty(event.target.value) }}
                                            />
                                        </Form.Group>
                                      
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
                                    </Form>
                                </Col>
                                <Col md={6}>
                                   
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>START DATE *</Form.Label>
                                        <Form.Control
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
                                                type="text"
                                                placeholder="Project Id"
                                                value={project_id}
                                                onChange={(event) => { setproject_id(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSelect">
        <Form.Label>ASSIGNED TO</Form.Label>
        <Form.Control
          as="select"
          value={assigned_to}
          onChange={e => {
           
            setassigned_to(e.target.value);
          }}
        >
                                <option value="null"></option>

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
                                            if (project_id !== "" && assigned_to !== "" && qty !== "" && price !== "" && project_id !== "") {
                                                const stock_details = {
                                                    "project_name": project_name,
                                                    "assigned_to": assigned_to,
                                                    "qty": qty,
                                                    "price": price,
                                                    "expiry_date": expiry_date,
                                                    "start_date": start_date,
                                                    "project_id": project_id,
                                                    "status":status,
                                                    "comments":comments_array
                                                };
console.log(stock_details);
                                                const options = {
                                                    url: api.CREATE_PROJECT,
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: stock_details
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
                                            }

                                            else {

                                                alert("Please fill out all required fields.")

                                            }


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