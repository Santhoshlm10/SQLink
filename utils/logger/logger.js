import chalk from 'chalk';
import moment from 'moment';

class SQLogClass {
    #getTimeStamp = () => moment().format('DD MMM YYYY hh:mm:ss A');
    #printMessage = (message, colorFunction) => {
        const now = this.#getTimeStamp();
        console.log(colorFunction(`${now} - ${message}`));
    };
    log = (message) => this.#printMessage(message, chalk.green);
    error = (message) => this.#printMessage(message, chalk.red);
    info = (message) => this.#printMessage(message, chalk.blue);
}
export const SQLog = new SQLogClass();
