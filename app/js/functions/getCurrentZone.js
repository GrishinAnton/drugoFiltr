export function getCurrentZone(from, zone) {

    if(from == null || from.classList.contains(zone)){

        return from;
    } else {

        return getCurrentZone(from.parentElement, zone);
    }    
}