const display = document.getElementById("display");
const output = document.getElementById('output');
const buttons=document.querySelectorAll('button')

let Input=''
let operator=''

buttons.forEach((button) => {
    button.addEventListener('click',()=>{
        const value=button.textContent;
        
        if(value>='0' && value<='9'){
            Input+=value;
            display.value=Input;
        }else if (value==='+' ||value==='-'|| value ==='*' || value ==='/') {
                operator=value;
                Input +=operator;
                display.value=Input;
        }else if(value==='='){
            try {
                const result=eval(Input).toString();
                output.innerText=result.slice(0,6);
                operator='';
            } catch (error) {
                output.innerText='error';
                Input='';
            }
        }else if(value === 'clear'){
            Input='';
            operator='';
            display.value=Input;
            output.innerText=''
        }else if(value === 'del'){
            Input=Input.slice(0,-1);
            display.value=Input;
        }else if (value==='.') {
            if(!Input.includes('.')){
                Input+=value;
                display.value=Input;
        }
        }else if (value === '%') {
            if (Input) {
                const percentage = parseFloat(Input) / 100;
                output.innerText = percentage.toString();
                Input = percentage.toString(); 
            }
        }
    })
});