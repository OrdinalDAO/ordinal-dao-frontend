export async function POST(request: Request) {
  try {

    let body= await request.json();
    let address=body.address;
    console.log('https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/'+address+'/unspent-outputs?context=yourExampleString&limit=50');
    const response = await fetch('https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/'+address+'/unspent-outputs?context=yourExampleString&limit=50', {
      method: 'GET',
      headers: {
        'X-API-Key': 'dc7f9eaa11f69a574dbe2c46c0aaf5dd8a20b6f1',
        'Content-Type': 'application/json',
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return new Response(JSON.stringify(address), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error:any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
export const dynamic = "force-static";
