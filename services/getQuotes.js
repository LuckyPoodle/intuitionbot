async function getQuote() {
    
    const apiUrl = 'https://zenquotes.io/api/random';
    try {
      const response = await fetch(apiUrl);
      let quote = await response.json();
      return quote[0]["q"]+" - "+quote[0]["a"];
    } catch (error) {
        console.log('got error response');
      return "We reached our API limit"
    }
  }
  
  module.exports = { getQuote };