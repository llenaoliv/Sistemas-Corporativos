const bcrypt = require('bcrypt');

class userService {
    constructor(userModel) {
        this.User = userModel;
    }

    async cadastrar(nome, email, senha) {
        try {
            const hashedSenha = await bcrypt.hash(senha, 10); // Hash da senha com salt de 10 rounds
            const novoUser = await this.User.create({
                nome: nome,
                email: email,
                senha: hashedSenha // Salve a senha criptografada no banco de dados
            });
            return novoUser ? novoUser : null;
        } catch (error) {
            throw error;
        }
    }

    async localizarUsuarioPeloLogin(login, senha) {
        try {
            const AllUsers = await this.User.findAll();
            return AllUsers ? AllUsers : null;
        } catch (error) {
            throw error;
        }
    }

    async localizarUsuarioPeloId(id) {
        try {
            const idUser = await this.User.findOne();
            return idUser ? idUser : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = userService;
