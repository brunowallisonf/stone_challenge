const dynamodb = require('../config/dynamodb');
const { DynamoDB } = require('aws-sdk');
const { randomUUID } = require('crypto');
class UserRepository {
  constructor() {
    this.usersTable = dynamodb.tables.users;
    this.dynamoDbClient = new DynamoDB.DocumentClient();
  }
  async create({ name, email, password }) {
    const userToBeCreated = { id: randomUUID(), name, email, password };
    await this.dynamoDbClient
      .put({
        TableName: this.usersTable,
        Item: userToBeCreated,
      })
      .promise();

    return { ...userToBeCreated, password: undefined };
  }
  async findById(id) {
    const user = con
  }
}

module.exports = UserRepository;
