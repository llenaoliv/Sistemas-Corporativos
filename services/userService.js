//. /services/userService.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

class userService{
    constructor(userModel){
        this.User = userModel 
    }
    async cadastrar(nome, email, senha){
        try{
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            const novoUser = await this.User.create(
            {
                    nome:nome,
                    email:email, 
                    senha:hashedPassword
                 }
            );
            novoUser.senha='';
            return novoUser ? novoUser : null;
        }
        catch(error){
            throw error; 
        }
    }
    async localizarUsuarioPeloLogin(login,senha){
        try{
            const user = await this.User.findOne({ where: { login: login } });
            if (user && await bcrypt.compare(senha, user.senha)) {
                return user;
            } else {
                return null;
            }
        }
        catch(error){
            throw error;
        }
    }
    async localizarUsuarioPeloId(id){
        try{
            const idUser = await this.User.findOne();
            return idUser? idUser: null;
        }
        catch(error){
            throw error;
        }
    }
}
module.exports = userService
