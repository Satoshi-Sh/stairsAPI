// floor height 
//https://www.quora.com/What-is-floor-to-floor-height 
function inMeters(floor){
    return floor * 3
}

function inSteps(floor){
    return floor * 16
}

//https://www.apartmenttherapy.com/is-climbing-the-stairs-every-day-actually-a-good-workout-227727
function inCalories(floor){
    // up and down
    return (inSteps(floor) * (0.17 + 0.05)).toFixed(2)
}


exports.inMeters = inMeters
exports.inCalories = inCalories
exports.inSteps = inSteps