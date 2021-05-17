import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import authConfig  from '../config/auth'

interface RequestDTO {
    email: string;
    password: string;
}

interface ResponseDTO {
    user: User;
    token: string;
}

class AuthenticateUserService{
    public async execute ({ email, password }: RequestDTO): Promise<ResponseDTO>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user){
            throw new Error('Incorret email/password combination.');
        }

        // user.password - senha criptografad
        const passwordMacthed = await compare(password, user.password);

        if (!passwordMacthed){
            throw new Error('Incorrect email/password combination.');
        }

        //experiencia do usuario / segurança

        const { secret, expiresIn } =  authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token, 
        };
    }
}

export default AuthenticateUserService;