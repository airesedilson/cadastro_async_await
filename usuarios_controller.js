const knex = require('./../database/index');
const router = require("../routes/usuarios");
const crypto = require('crypto');

const usuariosConfig = require('../config/usuarios.json');

module.exports = {
  
   async index(req, res){
     const user = await knex('users').select('*');
     return res.json(user);
    },
    
    async create(req, res){
      const {username, user_type, password, access, first_name, last_name, sexo, phone_number, email} = req.body;
     //const id = '${crypto.randomBytes(4).toString('Hex')}${last_name[0]}${first_name[0]}';
     
     
     
    //id = `${crypto.randomBytes(4).toString('Hex')}${last_name[0]}${first_name[0]}`;
      let iter; 
      try{
        const user = await knex('person').where({phone_number}).orWhere({email}).first();
        if(user) return res.status(400).send({error: 'user already exists'});
        
        
        iter =  await knex('users').insert({
        id,
          username,
          password,
          access,
          user_type
        }); 
      if(iter){
        await knex('person').insert({
          first_name,
          last_name,
          sexo,
          phone_number,
          email,
          id
        })
      } 
       return res.json( iter );
      } catch(err){
        return res.status(400).send({error: 'Registration failed'});
      }
    },
    
    
  
  };