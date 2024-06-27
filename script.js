let baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromCode=document.querySelector(".form select");
let toCode=document.querySelector(".to select");;
let input;
for(let select of dropdowns){
    for(let curCode in countryList){
        let option=document.createElement("option");
        option.innerText=curCode;
        option.value=curCode;
        if(select.name==="from" && curCode==="USD"){
            option.selected="selected";
        }
        if(select.name==="to" && curCode==="PKR"){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change",()=> {
        updateFlag();
    });
}
function updateFlag(){
    let fromimg=document.querySelector(".form img");
    fromCode=document.querySelector(".form select");
    fromimg.src=`https://flagsapi.com/${countryList[fromCode.value]}/flat/64.png`;
    let toimg=document.querySelector(".to img");
    toCode=document.querySelector(".to select");
    toimg.src=`https://flagsapi.com/${countryList[toCode.value]}/flat/64.png`;
}
btn.addEventListener("click",async (evt)=> {
    evt.preventDefault();
    input=document.querySelector(".amount input");
    if(input.value<1){
        input.value=1;
    }
    baseUrl=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCode.value.toLowerCase()}/${toCode.value.toLowerCase()}.json`;
    let data=await (await fetch(baseUrl)).json();
    let msg=document.querySelector(".msg");
    msg.innerText=`${input.value} ${fromCode.value} = ${input.value*data[toCode.value.toLowerCase()]} ${toCode.value}`;
});