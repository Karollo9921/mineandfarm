// we create a mine collection
db.createCollection('mine', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['actualLevel', 'level', 'cost', 'income'],
      properties: {
        actualLevel: {
          bsonType: 'bool',
          description: 'must be a boolean and is required'
        },
        level: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        cost: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        income: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
      }
    }
  }
});

// insert data to mine collection
db.mine.insertMany([
	{
    "actualLevel": true,
    "level": 1,
    "cost": 0,
    "income": 1
  },
  {
    "actualLevel": false,
    "level": 2,
    "cost": 15,
    "income": 2
  },
  {
    "actualLevel": false,
    "level": 3,
    "cost": 50,
    "income": 3
  },
  {
    "actualLevel": false,
    "level": 4,
    "cost": 500,
    "income": 5
  },
  {
    "actualLevel": false,
    "level": 5,
    "cost": 5000,
    "income": 10
  }
]);


// we create a farm collection
db.createCollection('farm', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['actualLevel', 'level', 'cost', 'income', 'cooldown', 'lastCooldown'],
      properties: {
        actualLevel: {
          bsonType: 'bool',
          description: 'must be a boolean and is required'
        },
        level: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        cost: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        income: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
		    cooldown: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        lastCooldown: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
      }
    }
  }
});


// insert data to farm collection
db.farm.insertMany([
	{
    "actualLevel": true,
    "level": 1,
    "cost": 20,
    "income": 2,
    "cooldown": 5,
    "lastCooldown": 0
  },
  {
    "actualLevel": false,
    "level": 2,
    "cost": 30,
    "income": 4,
    "cooldown": 4,
    "lastCooldown": 0
  },
  {
    "actualLevel": false,
    "level": 3,
    "cost": 100,
    "income": 10,
    "cooldown": 3,
    "lastCooldown": 0
  },
  {
    "actualLevel": false,
    "level": 4,
    "cost": 500,
    "income": 15,
    "cooldown": 2,
    "lastCooldown": 0
  },
  {
    "actualLevel": false,
    "level": 5,
    "cost": 4000,
    "income": 30,
    "cooldown": 1,
    "lastCooldown": 0
  }
]);
