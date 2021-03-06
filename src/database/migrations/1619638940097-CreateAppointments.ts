import {MigrationInterface, QueryRunner, Table} from "typeorm";
import Appointment from "../../models/Appointment";

export class CreateAppointments1619638940097 implements MigrationInterface {

    /**
     * Criações alterações de tabelas
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'   
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ]
            })
        )
    }
    /**
     * Retornar o que foi feito no metodo up
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}

/*****
 * **** 10:39 Criando tabela de agendamento
 */

/***
 * Linha do tempo
 * 
 * 1° semana: tabela Agendamento
 * 2° Semana: Usuarios
 * (NOVO DEV) 3° Edição Agendamentos
 * 4° semana: Compras
 * 
 * Só pode alterar uma migration se ela não for enviada para o controle de versão
 */
