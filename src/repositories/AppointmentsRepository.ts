import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// interface CreateAppointmentDTO {
//     provider: string;
//      date: Date
// }

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
    public async findByDate (date: Date): Promise<Appointment | null> {
        // const findAppointment = this.appointment.find(appointment =>
        //     isEqual(date, appointment.date), 
        //     ); 
            
        const findAppointment = await this.findOne({
            where: { date }, 
        });

            return findAppointment || null;
        };


        // private appointment: Appointment[];
    
        // constructor(){
        //     this.appointment = [];
        // }
    
        // public all (): Appointment[] {
        //     return this.appointment;
        // }

    //provider: string, date: Date

    // public create({ date, provider }: CreateAppointmentDTO ): Appointment {
    //     const appointment = new Appointment({ provider, date });

    //     this.appointment.push(appointment);

    //     return appointment;
    // }
}

export default AppointmentRepository;