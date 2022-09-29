/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');

const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);

const newDog = {
  name : "Perrito",
  height : "50",
  weight : "40",
  life_span : "22",
}

const dogTest = {
	name: "testing",
	height: "10",
	weight: "70",
	life_span: "15",
	temperament : ["Tenacious","Friendly","Devoted","Loyal","Attentive","Courageous"],
	image:""
}

describe('Dog routes', () =>{
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  beforeEach(() => Dog.sync({ force : true }).then(() => Dog.create(newDog)));

  describe("-- Testing route GET /dogs --", () => {
    it('Should get 200', () => agent.get('/dogs').expect(200))
    it('Should get 404', () => agent.get('/drog').expect(404))
  });
  describe("-- Testing route GET /dogs/:id --", () =>{
    it('Should get 200', () => agent.get('/dogs/1').expect(200))
    it('Should get 404', () => agent.get('/dogs/notId').expect(404))
  });
  describe("-- Testing route DELETE /dogs/notId --", ()=>{
    it('Should get 404 if dog doesn\'t exist', () => agent.delete('/dogs/notId').expect(404))
  })
  
})