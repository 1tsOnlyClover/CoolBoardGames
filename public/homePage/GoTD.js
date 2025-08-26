// Making the Game of the Day component

// Get the current date from the user's computer
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];
console.log(formattedDate);

// Function to get the day of the month
function getDayOfMonth() {
    const dayOfMonth = currentDate.getDate(); // This will be an integer (1-31)
    return dayOfMonth;
}

// Displaying the Game of the Day and the date in the Game of the Day section
document.addEventListener('DOMContentLoaded', () => {
    const gotdDateElement = document.getElementById('gotd');
    const featuredLis = document.querySelectorAll('.featured-games ul li');
    const liCount = featuredLis.length;
    const dayOfMonth = getDayOfMonth();

    if (gotdDateElement && liCount > 0) {
        const gotdID = dayOfMonth % liCount;
        const gotdLi = featuredLis[gotdID].cloneNode(true);
        gotdDateElement.innerHTML = 
            `<strong>Today's Date: ${formattedDate}</strong>
            <br><strong>Game of the Day:</strong>`;
        gotdDateElement.appendChild(gotdLi);
    } else if (gotdDateElement) {
        gotdDateElement.textContent = `No featured games available.`;
    }
});