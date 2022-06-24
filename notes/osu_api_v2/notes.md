# Osu API (v2)

Osu! is a Rhythm video-game. This API provides us, developers, to get in-game data just as profile data, beatmap information, achievements, and much more. <br>
You can find the documentations in the following [link](https://osu.ppy.sh/docs)





## Endpoints

#### Base URL
The base URL is: https://osu.ppy.sh/api/[version]/ <br>

#### API Versions
There's 2 versions of osu api:
- v1: legacy api provided by the old site, will be deprecated soon;
- v2: current (not yet public, consider unstable and expect breaking changes)

I'm using v2 since I've used it before and it's going to be the main osu API in the near future.





## Authentication

There's plenty of ways to authenticate to osu! api, but I'm going to use the one called `Client Credentials Grant`.<br>

Osu API has a specific URL to request a token: https://osu.ppy.sh/oauth/token
Example request:
```js
const url = new URL(
    "https://osu.ppy.sh/oauth/token"
);

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};

let body = {
    "client_id": 1,
    "client_secret": "clientsecret",
    "grant_type": "client_credentials",
    "scope": "public"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response => response.json());
```

Example response (200):
```json
{
    "access_token": "verylongstring",
    "expires_in": 86400,
    "token_type": "Bearer"
}
``` 