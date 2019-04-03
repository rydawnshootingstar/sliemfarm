const getBackground = ({time})=> {
    //midnight - 3 am
    if(0<=time && time < 4){
        return 8;
    }
    //4 am - 7am
    if(4<=time && time < 8){
        return 1;
    }
    //8am - 11am
    if(8<=time && time < 12){
        return 2;
    }
    //noon - 3pm
    if(12<=time && time < 16){
        return 3;
    }
    //4pm - 5pm
    if(16<=time && time < 18){
        return 4;
    }
    //6pm - 7pm
    if(18<=time && time < 19){
        return 5;
    }
    //7pm - 8pm
    if(19<=time && time < 21){
        return 6;
    }
    //9 pm - midnight
    if(21<=time && time < 23){
        return 7;
    }
}

export default getBackground;