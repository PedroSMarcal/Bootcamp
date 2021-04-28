import {MigrationInterface, QueryRunner, Table} from "typeorm";

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
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'   
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp'
                    }
                ]
            })
        )
    }
    /**
     * Retornar o que foi feito no metodo up
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
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
 */
