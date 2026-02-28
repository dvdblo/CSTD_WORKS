//Este codigo contienen funciones de traducción entre español e ingles, y una funcion para controlar la apertura de un formulario

let cont = 0;  //Controla mensajes del botos
let english = false; //Controla traducción

function formulario() {  //Mensajes de boton en español

    if(english) {
        form();
    } else {

    switch(cont) {
        case 0: document.getElementById("Seguro").innerHTML = "¿Estás seguro?"; cont++; break;
        case 1: document.getElementById("Seguro").innerHTML = "¿Segurísimo?"; cont++; break;
        case 2: document.getElementById("Seguro").innerHTML = "Piensalo bien"; cont++; break;
        case 3: document.getElementById("Seguro").innerHTML = "¿Pero si en serio estas segurisísimo?"; cont++; break;
        case 4: document.getElementById("Seguro").innerHTML = "RASTREANDO UBICACIÓN..."; cont++; break;
        case 5: document.getElementById("Seguro").innerHTML = "REALIZANDO COBRO..."; cont++; break;
        case 6: window.open("https://docs.google.com/forms/d/e/1FAIpQLSd5AgdaqM_LsZo4RcZRIOzdteej4e2RpNnH-JfMgLkf6IseiQ/viewform?usp=publish-editor", "_blank"); cont++; break;
        case 7: document.getElementById("Seguro").innerHTML = "¡YA DEJA DE PRESIONARME!"; cont++; break;
        case 8: document.getElementById("Seguro").innerHTML = "No te quejes cuando empiece a hacer cosas raras"; cont++; break;
        default: cont++;
    }

    if(cont > 9) {
        if(cont == 17) {
            document.getElementById("Seguro").innerHTML = "¡¡¡AYUDAME!!!";
        } else if(cont == 100) {
            document.getElementById("Seguro").innerHTML = "Ese soy yo ahora mismo porque no me ayudaste";
            window.open("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDCA0lXn-oZ5G_csiqlRpQq7TXs7UvY6OXw&s", "_blank");
        } else {
            let randomShortString = Math.random().toString(36).substring(2, 12);
            document.getElementById("Seguro").innerHTML = randomShortString;
        }
    }

    }
}

function form() { //Mensajes de boton en inglés

        switch(cont) {
        case 0: document.getElementById("Seguro").innerHTML = "Are you sure?"; cont++; break;
        case 1: document.getElementById("Seguro").innerHTML = "Really sure?"; cont++; break;
        case 2: document.getElementById("Seguro").innerHTML = "Think it through"; cont++; break;
        case 3: document.getElementById("Seguro").innerHTML = "But are you seriously absolutely sure?"; cont++; break;
        case 4: document.getElementById("Seguro").innerHTML = "TRACKING LOCATION..."; cont++; break;
        case 5: document.getElementById("Seguro").innerHTML = "PROCESSING PAYMENT..."; cont++; break;
        case 6: window.open("https://docs.google.com/forms/d/e/1FAIpQLSd5AgdaqM_LsZo4RcZRIOzdteej4e2RpNnH-JfMgLkf6IseiQ/viewform?usp=publish-editor", "_blank"); cont++; break;
        case 7: document.getElementById("Seguro").innerHTML = "STOP PRESSURING ME ALREADY!"; cont++; break;
        case 8: document.getElementById("Seguro").innerHTML = "Don't complain when I start doing weird things"; cont++; break;
        default: cont++;
    }

    if(cont > 9) {
        if(cont == 17) {
            document.getElementById("Seguro").innerHTML = "HELPMEEEE!!!";
        } else if(cont == 100) {
            document.getElementById("Seguro").innerHTML = "That's me right now because you didn't help me.";
            window.open("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDCA0lXn-oZ5G_csiqlRpQq7TXs7UvY6OXw&s", "_blank");
        } else {
            let randomShortString = Math.random().toString(36).substring(2, 12);
            document.getElementById("Seguro").innerHTML = randomShortString;
        }
    }
}

function traduccion() {
    english = !english;

    //Traducción español-inglés
    if(english) {
        ["Español",
            "THEY ARE LYING TO YOU",
            '"Some will call us conspiracy theorists, I prefer to think that we are aware".',
            "- The mysterious cat, 2026.",
            "Apply to our secret café if you identify with the following aspects: ",
            "You feel that the government is always watching you. <br></br>",
            'You believe in "conspiracy" theories and they call you crazy for it. <br></br>',
            "You have had paranormal experiences with extraterrestrial beings. <br></br>",
            "You live outside the dogmas established by society. ",
            "After being accepted, you will be able to access our secret menu and have a coffee with the alien cat",
            '"I will be waiting for you".',
            "- The alien cat, 2026.",
            "CLICK AND REGISTER NOW!!",
            "REGISTER",
            ].forEach((t,i)=>document.querySelectorAll(".traducir")[i].innerHTML=t);

            cont--; //Para traducir mensaje de boton
            form();
    } else { //Traducción ingles-español
        ["English",
            "TE ESTÁN MINTIENDO",
            '"Algunos nos llamarán conspiranóicos, yo prefiero pensar que somos conscientes".',
            "- El gato misterioso, 2026.",
            "Postula a nuestro café secreto si te identificas con los siguientes aspectos: ",
            "Sientes que el gobierno siempre te observa. <br></br>",
            'Crees en teorías "conspiranóicas" y te llaman loco por eso. <br></br>',
            "Has vivido experiencias paranormales con entes extraterrestres. <br></br>",
            "Vives fuera de los dogmas establecidos en la sociedad. ",
            "Después de ser aceptado, podrás acceder a nuestro menú secreto, y podrás tomarte un café con el gato alien",
            '"Te estaré esperando".',
            "- El gato alien, 2026.",
            "¡¡DA CLICK Y REGISTRATE AHORA!!",
            "REGISTRATE",
        ].forEach((t,i)=>document.querySelectorAll(".traducir")[i].innerHTML=t);

        cont--;
        formulario();
    }

}