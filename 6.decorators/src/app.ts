function Logger(logString: string) {
    console.log('1.LOGGER FACTORY');
    return function(constructor: Function){
        console.log("4.",logString);
        console.log(constructor);
    };
};

function WithTemplate(template: string, hookId: string){
    console.log('2.TEMPLATE FACTORY');
    return function<T extends { new (..._: any[]): {name: string} }>(originalConstructor: T){
        // constructor을 리턴을 하기 위해 - 새오브젝트를 실행하는 새 키워드로 컨스트럭터 함수를 사용해야함
        return class extends originalConstructor {  // 클래스라는 키워드가 constructor 함수를 만드는 syntactic sugar가 된다.
            constructor(..._: any[]) {
                super();
                console.log('3.Rendering template');
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            };
        };
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>','app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person object...');
    }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Accessor decorator!');
    console.log(target);        // 오브젝트 프로토타입
    console.log(name);
    console.log(descriptor);    // ( configurable, enumerable, get, set 등등 )
}

function Log3(target: any, name: string|Symbol, descriptor: PropertyDescriptor){
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string|Symbol, position: number){
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);  // 인덱스
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number){
        if(val > 0){
            this._price = val;
        }else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number){
        return this._price * (1+tax);
    }
}

const p1 = new Product('Book',19);
const p2 = new Product('Book 2', 29);

function Autobind(_: any, _2: string | Symbol | number, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage.bind(p));
