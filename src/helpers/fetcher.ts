import fetch from 'node-fetch';

// Fetching Data from external url withing node
const fetcher = async (url: string) => {
    const data = await (await fetch(url)).json()
    return data;
}

export default fetcher