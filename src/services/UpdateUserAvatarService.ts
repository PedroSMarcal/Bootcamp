import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO{
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename, }: RequestDTO): Promise<void> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);
    }
}

export default UpdateUserAvatarService;