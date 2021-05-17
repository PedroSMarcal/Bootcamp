import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

/**
 * REPOSITORIES
 * Services
 */

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

export default usersRouter;
