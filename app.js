let button =  document.getElementsByClassName("btn") ; 
let cross =  document.querySelector(".cross");
let explain = document.querySelector(".explain") ;
let inp  = document.getElementsByClassName("inp");
let nam =  document.getElementsByClassName("name");
let takeInput = document.getElementsByClassName("takeInput") ; 
let state = document.getElementsByClassName("status") ; 
let players =  document.getElementsByClassName("players");
let player =  document.getElementsByClassName("player");
let score =  document.getElementsByClassName("score") ;
let start = document.getElementsByClassName("start") ;  
let result = document.getElementsByClassName("result") ; 


//Initiallising Important data .  
let currValueSelect = [0 , 0 , 0 , 0 , 0] ; 
let currScore = [0 , 0 , 0 , 0 , 0] ; 
let currentPlayers = 5 ; 
let totalPlayer = 5 ; 
let isAllPlayerGaveResponse= 0;   


//Explain Information .  
button[0].style.display = 'none' ; 
cross.addEventListener('click'  , ()=>{
    explain.style.display = 'none' ; 
    button[0].style.display = 'inline' ; 
})
button[0].addEventListener('click' , ()=>{
    button[0].style.display = 'none' ; 
    explain.style.display = 'block';
})


//initially takeinput should be hidden .  
for(let i = 0 ; i<totalPlayer ; i++){
    takeInput[i].style.display = 'none' ; 
}


//Taking The Name Of All Players  . 
for(let i =  1  ; i<=totalPlayer; i++){
        button[i].addEventListener('click' ,  ()=>{
            if(takeInput[i-1].style.display == 'none' ){
                nam[i-1].innerHTML = `NAME: ${inp[i-1].value}😎`
                takeInput[i-1].style.display = 'inline' ;  
                inp[i-1].style.display = 'none' ; 
                score[i-1].innerHTML = `Score : ${currScore[i-1]}`;
            }
            else{
                let num = Number(takeInput[i-1].value) ; 
                takeInput[i-1].value = "" ; 
                if(num>=0 && num<=100){
                    state[i-1].innerHTML = "Number Added SuccessFully 👍"
                    currValueSelect[i-1] = num ; 
                    isAllPlayerGaveResponse+=1;
                }
                else{
                    state[i-1].innerHTML= "Bahen te Lend Autaad Me 😒😒 Enter in 0-100"

                }
            }
        })
}


//Roll the Game
start[0].addEventListener('click' , ()=>{
    if(isAllPlayerGaveResponse>=currentPlayers){
        let index =  nearest(currValueSelect) ; 
        currValueSelect.fill(0);
        if(index==-1){
            result[0].innerHTML =`Tie! No One Win This Round 🙁`;
        }
        else{
            result[0].innerHTML =`${nam[index].innerHTML.substring(6)} Win This Round 💥💥`;
            for(let i = 0 ; i<currValueSelect.length ; i++) {
                if(i!=index) currScore[i]-=1 ; 
                score[i].innerHTML = `Score : ${currScore[i]}`;
                state[i].innerHTML = ""
            }
            isAllPlayerGaveResponse = 0 ; 
            check(currScore) ; 
        }
    }
    else{
        result[0].innerHTML =`Please All player Gave Their Response 😊`;   
        result[0].style.color = 'red' ; 
    }
    setTimeout(()=>{
        result[0].innerHTML = "" ; 
        result[0].style.color = 'greenyellow'; 
    },5000)
})


//Finding Nearest Number compare to Average . 
function nearest(arr ) {
    let avg = 0 ; 
    for(let num of arr) avg+=num ; 
    avg = (avg/currentPlayers)*0.8 ; 
    let diff = Number.MAX_VALUE; 
    let index = 0  ;  
    for(let i = 0 ; i<arr.length ; i++){
        let currDiff = Math.abs(arr[i]-avg) ; 
        if(currDiff<diff) {
            diff = currDiff;  
            index = i ; 
        }
    }
    let count = 0 ; 
    for(let i  =  0 ; i<arr.length ; i++){
        if(diff==Math.abs(arr[i]-avg)) count++ ; 
    }
    if(count==1) return index ; 
    return -1  ; 
}


//eliminating player 
function check(arr){
    for(let i = 0 ; i<arr.length ; i++){
        if(arr[i]==-10){
            result[0].innerHTML += `, ${nam[i].innerHTML.substring(6)} Loose The Game  `
            setTimeout(()=>{
                player[i].style.display = 'none';
            } , 5000) ; 
            currentPlayers-- ; 
            currValueSelect[i] = 0 ;
            currScore[i] = 0  ; 
        }
    }
    setTimeout(()=>{
        if(currentPlayers==1){
            for(let i = 0 ; i<5 ; i++){
                if(player[i].style.display!='none'){
                    result[0].innerHTML  = `, ${nam[i].innerHTML.substring(6)} Win This Game Congratulation 💥😊💥 `
                    state[i].innerHTML = "You Win This Game Congrats 👍"
                    setTimeout(()=>{
                        location.reload() ; 
                    } , 7000)
                }
            }
        }
    },5050);
}

//Game Tie Conflict Left .  

// END OF CODE ---------------