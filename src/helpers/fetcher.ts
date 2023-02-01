import fetch from 'node-fetch';
async function fetcher(url) {
    const data = await (await fetch(url)).json()
    return data;
}

export default fetcher