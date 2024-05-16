import axios from 'axios';
const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = 'C7WWY8Z1RNWNN9LI'; // Replace 'YOUR_API_KEY' with your actual API key


class ApiService {
    static async getTopGainersAndLosers() {
      try {
        const response = await fetch(`${BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        if (data && data.top_gainers && data.top_losers) {
          return {
            top_gainers: data.top_gainers,
            top_losers: data.top_losers
          };
        } else {
          throw new Error('No gainers or losers data returned from API');
        }
      } catch (error) {
        throw new Error('Error fetching top gainers and losers: ' + error.message);
      }
    }

    async searchSymbol(keywords) {
            try {
                const response = await axios.get(`${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`);
                return response.data;
            } catch (error) {
                throw new Error(`Error searching symbols: ${error.message}`);
            }
        }
  }
  
  export default ApiService;
  