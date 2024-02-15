// 기본 타입사용법
function hello(name:string):string{
    return `hi, ${name}`;
}

// 옵셔널: 옵셔널값이 꼭 뒤에 위치하도록
function hello2(name:string, age?:number):string{
    if(age !== undefined){
        return `hi, ${name}. you are ${age}`;
    }else{
        return `hi, ${name}`;
    }
}

// 나머지 매개변수타입
function addNum(...nums:number[]):number{
    return nums.reduce((result,num)=>result+num,0);
}

addNum(1,3,5,6,7); // 22


// 함수 오버로드 타입지정
interface User{
    name:string;
    age:number;
}

//오버로드 해줘야함
function join(name:string, age:string):string;
function join(name:string, age:number):User;
function join(name:string, age:number|string):User|string{
    if(typeof age !== 'number'){
        return '나이는 숫자로 입력해주세요';
    }else{
        return {
            name,
            age,
        }
    }
}

const son:User = join('son',30);

// this 타입지정
const me:User = {name:'juhyun',age:34};
function showName(this:User, gender:'m'|'f'):void{
    console.log(this.name);
}

const showMe = showName.bind(me);
showMe('f');