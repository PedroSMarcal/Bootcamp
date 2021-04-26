import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
    provider: string;
     date: Date
}

class AppointmentRepository {
    private appointment: Appointment[];

    constructor(){
        this.appointment = [];
    }

    public all (): Appointment[] {
        return this.appointment;
    }

    public findByDate (date: Date): Appointment | null {
        const findAppointment = this.appointment.find(appointment =>
             isEqual(date, appointment.date), 
        ); 

        return findAppointment || null;
    };

    //provider: string, date: Date

    public create({ date, provider }: CreateAppointmentDTO ): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointment.push(appointment);

        return appointment;
    }
}

export default AppointmentRepository;