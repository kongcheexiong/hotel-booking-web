import axios from 'axios'
import { SERVER_URL } from '../../constants';

export const handleUploadImg = async (files) => {
    
    
    let data = new FormData();

    for (const i of Object.keys(files)) {
      data.append("file", files[i]);
    }

    var config = {
      method: "post",
      url: `${SERVER_URL}/api/upload/images`,
      data: data,
      timeout: 5000,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
      });
  };