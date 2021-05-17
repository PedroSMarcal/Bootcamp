import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmenrService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentsRepository.find();
    
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try{
        const { provider_id, date } = request.body;
        
        const parsedDate = parseISO(date);
        
        const createAppointment = new CreateAppointmentService();
        
        const appointment = await createAppointment.execute({
            date: parsedDate, provider_id 
        });
        return response.json( appointment );
    } catch (err){
        return response.status(400).json({ message: 'This Appointment is already booked' });
    }
}); 

export default appointmentsRouter;


// DTO: Data Transfer Object;
//Receber equisição, chamar outro arquivo e devolver uma resposta

// const appointmentsRepository = new AppointmentRepository;

// SoC: Separetion of Concerns (Separações de preocupações)
// appointmentsRouter.get('/', (request, response) => {
    //     return response.json({ message: 'Oi'})
    // })
    /***
 * #Partimos de uma imagem existente
 * FROM node:10
 * 
 * #Definimos a pasta e copiamos o arquivos
 * WORKDIR /src/app
 * COPY ../
 * 
 * #Instalamos as dependencias
 * RUN yarn
 * 
 * #Qual porta queremos expor?
 * EXPOSE 3333
 * 
 * CMD yarn start     
 * 
 * docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p  
 * netstat -a -b          
 * 
 * docker ps (roda os containers)
 * docker ps -a (apresenta todo os container )
 * docker logs |ID|
 */