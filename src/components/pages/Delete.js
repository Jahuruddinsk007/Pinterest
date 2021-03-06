import React, { useState } from 'react';
import axios from 'axios';
import './styles/style.css';
import NavigationBar from './NavigationBar';
import { Col, Container, Row } from 'react-bootstrap';
import img from "./img/test01.png";


function Delete() {
  const [eemail, setEmpEmail] = useState("");
  const [msg, setMessage] = useState("");

  const onChangeEmpEmail = (e) => {
    setEmpEmail(e.target.value);
    setMessage(''); 
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  

    axios.delete('https://pinterestbackendgmit.herokuapp.com/admin/remove/' + eemail)
    .then(res => {
      console.log(res.data)
      setMessage('User Successfully Deleted')
    })
    .catch(err => {
      console.log(err)
      setMessage('Invalid Email Id')
    })

  setEmpEmail('')
}

return (
  <div className='div-bg'>
    <NavigationBar />
    <Container>
      <Row>
        <Col md={6}>
          <br />
          <h3 style={{ color: "red" }}>{msg}</h3>
          <br />
          <h3>Delete User</h3>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Enter a Email For Delete User</label>
              <input type="email" className="form-control" placeholder="Enter Email" name="email" value={eemail} onChange={onChangeEmpEmail} required />
            </div>
            <br />
            <center><input type="submit" value="DELETE USER" className="btn btn-danger" /></center>
          </form>
        </Col>
        <Col md={6}>
          <br /><br /><br /><br /><br /><br /><br />
          <div className="contact-info">
            <center>
              <h3>Delete Useres Here</h3>

            </center>
            <img className="img-fluid" src={img} alt="No img" />

          </div>
        </Col>
      </Row>
    </Container>
    <br /><br /><br /><br />
  </div>
)
}


export default Delete
