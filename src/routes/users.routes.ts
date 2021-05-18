import { request, response, Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated'
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try{
        const { name, email, password } = request.body;
        
        const createUser = new CreateUserService();
        
        const user = await createUser.execute({
            name, 
            email, 
            password,
        }); 
        
        return response.json(user);
    } catch (err){
        return response.status(400).json({ message: 'This Appointment is already booked' });
    }
}); 

usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'), async(request, response) => {
    try{
        const updateUserAvatar = new UpdateUserAvatarService();

        await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

    } catch (err) {
        return response.status(400).json({ error: err.message });
    }

    return response.json({ ok: true })
})

export default usersRouter;

/**
 * REPOSITORIES
 * Services
 */
