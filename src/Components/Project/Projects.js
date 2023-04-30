import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import CreateStocks from './CreateProject';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../Configurations/Api_Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import List from '@mui/material/List';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import moment from 'moment'
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";

import Edit_Stocks_Data from './Edit_Project';
const customStyles = {
    content: {
        top: '45%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '90%',

    },
    overlay: { zIndex: 1000 }
};

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '80%',

    },
    overlay: { zIndex: 1000 }
};

Modal.setAppElement('#root')

function CustomEditComponent(props) {

    const [loader, setloader] = useState(1);
    const [flag, setflag] = useState('');
    const [data, setdata] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [commentsIsOpen, setcommentsIsOpen] = useState(false);
    const [editmodalIsOpen, seteditmodalIsOpen] = useState(false);
    const [editstockdata, seteditstockdata] = useState([]);
    const [text, settext] = useState('');
    const [rowdata, setrowdata] = useState({"comments":[]});

    const [date, setdate] = useState(moment().format("DD-MM-YY, h:mm:ss a"));
    const [comments, setcomments] = useState([]);


    useEffect(() => {
        

        if(localStorage.getItem("user_type")=="USER"){
            const getStocksData = {
                url: api.LIST_PROJECTS,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            axios(getStocksData)
                .then(response => {
    
                    let filter=response.data.filter((val)=>{
                        return val.assigned_to==JSON.parse(localStorage.getItem("user_data")).username && val.status=="IN PROCESS"
                    })
                    setdata(filter)
                    console.log(response.data);
                   
    
                })
                .catch(function (e) {
                    setdata([])

                    if (e.message === 'Network Error') {
                        alert("No Internet Found. Please check your internet connection")
                    }
                    else {
                        alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                    }           
    
                });
        }
        else if(localStorage.getItem("user_type")=="ADMIN"){

            const getStocksData = {
                url: api.LIST_PROJECTS,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            axios(getStocksData)
                .then(response => {
    
                   
                    setdata(response.data)
                    console.log(response.data);
    
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
     
        


            
        

      

        

    }, [flag]

    )


    function closeModal() {
        setIsOpen(false);
        setcommentsIsOpen(false)

    }

    function getResponse(result) {
        setIsOpen(false);
        seteditmodalIsOpen(false)
        setflag(!flag)
    }


    if (loader == 0) {

        return (
            <div>
                <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" style={{ backgroundColor: 'white' }}>
                    <CircularProgress color="secondary" size={70} />
                    <h1 style={{ marginLeft: 40 }}>Loading...</h1>
                </Box>
            </div>
        )
    }

    else {
        return (
            <div>

        <Modal
                 isOpen={commentsIsOpen}
                 // onAfterOpen={afterOpenModal}
                 onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <div class="d-flex justify-content-between">
                    <div>                        <h3 className='text-center' style={{marginTop:20}}>PROJECT COMMENTS</h3>
                    </div>
                    <div style={{marginTop:25}}>
                    <Button
                                    variant={"success"}
                                    color="#08A045"
                                    style={{ fontWeight: 'bold', fontSize: 12,padding:4 }}
                                    onClick={(e) => {
                                        setcommentsIsOpen(false)
                                        settext("")
                                        setflag(!flag)


                                    }}
                                   >
                                   Close</Button>
                                   </div>
</div>
<div class="d-flex justify-content-end mt-3" >

{
                                localStorage.getItem("user_type")=="USER"?(
                            <div  >
                            <TextField  id="standard-basic" label="Message Here" variant="standard" value={text}   onChange={(event) => { settext(event.target.value) }} />
                           
                                    <Button
                                    variant={"primary"}
                                    color="#08A045"
                                    style={{ fontWeight: 'bold', fontSize: 12,marginTop:10 }}
                                    onClick={(e) => {
                                       let comm=[...comments]
                                       comm.unshift({"text":text,"date":date})
                                       console.log(comm);
                                       setcomments(comm)
                                   
                                       const stock_details = {
                                           "project_name": rowdata.project_name,
                                           "assigned_to": rowdata.assigned_to,
                                           "qty": rowdata.qty,
                                           "price": rowdata.price,
                                           "expiry_date": rowdata.expiry_date,
                                           "start_date": rowdata.start_date,
                                           "project_id": rowdata.project_id,
                                           "status":rowdata.status,
                                           "comments":comm
                                       };
                                       console.log(stock_details,"in")
                                       const options = {
                                           url: api.CREATE_PROJECT+rowdata._id,
                                           method: 'PUT',
                                           headers: {
                                               'Content-Type': 'application/json',
                                               // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                           },
                                           data: JSON.stringify(stock_details)
                                       };
                                       axios(options)
                                           .then(response => {
                                            settext("")
                                            console.log(response,"res")

                                   
                                           })
                                   
                                           .catch(function (e) {
                                               if (e.message === 'Network Error') {
                                                   alert("No Internet Found. Please check your internet connection")
                                               }
                                   
                                               else {
                                   
                                                   alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                               }
                                              
                                   
                                           });
                                   
                                    }}
                                   >
                                   Send message</Button>
                                
                
                            </div>
):(
    null
)
}
</div>




                    <Row>
                        <Col md={6} >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
        comments.map((val)=>(
                <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DraftsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={val.text} secondary={val.date} />
              </ListItem>
            ))
        }
    </List>

                        </Col>

                    </Row>

               
                </Modal>

				
			


                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <CreateStocks
                        callback={getResponse}
                    />
                </Modal>

                <Modal
                    isOpen={editmodalIsOpen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <Edit_Stocks_Data
                        callback={getResponse}
                        data={editstockdata}
                    />
                </Modal>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    {
                        localStorage.getItem("user_type")=="ADMIN"?(
                            <Button
 variant={"success"}
 color="#08A045"
 style={{ fontWeight: 'bold', fontSize: 17 }}
 onClick={(e) => {
     setIsOpen(true);

 }}
>
 + ADD PROJECT
</Button>
                        ):(null)
 
                    }
                   
                </div>
                <MaterialTable
                    title="PROJECT MANAGEMENT"
                    columns={[
                        { title: 'PROJECT NAME', field: 'product_name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.project_name.toUpperCase()}</h5>) } },
                        { title: 'ASSIGNED TO', field: 'price', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.assigned_to}</h5>) } },
                        { title: 'START DATE', field: 'qty', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.start_date}</h5>) } },
                        { title: 'DEAD LINE ', field: 'unit', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.expiry_date}</h5>) } },
                        { title: 'STATUS', field: 'barcode', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.status}</h5>) } },
                        { title: 'VALUE', field: 'minimum_qty', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.price}</h5>) } },
                   




                    ]}
                    data={data}
                    key={data._id}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Food',
                            iconProps: { style: { color: "#575580" } },
                            onClick: (event, rowData) => {
                                seteditstockdata(rowData)
                                seteditmodalIsOpen(true)
                            }
                        },

                        (rowData)=>(
                            localStorage.getItem("user_type")=="ADMIN"?(
                                {
                                    icon: 'delete',
                            tooltip: 'Delete User',
                            iconProps: { style: { color: "#575580" } },
                            onClick: (event, rowData) => {
                                confirmAlert({
                                    title: 'Delete',
                                    message: 'Are you want to remove '+rowData["product_name"],
                                    buttons: [
                                        {
                                            label: 'Yes',
                                            onClick: () => {
                                                const options = {
                                                    url: api.CREATE_PROJECT + rowData._id,
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    }
                                                };

                                                axios(options)
                                                    .then(response => {
                                                        // console.log(response);
                                                        setflag(!flag)

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
                                        },
                                        {
                                            label: 'No',
                                            onClick: () => {

                                            }
                                        }
                                    ]
                                });

                            }
                                }
                            ):(
                                null
                            )
                        ),
                        (rowData)=>(
                                {
                                    icon: 'note',
                            tooltip: 'Comments',
                            iconProps: { style: { color: "#575580" } },
                            onClick: (event, rowData) => {
                                
                                setcomments(rowData["comments"].reverse())
                                console.log(rowData["comments"].reverse());
                                setrowdata(rowData)
                                setcommentsIsOpen(true);
                              
                            }
                                }
                           
                        ),


                      
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        sorting: true,
                        exportButton: true,
                        pageSize: 10
                    }}
                    localization={{
                        header: {
                            actions: "ACTIONS"
                        }
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login_indicator: state.loginIndicator
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onloginIndicatorChange: (loginIndicator) => dispatch({ type: actionTypes.BILLING_DATA, loginIndicator: loginIndicator }),

    }
};

export default windowSize(connect(mapStateToProps, mapDispatchToProps)(CustomEditComponent));

