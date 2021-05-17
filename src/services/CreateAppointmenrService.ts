import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/***
 * [x]Recebimento das informações 
 * [ ]Tratativa de erros/excessões
 * [x]Acesso ao diretorio
 * 
 * return response.status(400).json( {message: 'This Appointment is already booked'} )
 */

/***
 * Dependency Inversion (SOLID)
 */
interface RequestDTO{
    date: Date,
    provider_id: string 
}

class CreateAppointmentService {
    // private appointmentsRepository: AppointmentRepository;

    // constructor (appointmentsRepository: AppointmentRepository){
    //     this.appointmentsRepository = appointmentsRepository;
    // }

    public async execute ({ date, provider_id }: RequestDTO):  Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentRepository); 

        const appointmentDate = startOfHour(date);
        
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );
        
        if (findAppointmentInSameDate) {
            throw Error('This Appointment is already booked')
        }
        
        const appointment = appointmentsRepository.create({ 
            provider_id: provider_id, 
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;