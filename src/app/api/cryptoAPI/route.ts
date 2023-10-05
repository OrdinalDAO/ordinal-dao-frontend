export async function POST(request: Request) {
  try {

    let body= await request.json();
    let address=body.address;
    console.log('https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/'+address+'/unspent-outputs?context=yourExampleString&limit=50');
    const response = await fetch('https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/'+address+'/unspent-outputs?context=yourExampleString&limit=50', {
    // const response = await fetch('https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/tb1pekd7wajtlpu7ncd0mvjvpge9penk8knfl7wcvtwjramv0ve3e39sx023kf/unspent-outputs?context=yourExampleString&limit=50', {
    method: 'GET',
      headers: {
        'X-API-Key': '44a6e61641befa37910a8d66aa9b7683dc73810a', //original=dc7f9eaa11f69a574dbe2c46c0aaf5dd8a20b6f1
        'Content-Type': 'application/json',
      },
      cache: "no-store",
    });

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      return new Response(JSON.stringify(response), { status: response.status, headers: { 'Content-Type': 'application/json' } });
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
