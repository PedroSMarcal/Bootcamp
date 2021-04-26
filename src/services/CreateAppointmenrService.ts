import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/***
 * [x]Recebimento das informações 
 * [ ]Tratativa de erros/excessões
 * [x]Acesso ao diretorio
 * 
 * return response.status(400).json( {message: 'This Appointment is already booked'} )
 */

interface RequestDTO{
    date: Date,
    provider: string 
}

/***
 * Dependency Inversion (SOLID)
 */
class CreateAppointmentService {
    private appointmentsRepository: AppointmentRepository;

    constructor (appointmentsRepository: AppointmentRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute ({ date, provider }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);
        
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
            );
            
            if (findAppointmentInSameDate) {
                throw Error('This Appointment is already booked')
            }
            
            const appointment = this.appointmentsRepository.create({ 
                provider, 
                date: appointmentDate,
            });
            
        return appointment;
    }
}

export default CreateAppointmentService;