// imports 
import { Request, Response } from 'express';
import Mine from '../models/mine';
import User from '../models/user';

// define controller 
class MineController {

  constructor() {};

  async addGold(req: Request, res: Response) {

    try {

      // let's add gold to User
      let amountGoldToAdd: { income: number }[] = await Mine.find({ actualLevel: true }, {_id: 0, income: 1});

      // take actual User's amount of gold and check if User is logged in
      if (!req.session.user) {
        return res.json({
          message: 'You must be logged in !'
        });
      };

      let actualAmountOfUsersGold: { amountOfGold: number }[] = await User.find({ login: req.session.user!.login }, { _id: 0, amountOfGold: 1 });

      // add this gold to user's amount
      let newAmountOfUsersGold:number = actualAmountOfUsersGold[0].amountOfGold + amountGoldToAdd[0].income

      // update User
      await User.updateOne({ login: req.session.user!.login }, { amountOfGold: newAmountOfUsersGold });

      // return message about success and new amount of gold 
      return res.json({
        message: `You added ${amountGoldToAdd[0].income} amount of gold !`,
        yourNewAmountOfGold: newAmountOfUsersGold
      });

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  async upgradeMine(req: Request, res: Response) {

    // let's go upgrade! 
    try {

      // check if User is logged in
      if (!req.session.user) {
        return res.json({
          message: 'You must be logged in !'
        });
      };

      // lets declare some variables 
      let costOfUpgrade: { cost: number }[] = await Mine.find({ actualLevel: true }, {_id: 0, cost: 1});
      let actualLevel: { level: number }[] = await Mine.find({ actualLevel: true }, {_id: 0, level: 1});
      let actualAmountOfUsersGold: { amountOfGold: number }[] = await User.find({ login: req.session.user!.login }, { _id: 0, amountOfGold: 1 });

      // if level is max 
      if (actualLevel[0].level == 5) {
        return res.json({
          message: `You can't upgrade, your level is max`
        });
      };

      // if you don't have enough of money 
      if (costOfUpgrade[0].cost > actualAmountOfUsersGold[0].amountOfGold) {
        return res.json({
          message: `You need to mine more gold !`
        });
      };

      // you can upgrade
      if (costOfUpgrade[0].cost <= actualAmountOfUsersGold[0].amountOfGold) {
        let newAmountOfUsersGoldAfterUpgrade: number = actualAmountOfUsersGold[0].amountOfGold - costOfUpgrade[0].cost;

        await Mine.updateOne({ actualLevel: true }, { actualLevel: false });
        await Mine.updateOne({ level: actualLevel[0].level + 1 }, { actualLevel: true });
        await User.updateOne({ login: req.session.user!.login }, { amountOfGold: newAmountOfUsersGoldAfterUpgrade });

        return res.json({
          message: `Brawo, your Mine is on the new higher level ${actualLevel[0].level + 1}!`
        });
      };

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
};

// export 
export default MineController;