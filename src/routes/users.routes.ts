import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmenrService'


const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try{
        return response.send()
    } catch (err){
        return response.status(400).json({ message: 'This Appointment is already booked' });
    }
   }); 

export default usersRouter;
