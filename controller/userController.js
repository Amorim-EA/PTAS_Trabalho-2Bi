const User = require('../models/user');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        await User.create({
            name: name,
            password: password,
            email: email
        });

        console.log('Cadastro de usuário realizado com sucesso!');
        return res.json('Cadastro de usuário realizado com sucesso!');

    } catch (error) {
        console.log(`Erro ao cadastrar: ${error}`);
        return res.status(404).json("Ocorreu um erro ao cadastrar usuário!");

    };
}

const findAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        console.log(`Erro ao buscar todos: ${error}`);
        return res.status(404).json("Ocorreu um erro ao buscar todos usuários!");
    }
}

const findOneUser = async (req, res) => {
    const id = req.body.id;

    try {
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        return res.json(user); 

    } catch (error) {
        console.log(`Erro ao buscar um: ${error}`);
        return res.status(404).json("Ocorreu um erro ao buscar um usuário!");

    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await User.destroy({
            where: {
                id: id
            }
        });

        res.json('Usuário apagado com sucesso!');
        console.log('Usuário apagado com sucesso!');
        
    } catch (error) {
        console.log(`Erro ao deletar: ${error}`);
        return res.status(404).json("Ocorreu um erro ao deletar usuário!");
    };
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, password, email } = req.body;

    try {
        await User.update({
            name: name,
            password: password,
            email: email
        },{
            where: {
                id: id
            } 
        });

        res.json('Usuário atualizado com sucesso!');
        console.log('Usuário atualizado com sucesso!');
        
    } catch (error) {
        console.log(`Erro ao atualizar: ${error}`);
        return res.status(404).json("Ocorreu um erro ao atualizar usuário!");

    };
}


const authenticatedUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const isAuthenticated =  await User.findOne({
            where: {
                email: email,
                password: password
            }
        });

        const token = jwt.sign({
            id: email

        }, secret.secret, {
            expiresIn: 86400,

        });

        return res.json({
            name: isAuthenticated.name,
            email: isAuthenticated.email,
            token: token
        
        });

    } catch (error) {
        console.log(`Erro ao autenticar: ${error}`);
        return res.status(404).json("Ocorreu um erro autenticar usuário!");

    };
}

module.exports = { createUser, findAllUser, findOneUser, deleteUser, updateUser, authenticatedUser };
