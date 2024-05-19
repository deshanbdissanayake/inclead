// Define the formatDate function first
const formatDateToObject = (datetimeStr) => {
    // Split the datetime string into date and time parts
    let parts = datetimeStr.split(' ');
    let datePart = parts[0];
    let timePart = parts[1] + ' ' + parts[2]; // Combine time and period (AM/PM)
    
    // Split the date part into year, month, and day
    let dateParts = datePart.split('-');
    let year = parseInt(dateParts[0], 10);
    let month = parseInt(dateParts[1], 10) - 1; // Months are 0 indexed in JS
    let day = parseInt(dateParts[2], 10);
    
    // Split the time part into hours and minutes
    let timeParts = timePart.split(':');
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    
    // Determine AM/PM and adjust hours if necessary
    if (parts[3] === 'PM' && hours < 12) {
        hours += 12;
    }
    
    // Create the Date object
    let datetime = new Date(year, month, day, hours, minutes);
    return datetime;
};

// Function to format date to "YYYY-MM-DD hh:mm a" format
const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    return `${year}-${month}-${day} ${hours}:${minutes} ${meridiem}`;
}

export {formatDateToString, formatDateToObject }