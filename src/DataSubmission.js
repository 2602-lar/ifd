import axios from 'axios'
import { toast } from "react-toastify";
import { Proxy } from './variables';


export const DataSubmission = async (method, endPoint, formData, caller) => {
  let response = []
  await axios({
    method: method,
    url: Proxy + endPoint,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  }).then((res) => {
    response = [
      { res: res },
      { resText: 'Successfull' }
    ]
    console.log(response)

  }).catch((err) => {
    console.log(err)
    response = [
      { res: err },
      { resText: 'failed' }
    ]

    if (err.code === 'ERR_BAD_REQUEST') {
      var serverResponse = err.response.data
      Object.keys(serverResponse).map(
        key => {
          toast.error(key + ' : ' + serverResponse[key])
        }
      )
    } else {
      //toast.error('Internal Sever error. Check server !')
    }
  })
  console.log(response)
  return (
    response
  )
}