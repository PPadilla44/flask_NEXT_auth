import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { useEffect } from 'react';
import cookie from "cookie"

export type User = {
  isLoggedIn: boolean
  id: string,
  first_name: string,
  last_name: string,
  email: string,
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {

  

  const { token } = cookie.parse(req ? req.headers.cookie || "": document.cookie)

  
  console.log(token);
  console.log("TRYING");
  if (token) {
    console.log("IN");

    const headers = {
      "X-Auth-Token": token,
      "content-type": "application/json"
    }
    

    try {
      
      
      const { data } = await axios.get("http://localhost:5000/auth", { headers: headers})
      console.log("FSYS", data);
      
      
      res.json({
        ...data,
        isLoggedIn: true
      })
    } catch (err) {
      console.log(err);
    }
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed

  } else {
    
    res.json({
      isLoggedIn: false,
      id: "",
      first_name: "",
      last_name: "",
      email: "",
    })
  }
}