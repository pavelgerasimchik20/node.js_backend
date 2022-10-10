import * as readline from 'readline';

export class Run {

    readString = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    makeQuestion() {
        this.readString.question('Is this example useful? [y/n] ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                    console.log('Super!');
                    break;
                case 'n':
                    console.log('Sorry! :(');
                    break;
                default:
                    console.log('Invalid answer!');
            }
        });

    }
}