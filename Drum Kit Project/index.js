for (i=0; i<document.querySelectorAll(".drum").length;i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){
     makeSound(this.innerHTML);
     setAnimation(this.innerHTML);
    })
};


document.addEventListener("keypress",function(event){
    makeSound(event.key);
    setAnimation(event.key);
})

 function makeSound(key){
    switch (key) {
        case "w":
           var audio = new Audio("sounds/crash.mp3");
           audio.play();

            break;
            case "a":
               var audio = new Audio("sounds/kick-bass.mp3");
               audio.play();
               break;
               case "s":
               var audio = new Audio("sounds/snare.mp3");
               audio.play();
               break;
               case "d":
                   var audio = new Audio("sounds/tom-1.mp3");
                audio.play();
                break;
                case "j":
                   var audio = new Audio("sounds/tom-2.mp3");
                   audio.play();
                break;
                case "k":
                   var audio = new Audio("sounds/tom-3.mp3");
                   audio.play();
                   break;
                   case"l":
                   var audio = new Audio("sounds/tom-4.mp3");
                    audio.play();
                    break;
        default:console.log(key);
            break;
    }
 }

 function setAnimation(newkey){
    document.querySelector("."+ newkey).classList.add("pressed");
    setTimeout(function(){
       document.querySelector("."+ newkey).classList.remove("pressed")
    },100);
 }