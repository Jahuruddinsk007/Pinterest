import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import NavigationBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function AdminAfterLogin() {


  const [itemImgslist, setItemImgsList] = useState([]);

  useEffect(() => {
    // 192.168.31.192
    axios.get('http://localhost:4500/user/ViewallUserImg/')
      .then(response => {
        setItemImgsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])



  let admin = sessionStorage.getItem('admin')
  console.log(admin)
  if (admin == null) {
    return (<Redirect to="/adminlogin" />)
  }
  else {
    return (
      <div>
        <NavigationBar />
        <br /><br />
        <h3>WELCOME ADMIN</h3><br /><br />
        <div className='divHome-bg'>
          <Box>
            <ImageList variant="masonry" cols={4} gap={12}>
              {itemImgslist.map((item) => (
                <ImageListItem key={item.img_path}>
                  <img
                    src={`${item.img_path}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img_path}?w=248&fit=crop&auto=format&dpr=2 -2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar position="below" title={<span>By: @{item.authorname}</span>} />
                  <ImageListItemBar position="below" title={<span>catagory : {item.catagory}</span>} />
                  <ImageListItemBar position="below" title={<span>Uploaded at : {item.createdAt}</span>} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </div>
      </div>
    )
  }
}

export default AdminAfterLogin