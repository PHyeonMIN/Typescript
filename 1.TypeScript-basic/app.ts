let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if(typeof userInput === 'string'){
    userName = userInput;
}
// userName = userInput;   // userInput에 현재 저장된 타입을 확인해야함

const generateError = (message: string, code: number): never => {
    throw {message: message, errorCode:code};
};

generateError('An error occurred!',500);
