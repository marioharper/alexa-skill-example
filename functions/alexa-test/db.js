'use strict';

let db = {};

db.teams = [
  {
    id: 0,
    name: 'koopas'
  },
  {
    id: 1,
    name: 'jesters'
  }
];

db.users = [
  {
    name: 'mario',
    team: db.teams[0]
  },
  {
    name: 'garner',
    team: db.teams[0]
  },
  {
    name: 'kelly',
    team: db.teams[0]
  },
  {
    name: 'greg',
    team: db.teams[0]
  },
  {
    name: 'rob',
    team: db.teams[0]
  },
  {
    name: 'kishan',
    team: db.teams[0]
  },
  {
    name: 'jason',
    team: db.teams[1]
  },
  {
    name: 'timbo',
    team: db.teams[1]
  },
  {
    name: 'covington',
    team: db.teams[1]
  },
  {
    name: 'stephanie',
    team: db.teams[1]
  },
  {
    name: 'eric',
    team: db.teams[1]
  }
];

module.exports = db;