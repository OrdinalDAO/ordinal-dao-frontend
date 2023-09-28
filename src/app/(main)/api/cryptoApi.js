export default async function handler(req, res) {
    try {
      const response = await fetch('https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/tb1pekd7wajtlpu7ncd0mvjvpge9penk8knfl7wcvtwjramv0ve3e39sx023kf/unspent-outputs?context=yourExampleString&limit=50', {
        method: 'GET',
        headers: {
          'X-API-Key': 'dc7f9eaa11f69a574dbe2c46c0aaf5dd8a20b6f1',
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(error.status || 500).end(error.message);
    }
  }
  