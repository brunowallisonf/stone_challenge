const dynamodb = require('../config/dynamodb');
const { DynamoDB } = require('aws-sdk');
const { randomUUID } = require('crypto');
class UserRepository {
  constructor() {
    this.usersTable = dynamodb.tables.users;
    this.dynamoDbClient = new DynamoDB.DocumentClient();
  }
  async create({ fullname, email, password }) {
    const userToBeCreated = { id: randomUUID(), fullname, email, password };
    await this.dynamoDbClient
      .put({
        TableName: this.usersTable,
        Item: userToBeCreated,
      })
      .promise();

    return { ...userToBeCreated, password: undefined };
  }
  async findById(id) {
    const user = await this.dynamoDbClient
      .get({
        TableName: this.usersTable,
        Key: { id },
        ProjectionExpression: 'id, fullname, email',
      })
      .promise();
    return user?.Item;
  }
  async findByEmail(email) {
    const user = await this.dynamoDbClient
      .query({
        TableName: this.usersTable,
        IndexName: 'emailIdx',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email },
      })
      .promise();

    return user.Items[0];
  }
}

module.exports = UserRepository;
