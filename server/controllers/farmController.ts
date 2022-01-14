// imports 
import { Request, Response } from 'express';
import Farm from '../models/farm';
import User from '../models/user';

// define controller 
class FarmController {

  constructor() {};

  async addGoldAndCooldown(req: Request, res: Response) {

    // let's add gold to User
    try {

      // how much we add
      let amountGoldToAdd: { income: number }[] = await Farm.find({ actualLevel: true }, {_id: 0, income: 1});

      // take actual User's amount of gold and check if User is logged in
      if (!req.session.user) {
        return res.json({
          message: 'You must be logged in !'
        });
      };

      let actualAmountOfUsersGold: { amountOfGold: number }[] = await User.find({ login: req.session.user!.login }, { _id: 0, amountOfGold: 1 });

      // let's check if we are not in cooldown
      let farm = await Farm.find({ actualLevel: true }, {_id: 0, lastCooldown: 1, cooldown: 1});
      let lastCooldown: { lastCooldown: number }[] = await Farm.find({ actualLevel: true }, {_id: 0, lastCooldown: 1});
      let cooldown: { cooldown: number }[] = await Farm.find({ actualLevel: true }, {_id: 0, cooldown: 1});

      // if we don't wait we will get a message 
      console.log(Date.now());
      console.log(farm[0].cooldown);
      console.log(farm[0].lastCooldown); // I don't know why this is undefined, other date conversion is needed I would do that with more time :)
      if (Date.now() - lastCooldown[0].lastCooldown < cooldown[0].cooldown*1000) {

        return res.json({
          message: `You have to wait ${cooldown[0].cooldown} seconds from the previous consumption`
        });
      }

      // add this gold to user's amount
      let newAmountOfUsersGold:number = actualAmountOfUsersGold[0].amountOfGold + amountGoldToAdd[0].income

      // update User
      await User.updateOne({ login: req.session.user!.login }, { amountOfGold: newAmountOfUsersGold });

      // update Farm's lastCooldown
      await Farm.updateOne({ actualLevel: true }, { lastCooldown: Date.now() });

      // return message about success and new amount of gold 
      return res.json({
        message: `You added ${amountGoldToAdd[0].income} amount of gold !`,
        yourNewAmountOfGold: newAmountOfUsersGold
      });

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  async upgradeFarm(req: Request, res: Response) {
    // let's go upgrade! 
    try {

      // check if User is logged in
      if (!req.session.user) {
        return res.json({
          message: 'You must be logged in !'
        });
      };

      // lets declare some variables 
      let costOfUpgrade: { cost: number }[] = await Farm.find({ actualLevel: true }, {_id: 0, cost: 1});
      let actualLevel: { level: number }[] = await Farm.find({ actualLevel: true }, {_id: 0, level: 1});
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

        await Farm.updateOne({ actualLevel: true }, { actualLevel: false });
        await Farm.updateOne({ level: actualLevel[0].level + 1 }, { actualLevel: true });
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
export default FarmController;