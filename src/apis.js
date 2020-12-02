// Modeled after: https://github.com/nickolasclarke/openaq

const openAQdomain = 'https://api.openaq.org/v1/';
const myAQdomain = 'api/v1/';

// params show be an object representation of the GET parameters,
// e.g. { key1: value1, key2: value2 } corresponds to "key1=value1&key2=value2"
function buildQueryString(params) {
  let queryString = [];
  for (const [key, value] of Object.entries(params)) {
    queryString.push(`${key}=${encodeURIComponent(value)}`);
  }
  return '?' + queryString.join('&')
}


class API {
  constructor(domain) {
    this.domain = domain;
  }

  async get(endpoint, params) {
    let url;
    if (!params) {
      url = this.domain + endpoint;
    } else {
      url = this.domain + endpoint + buildQueryString(params);
    }
    const response = await fetch(url);
    if (response.status >= 400) {
      throw new Error(`Bad response from ${url}`)
    }
    return response.json()
  }
}

export const openAQ = new API(openAQdomain);
export const myAQ = new API(myAQdomain);
