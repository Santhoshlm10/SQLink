import inquirer from 'inquirer';
import { SQLog } from '../logger/logger.js';
import { STRINGS } from '../../strings.js';

export async function launchProvider() {
    try {
        SQLog.info("Please provide your MySQL configuration for connection",false)
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'host',
                message: STRINGS.MYSQL_HOST,
                default: 'localhost'
            },
            {
                type: 'input',
                name: 'user',
                message: STRINGS.MYSQL_USER,
                default: 'root'
            },
            {
                type: 'password',
                name: 'password',
                message: STRINGS.MYSQL_PASSWORD,
                mask: '*'
            },
            {
                type: 'input',
                name: 'port',
                message: STRINGS.MYSQL_PORT,
                default: '3306'
            },
            {
                type: 'input',
                name: 'database_name',
                message: STRINGS.MYSQL_DATABASE
            },
            {
                type: 'input',
                name: 'server_port',
                message: STRINGS.APP_PORT,
                default: '8081'
            }
        ]);
        return answers;
    } catch (error) {
        SQLog.error("MySQL configuration cancelled")
        return null;
    }
}