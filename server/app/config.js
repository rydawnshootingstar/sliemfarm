/*
    Holds static variables we're going to be using to calculate generation timelines
*/

const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

const refresh_rate = 5; //units

module.exports = {
    seconds,minutes,hours,days,refresh_rate
};