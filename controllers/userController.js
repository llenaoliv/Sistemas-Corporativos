const bcrypt = require('bcrypt');

class userController {
    constructor(userService) {
        this.userService = userService;
    }

    async create(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const hashedSenha = await bcrypt.hash(senha, 10); // Criptografa a senha antes de cadastrá-la
            const novoUser = await this.userService.cadastrar(nome, email, hashedSenha);
            res.status(200).json(novoUser);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao inserir o novo usuário' });
        }
    }

    async localizarUsuarioPeloLogin(req, res) {
        const { login, senha } = req.body;
        try {
            // Você pode verificar a senha aqui, comparando-a com a senha criptografada no banco de dados
            // Mas isso depende de como você quer lidar com a autenticação
            const AllUsers = await this.userService.localizarUsuarioPeloLogin(login, senha);
            res.status(200).json(AllUsers);
        } catch {
            res.status(400).json({ error: 'Login inválido' });
        }
    }

    async localizarUsuarioPeloId(req, res) {
        const { id } = req.body;
        try {
            const idUser = await this.userService.localizarUsuarioPeloId(id);
            res.status(200).json(idUser);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar id' });
        }
    }
}

module.exports = userController;
