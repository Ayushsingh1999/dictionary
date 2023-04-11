function solution(D) {
    // Create an array of days of the week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    // Create a dictionary to store the sums of values for each day of the week
    const output = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };
  
    // Convert the keys of the input dictionary to date objects
    const dates = Object.keys(D).map((key) => new Date(key));
  
    // Sort the date objects in ascending order
    dates.sort((a, b) => a - b);
  
    // Iterate over the sorted date objects
    for (let i = 0; i < dates.length; i++) {
      // Get the day of the week for the current date object
      const dayOfWeek = daysOfWeek[dates[i].getDay()];
  
      // Add the value for the current date to the sum for the corresponding day of the week
      output[dayOfWeek] += D[dates[i].toISOString().slice(0, 10)];
  
      // If this is not the last date object and there is a gap between this date and the next one,
      // fill in the gap with the average of the values for the previous and next days
      if (i < dates.length - 1 && dates[i + 1] - dates[i] > 86400000) {
        const prevDay = daysOfWeek[dates[i].getDay()];
        const nextDay = daysOfWeek[dates[i + 1].getDay()];
        const prevValue = D[dates[i].toISOString().slice(0, 10)];
        const nextValue = D[dates[i + 1].toISOString().slice(0, 10)];
        const avgValue = Math.round((prevValue + nextValue) / 2);
        for (let j = daysOfWeek.indexOf(prevDay) + 1; j < daysOfWeek.indexOf(nextDay); j++) {
          output[daysOfWeek[j]] = avgValue;
        }
      }
    }
  
    return output;
  }
  