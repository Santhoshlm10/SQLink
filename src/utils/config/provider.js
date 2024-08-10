import inquirer from 'inquirer';
import { SQLog } from '../logger/logger.js';

export async function launchProvider() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'host',
                message: 'Enter your MySQL host: ',
                default: 'localhost'
            },
            {
                type: 'input',
                name: 'user',
                message: 'Enter your MySQL user: ',
                default: 'root'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Enter your MySQL password: ',
                mask: '*'
            },
            {
                type: 'input',
                name: 'database_name',
                message: 'Enter database name: '
            },
            {
                type: 'input',
                name: 'server_port',
                message: 'Enter the port where app needs to be hosted: ',
                default: '8081'
            }
        ]);
        return answers;
    } catch (error) {
        SQLog.error("MySQL configuration exited")
        return null;
    }
}