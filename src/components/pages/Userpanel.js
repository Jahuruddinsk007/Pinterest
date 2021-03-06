import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './NavigationBar';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function Userpanel() {

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleSize = () => {
    const size = window.innerWidth;
    setWindowSize(size);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
  }, []);

  const [itemImgslist, setItemImgsList] = useState([]);

  useEffect(() => {
    axios.get('https://pinterestbackendgmit.herokuapp.com/user/ViewallUserImg/')
    .then(response => {
      setItemImgsList(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}, [])

let name = sessionStorage.getItem('name');
return (
  <div>
    <NavigationBar />
    <br /><br />
    <h3>Welcome {name}</h3>
    <br /><br />

    <div className='Home-bg'>

      <center>
        <Box sx={{ overflowY: 'scroll' }}>
          <ImageList className='img-col' variant="masonry" cols={windowSize > 1200 ? 5 : windowSize > 910 ? 3 : windowSize > 760 ? 3 : windowSize > 570 ? 2 : 1} gap={12}>
            {itemImgslist.map((item) => (
              <ImageListItem key={item.img_path}>
                <img className='uimg'
                  src={`${item.img_path}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <center>
                  <div>
                    <ImageListItemBar position="below" title={<span>By: @{item.authorname}</span>} />
                    <ImageListItemBar position="below" title={<span>catagory : {item.catagory}</span>} />
                    <ImageListItemBar position="below" title={<span>Uploaded at : {new Date(Date.parse(item.createdAt)).toLocaleString()}</span>} />
                  </div>
                </center>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </center>
    </div>

  </div>
)
}

export default Userpanel;
