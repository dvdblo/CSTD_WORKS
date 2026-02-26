/*
 * Actividad en clase: JavaScript
 *
 * David Blanco Ortiz
 * A01786713
 * 2026-02-25
 * 
 * This program have some basic JavaScript functions elaborated for learning the language
 */

"use strict";

//RETURNS THE FIRST UNIQUE ELEMENT THAT APPEARS ON A STRING
function firstNonRepeating(str) {
    const candidates = [];
    for(let i = 0; i < str.length; i++) {

        let found = false;

        for(let cand of candidates) {
            if(cand.char == str[i]) {
                cand.count += 1;
                found = true;
            }
        }

        if(!found) {
            candidates.push({char: str[i], count: 1});
        }
    }

    for(let index in candidates) {
        if(candidates[index].count == 1) {
            return candidates[index].char;
        }
    }
}

//USES BUBBLE SORT TO SORT AN ARRAY
function bubbleSort(datos) {
    let aux;
    let cond; //para bandera
    for(let i = 0; i < datos.length; i++) {
        cond = 0;

        for(let j = 0; j < datos.length -i -1; j++) {
            if(datos[j] > datos[j+1]){
                aux = 0;
                cond++;
                aux = datos[j];
                datos[j] = datos[j+1];
                datos[j+1] = aux;
            }
        }
        if(cond == 0) { //FLAG: stops the sorting if there was no more modifications
            break;
        }
    }
    return datos;
}

//INVERTS AN ARRAY USING ANOTHER ONE
function invertArray(arr) {
    let invArr = [];
    for(let i = arr.length-1; i >= 0; i--) {
        invArr.push(arr[i]);
    }
    return invArr;
}

//INVERTS AN ARRAY WITHOUT AN AUXILIAR ARRAY
function invertArrayInplace(arr) {
    let i = 0;
    let j = arr.length -1;
    let temp;

    while(i < j) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        i++;
        j--;
    }
    return arr;
}

//CAPITALIZES THE FIRST CHARACTER IN EVERY WORD OF A SENTENCE
function capitalize(str) {
    let result = "";
    let cap = true;

    for(let c of str) {
        if(cap && c >= "a" && c <= "z") {
            result += String.fromCharCode(c.charCodeAt(0) - 32);  //Uses ASCII for the convertion
            cap = false;
        } else {
            result += c;
            cap = (c == " ");
        }
    }
    return result;   
}

