const e = require('express');
const UserModel = require('../models/UserModel');
const userService=require('../services/userService');
const userServiceOb=new userService();

const update = async (req, res) => {
  try {
    const user = await userServiceOb.updateUser(req);
    res.json(user);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await userServiceOb.remove(req);
    res.json(user);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const list = async (req, res) => {
  try {
    const user = await userServiceOb.list();
    res.json(user);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const signup = async (req, res) => {
  try {
    const user = await userServiceOb.signup(req, res);
    res.status(user.status).send(user.data);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const login = async (req, res) => {
  try {
    const user = await userServiceOb.login(req, res);
  } catch (error) {
    res.status(500).send({message : error.message, stack: e.stack, zzzz:44444})
  }
}

module.exports = {
  update, list, signup, login, deleteUser
}