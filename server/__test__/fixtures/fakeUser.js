const faker = require('faker')

module.exports =  {
      firstName: faker.name.firstName(),
      location:  faker.address.city(),
      gender: 'female',
      email: faker.internet.email(),
      password:faker.internet.password()
  }