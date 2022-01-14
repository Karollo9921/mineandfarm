// imports 
import { Request, Response } from 'express';
import User from '../models/user';

// define controller 
class GetAllUsersController {

  constructor() {};

  async getAllUsers(req: Request, res: Response) {
    
    // get data
    let data = await User
                      .find( {}, {login: 1, amountOfGold: 1, _id: 0} )
                      .sort({amountOfGold:-1}); // we sort in descending order

    return res.json({
      golds: data
    });
  }
}

// export 
export default GetAllUsersController;
