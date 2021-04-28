import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmenrService'

// DTO: Data Transfer Object;
//Receber equisição, chamar outro arquivo e devolver uma resposta

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository;

// SoC: Separetion of Concerns (Separações de preocupações)

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try{
        const { provider, date } = request.body;
    
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentsRepository,
        );
    
    const appointment = createAppointment.execute({
        date: parsedDate, provider 
    });
    return response.json( appointment );
    } catch (err){
        return response.status(400).json({ message: 'This Appointment is already booked' });
    }
   }); 

export default appointmentsRouter;

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