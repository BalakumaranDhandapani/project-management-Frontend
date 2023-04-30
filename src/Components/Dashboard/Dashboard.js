
import React, { useState, useEffect } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { BsCheck2All } from "react-icons/bs";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";


import Dashboard_order_by_type from './DBcomponents/Dashboard_alerts';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'
import ReactApexChart  from 'react-apexcharts'
import Avatar from "@material-ui/core/Avatar";
var moment = require('moment');

function Dashboard() {

    const [flag, setflag] = useState('');
    const [todo, setto] = useState(0)
    const [process, setprocess] = useState(0)
    const [completed, setcompleted] = useState(0)
    const [data,setdata]=useState([0, 0, 0])

    const [screenlogic, setscreenlogic] = useState(1);
   

   
   

    let todo_var=0
    let process_var=0
    let completed_var=0

    let series=[{
        name: "",
        data: data
      }]

      let options={
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['TO DO', 'IN PROCESS', 'COMPLETED'],
        },
        yaxis: {
          title: {
            text: 'PROJECTS'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " PROJECTS"
            }
          }
        }
    }
        useEffect(() => {
        

          
    
                const getStocksData = {
                    url: api.LIST_PROJECTS,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                axios(getStocksData)
                    .then(response => {
        
                       
                        // setdata(response.data)
                        console.log(response.data);
                        response.data.map((val)=>{
                            if(val.status=="TO DO"){
                                todo_var=todo_var+1
                            }
                            else if(val.status=="IN PROCESS"){
                                process_var=process_var+1
                            }
                            else if(val.status=="COMPLETED"){
                                completed_var=completed_var+1
                            }
                        })
                        console.log(todo_var)
                        console.log(process_var)
                        console.log(completed_var)
                        setto(todo_var)
                        setprocess(process_var)
                        setcompleted(completed_var)
                        setdata([todo_var,process_var,completed_var])

        
                    })
                    .catch(function (e) {
                        if (e.message === 'Network Error') {
                            alert("No Internet Found. Please check your internet connection")
                        }
                        else {
                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                        }           
        
                    });
           
         
  
        }, [flag]


        )

    if (screenlogic == 0) {

        return (

            <div>
              <h1>Loading</h1>
            </div>
        )
    }

    else {

        return (
            <>

                <Aux >
           
                    <Row >

                        <Col xl={4} lg={6} md={6} sm={12} xs={12} >
                            <Card style={{ borderRadius: 25 }}>
                                <Card.Body >
                                    <Row>
                                        <Col xl={4} lg={3} md={3} sm={3} xs={3} >
                                            <Avatar  style={{ height: '50px', width: '50px',backgroundColor:'white' }}>
                                                <BsFillClipboard2CheckFill className="ml-0" color="#2d47f7" size={38} />
                                            </Avatar>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                            <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, lineHeight: 1.2 }}>{todo}</h6>
                                            <p className='m-b-0 ml-1 ' style={{ fontFamily: 'Poppins-M#5e72e4edium', fontSize: 16, lineHeight: 1.2, color: '#7e7e7e' }}>TO Do</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={4} lg={6} md={6} sm={12} xs={12}>
                            <Card style={{ borderRadius: 25 }}>
                                <Card.Body >
                                    <Row>
                                        <Col xl={4} lg={3} md={3} sm={3} xs={3}>
                                            <Avatar sx={{ bgcolor: '#f4f6fd' }} style={{ height: '50px', width: '50px' ,backgroundColor:'white'}}>
                                                <BsCodeSlash className="ml-0" color="#2d47f7" size={38} />
                                            </Avatar>
                                        </Col>
                                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                                            <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, lineHeight: 1.2 }}>{process}</h6>
                                            <p className='m-b-0 ml-1 ' style={{ fontFamily: 'Poppins-M#5e72e4edium', fontSize: 16, lineHeight: 1.2, color: '#7e7e7e' }}>IN PROGRESS</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={4} lg={6} md={6} sm={12} xs={12}>
                            <Card style={{ borderRadius: 25 }}>
                                <Card.Body >
                                    <Row>
                                        <Col xl={4} lg={3} md={3} sm={3} xs={3}>

                                                        <Avatar style={{ height: '50px', width: '50px',backgroundColor:'white' }}>
                                                            <BsCheck2All className="ml-0" color="#2d47f7" size={38} />
                                                        </Avatar>

                                        </Col>
                                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                                            <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, lineHeight: 1.2 }}>{completed}</h6>
                                            <p className='m-b-0 ml-1 ' style={{ fontFamily: 'Poppins-M#5e72e4edium', fontSize: 16, lineHeight: 1.2, color: '#7e7e7e' }}>COMPLETED</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* <Col md={6} xl={6} xs={12}>
                            <Dashboard_order_by_type name ={"Stocks Alerts"} piename={"Stocks Alerts"} total={stocks} alerts={alerts}/>
                        </Col>
                        <Col md={6} xl={6} xs={12}>
                            <Dashboard_order_by_type name ={"Expiry Alerts"} piename={"Expiry Alerts"} total={stocks} alerts={expiry}/>
                        </Col> */}


                    </Row>
                    <Row>
                    <div style={{width:"100%"}}>
  <ReactApexChart options={options} series={series} type="bar" height={350} />
</div>
                    </Row>
                </Aux>
            </>
        );
    }
}


export default Dashboard;