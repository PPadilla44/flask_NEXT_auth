import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export type User = {
  isLoggedIn: boolean,
  id: string,
  first_name: string,
  last_name: string,
  email: string,
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {

  const { token } = req.headers;

  if (token) {

    const headers = {
      "X-Auth-Token": token as string,
      "content-type": "application/json"
    }

    try {

      console.log("FETCHING");

      const { data } = await axios.get<User>("http://localhost:5000/auth", { headers: headers })

      res.json({
        ...data,
        isLoggedIn: true,
      })
    } catch (err) {
      console.log(err);
      res.json({
        isLoggedIn: false,
        id: "",
        first_name: "",
        last_name: "",
        email: "",
      })
    }


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