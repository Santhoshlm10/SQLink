import chalk from 'chalk';
import moment from 'moment';

class SQLogClass {
    #getTimeStamp = () => moment().format('DD MMM YYYY hh:mm:ss A');
    #printMessage = (message, colorFunction,withTime) => {
        if(withTime){
            const now = this.#getTimeStamp();
            console.log(colorFunction(`${now} - ${message}`));
        }else{
            console.log(colorFunction(`${message}`));
        }
    };
    #printRequestMessage = (message, colorFunction,type) => {
        const now = this.#getTimeStamp();
        console.log(`${now} - ${colorFunction(type)} - ${message}`);
    };
    log = (message,withTime) => this.#printMessage(message, chalk.greenBright,withTime);
    error = (message,withTime) => this.#printMessage(message, chalk.redBright,withTime);
    info = (message,withTime) => this.#printMessage(message, chalk.blueBright,withTime);
    success = (message,withTime) => this.#printMessage(message,chalk.greenBright,withTime);
    request = (message) => this.#printRequestMessage(message,chalk.greenBright, "REQUEST")
    response = (message) => this.#printRequestMessage(message,chalk.blueBright, "RESPONSE")
}
export const SQLog = new SQLogClass();
