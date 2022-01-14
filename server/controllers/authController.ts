// imports 
import { Request, Response } from 'express';
import User from '../models/user';
import validateUsersData from '../utilities/validateUsersData';
import bcrypt from 'bcrypt';

// define controller 
class AuthController {

  constructor() {}

  getLogin(req: Request, res: Response) {

    // return json message
    return res.json({
      isLoggedIn: req.session?.isLoggedIn || false,
      user: req.session?.user || ''
    });

  };

  async postLogin(req: Request, res: Response) {

    // take the body from request
    let { login, password } = req.body;

    // try to log in 
    try {
      
      // check if users exists 
      let user = await User.findOne({ login });

      // what if provided user does not exists 
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'This user does not exists, check if the login is correct',
          isLoggedIn: req.session.isLoggedIn
        });
      };

      // user exist now chec the password 
      let passwordCompare = await bcrypt.compare(password, user.password); // returning true or false

      // if password is correct then
      if (passwordCompare) {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save();

        return res.status(200).json({
          success: true,
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
          message: "User is logged in !"
        });

        // if is not correct 
      } else {
        return res.status(401).json({
          success: false,
          message: "Password do not match",
          isLoggedIn: req.session.isLoggedIn
        });
      };

    } catch (error) {
      
      return res.json({
        success: false,
        isLoggedIn: req.session.isLoggedIn,
        message: `Error: ${error}`
      });

    }
  };

  getRegister(req: Request, res: Response) {

    // return json message
    return res.json({
      isLoggedIn: req.session?.isLoggedIn || false,
      user: req.session?.user || ''
    });

  };

  async postRegister(req: Request, res: Response) {

    // lets try to register User 
    try {
      
      // create an unique uid for user 
      // declare variable 
      let uidMax: number[] = [];

      // we select from database maximum uid from User collection and add "1" to create maximum + 1 value 
      (await User
        .find( {}, {uid: 1, _id: 0} )
        .sort({uid:-1}) // we sort in descending order
        .limit(1)) // take first element (maximum)
        .forEach((u) => uidMax.push(+u.uid + 1)); // we have only one (or zero) element(s) in this array and we add 1 to this element

      // if we don't have any users in User collection then uid will equal 1 
      let uid = uidMax[0] || 1;

      // take provided by User data from the body
      let { login, password } = req.body;

      // validate User's data
      if (validateUsersData(login, password).length > 0) {
        return res.status(400).json({
          success: false,
          message: validateUsersData(login, password)
        });
      };


      // after succeed validation we will try to register User in database
      // let's check if User already exists in database (if not, we create a new one user)
      let user = await User.findOne({ login });

      // if user already exists we inform about this 
      if (user) {
        return res.status(401).json({
          success: false,
          message: 'User already exists !',
          isLoggedIn: req.session.isLoggedIn
        });
      };

      // protecting the password
      let hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new User({
        uid: uid,
        login: login,
        password: hashedPassword,
        amountOfGold: 0
      });

      // saving User in the database 
      await newUser.save();

      // setting and saving a session 
      req.session.isLoggedIn = true;
      req.session.user = newUser;
      req.session.save();

      // we return an message that register is succeed 
      return res.status(201).json({
        success: true,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        message: "User has been created !"
      });

    } catch (error) {
      console.log(`Error: ${error}`);
    };

  };
};

// export 
export default AuthController;
