// 문자형
const userName:string = '안주현';

// 불린형
const fale:boolean = false;

// 숫자형
let age:number = 34;

// 튜플(배열셋)
let nameAndHeight:[string, number] = ['안주현',163];

// 함수에 반환값이 없는 경우
function wellcomeMessage():void {
    console.log('hello');
}

// 함수에 에러가 있거나 종료되지 않는 무한루프인 경우
function isError():never {
    throw new Error();
}
function infinityLoop():never{
    while(true){
    }
}

// 열거형(관련 된 상수의 집합) : 할당하지 않으면 자동할당
enum Os{
    window, // 0
    android, // 0 + 1
    ios, // 0 + 1 + 1
}
let myOs:Os;
myOs = Os.window;
console.log(myOs); // 0

// null 과 undefined
let nullTest:null = null;
let undefinedTest: undefined = undefined;

console.log(nullTest == undefinedTest); // true
console.log(nullTest === undefinedTest); // false

// 객체형
let addr:object;

addr = {
    city:'서울',
    gu:'중랑구',
}
