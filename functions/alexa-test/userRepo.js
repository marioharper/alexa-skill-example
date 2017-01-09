'use strict';

const db = require('./db');

module.exports = {
  getUserByName,
  getMembersByTeam
}

///////////////////////////////////////////

function getUserByName(userName){
  return db.users.find( user => {
    return user.name.toUpperCase() === userName.toUpperCase();
  });
}

function getMembersByTeam(teamName){
  const users = db.users.filter( user => {
    return user.team.name.toUpperCase() === teamName.toUpperCase();
  });

  return users.map(user => user.name);
}