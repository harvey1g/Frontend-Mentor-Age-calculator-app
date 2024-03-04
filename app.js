document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var form = document.getElementById('form');

    var day = document.getElementById('day').value;
    var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;

    var display_day = document.getElementById('display-days');
    var display_month = document.getElementById('display-months');
    var display_year = document.getElementById('display-years');
    


    display_day.textContent = '--'
    display_month.textContent = '--'
    display_year.textContent = '--'

    var current_date =  new Date;

    var errorMessage = '';
    
    // Basic validation for day, month, and year
    if (day === '' || month === '' || year === '') {
        errorMessage = 'Please enter all fields.';
        form.classList.add('error')
    } else if (isNaN(day) || isNaN(month) || isNaN(year)) {
        errorMessage = 'Please enter valid numbers for day, month, and year.';
        form.classList.add('error')
    } else {
        var date = new Date(year, month - 1, day);
        if (date.getMonth() + 1 != month || date.getDate() != day || date.getFullYear() != year) {
            errorMessage = 'Please enter a valid date.';
            form.classList.add('error')
            
        } else {
            form.classList.remove('error')

            var difference = current_date - date
            var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
            var millisecondsInMonth = millisecondsInYear / 12;
            var millisecondsInDay = 1000 * 60 * 60 * 24;

            var years = Math.floor(difference / millisecondsInYear);
            var months = Math.floor((difference % millisecondsInYear) / millisecondsInMonth);
            var days = Math.floor((difference % millisecondsInMonth) / millisecondsInDay);

            
            let counter = 0;
            const interval = setInterval(() => {
                if (counter <= years) {
                    display_year.innerHTML = `${counter}`;
                    counter++;
                } else if (counter <= months + years) {
                    display_month.innerHTML = `${counter - years}`;
                    counter++;
                } else if (counter <= days + months + years) {
                    display_day.innerHTML = `${counter - months - years}`;
                    counter++;
                } else {
                    clearInterval(interval);
                }
            }, 25);
            
        }
        
    } 
    // Display error message if any
    document.getElementById('error-message').textContent = errorMessage;

    

});
