import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function TitlebarImageList(props) {
    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
          author: '@bkristastucchio',
          rows: 2,
          cols: 2,
          featured: true,
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
          author: '@rollelflex_graphy726',
        },
      ];
      const {imgName} = props
      const img = [imgName]
      console.log(img[0])
      

  return (
    <ImageList sx={{ width: 500, height: 450 }}>

      {img[0].map((item,index) => (
        <ImageListItem key={index}>
          <img
            src={`http://localhost:8080/api/image/${item}`}
            //srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item}
            loading="lazy"
          />
          
          <ImageListItemBar
            title={item}
            //subtitle={item.author}
            actionIcon={
              <IconButton 
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item}`}
                onClick = {()=>{
                    console.log(item)
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}


