import fetch from 'node-fetch';
const fetcher = async (url: string) => {
    const data = await (await fetch(url)).json()
    return data;
}

export default fetcher