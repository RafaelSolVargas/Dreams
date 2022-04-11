const bcrypt = require('bcryptjs');
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const { User } = require('../../src/models');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not be able to login with a user with invalid credentials', async () => {
    /* Trying to login */
    const response = await request(app)
      .get('/api/v1/auth')
      .send({
        email: 'teste@gmail.com',
        password: 'teste',
      });

    expect(response.status).toBe(401);
  });
  it('should receive JWT after login', async () => {
    const userData = {
      name: 'Rafael Vargas',
      nickName: 'Vulcano',
      dateBirth: '2000-05-02',
      nationality: 'brazilian',
      homepage: 'www.homepage.com',
      email: 'rafael@gmail.com',
      password: 'RafaelVargas1@',
      gender: 'male',
      race: 'white',
      maritalStatus: 'married',
      degreeInstruction: 'master',
    };

    await User.create(userData);

    /* Trying to login */
    const response = await request(app)
      .get('/api/v1/auth')
      .send(userData);

    expect(response.body.user.token).toBeDefined();
  });
  it('should verify if the password has been encrypted', async () => {
    const userData = {
      name: 'Rafael Vargas',
      nickName: 'Vulcano',
      dateBirth: '2000-05-02',
      nationality: 'brazilian',
      homepage: 'www.homepage.com',
      email: 'rafael@gmail.com',
      password: 'RafaelVargas1@',
      gender: 'male',
      race: 'white',
      maritalStatus: 'married',
      degreeInstruction: 'master',
    };
    const userCreated = await User.create(userData);
    const user = await User.scope('withPassword').findByPk(userCreated.id);

    /* Trying to login */
    await request(app)
      .get('/api/v1/auth')
      .send(userData);

    const compareHash = await bcrypt.compare(userData.password, user.password);
    const different = userData.password !== user.password;
    expect(compareHash && different).toBe(true);
  });
});