//RETURNS THE GCD USING THE EUCLIDEAN ALGORITHM (divides the larger number by the smaller until the module is 0)
function mcd(a, b) {
    if(b > a) {
        let aux = a;
        a = b;
        b = aux;
    }
    while (b != 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

//ENCODES SOME CHARACTERS WITH A NUMBER THAT IS VISUALLY SIMILAR
function hackerSpeak(str) {
    let result = "";

    for(let c of str) {

        switch(c) {
            case "a":
                result += "4";
                break;
            
            case "s":
                result += "5";
                break;

            case "i":
                result += "1";
                break;

            case "e":
                result += "3";
                break;

            case "o":
                result += "0";
                break;

            default:
                result += c;
                break;
        }
    }
    return result; 
}

//OBTAINS A LIST WITH ALL THE POSITIVE POSIBLE FACTORS OF A NUMBER
function factorize(num) {
    let fact = [];

    for(let i = num; i > 0; i--) {
        if(num % i == 0) {
            fact.push(i);
        }
    }

    fact = invertArrayInplace(fact);
    return fact;
}

//CLEANS AN ARRAY SO THERE LAST ONLY UNIQUE VALUES
function deduplicate(arr) {
    let plicate = [];
    let comp;

    for(let i in arr) {
        comp = true;

        for(let j in plicate) {
            if(arr[i] == plicate[j]){
                comp = false;
                break;
            }
        }

        if(comp) {
            plicate.push(arr[i]);
        }
    }
    return plicate;
}

//RETURNS THE SHORTEST STRING IN A LIST
function findShortestString(arr) {

    if(arr[0] == undefined) {
        return 0;
    }
    
    let min = arr[0].length;

    for(let i = 1; i < arr.length; i++) {
        if(arr[i].length < min) {  //Takes the shortest
            min = arr[i].length;
        }
    }
    return min;
}

//DETECTS IF A STRING IS A PALINDROME
function isPalindrome(str) {
    let cadena = [];
    let palindrome = "";

    for(let c of str) {  //Spreads the string into an array
        cadena.push(c);
    }

    for(let i = str.length -1; i >= 0; i--) {  //Inverts the array (string)
        palindrome += cadena[i];
    }

    if(str == palindrome) {  //If the original and the inverted are the same, it is a palindrome
        return true;
    } else {
        return false;
    }
}

//SORTS A LIST OF STRINGS USING THE PREVIOUS BUBBLE SORT
function sortStrings(arr) {
    return bubbleSort(arr);
}

//RETURS A LIST WITH THE AVERAGE AND THE MODE
function stats(arr) {
    if(arr[0] == undefined) {
        return [0,0];
    }
    let res = [0,0];  //List with the results
    let moda = [0,0,0,0];  //The first pair contains the actual value with its repetitions, the second pair contains the most popular value
    let tam = arr.length;
    let posibles = [];  //Used for the case where all the values have the same repetitions
    let first = arr[0];
    let aux = bubbleSort(arr);  //Allows to check repetitions in an ordenated way (this uses less "for" cycles)

    for(let i = 0; i < tam; i++) {
        res[0] += aux[i];  //Sum for average
        
        if(aux[i] == moda[0]) {  //Detects a repetition
            moda[1]++;
        } else if(moda[1] > moda[3]){  //Stores the brand new most popular value
            posibles.push(moda[1]);  //Store the repetitions of that value
            moda[2] = moda[0];
            moda[3] = moda[1];

            moda[0] = aux[i];
            moda[1] = 0;
            moda[1]++;
        } else {       //If the actual value never reaches the populariti of the actual mode, it is discarted
            posibles.push(moda[1]);  //We still store its repetitions
            moda[0] = aux[i];
            moda[1] = 0;
            moda[1]++;
        }
    }
    posibles.push(moda[1]); //The for loop prevents to store the repetitions for the last value checked, so we do this here

    if(moda[3] == 0) {  //If the most popular value repetitions is = 0, that means that there was a unique value in the array, so it is stored in the result
            res[1] = moda[0];
    } else {
        let cond = true;    //To check if all values have the same repetitions
        let equal = posibles[1];  //It ignores the index 0 because there is going to be a 0 always
        for(let k = 2; k < posibles.length; k++) { 
            if(posibles[k] != equal) {  //If there is at least one different, there is at leas one more popular that the others
                cond = false;
                break;
            }
        }
        if(cond) {
            res[1] = first;  //That means all have the same repetitions, so it stores the first one of the original array.
        } else {
            res[1] = moda[2];
        }
    }

    res[0] = res[0]/tam;  //Calculates the average

    return res;
}

//RETURNS THE MOST POPULAR STRING IN A LIST, USES THE STATS FUNCTION BUT TAKING ONLY THE MODE RESULT
function popularString(arr) {

    let s = stats(arr);
    if(arr[0] == undefined) {
        return "";
    }
    return s[1];
}

//DETECTS IF A NUMBER IS A POWER OF 2
function isPowerOf2(number) {
    return Number.isInteger(Math.sqrt(number));  //If the result is an integer, that means is an excact square root (so the number is a power of 2)
}

//SORT AN ARRAY AND PLACES THE RESULT IN DESCENDING ORDER
function sortDescending(arr) {
    let ordenado = bubbleSort(arr);
    return invertArray(ordenado);
}


export {
    firstNonRepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
};
