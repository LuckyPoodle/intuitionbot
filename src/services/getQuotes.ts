import axios from 'axios';

async function getQuote() {
  const apiUrl = 'https://zenquotes.io/api/random';
  try {
    const response = await axios.get(apiUrl);
    let quote = response.data;
    return quote[0]["q"] + " - " + quote[0]["a"];
  } catch (error) {
    console.log('got error response');
    return "We reached our API limit"
  }
}
  
export { getQuote };