- [Serve the frontend](#orgfbfbc25)
- [Example `env.js`](#org6e79f34)




<a id="orgfbfbc25"></a>

# Serve the frontend

Create `env.js` and add the relevant environment variables into it. Example
shown [here](#org6e79f34)

```sh
cd frontend/public/
touch env.js
python -m http.server 8000
```

Then open <http://localhost:8000/> or <http://localhost:8000/index.html> in a web-browser


<a id="org6e79f34"></a>

# Example `env.js`

```JavaScript
const env = {
  port: '8080',
  host: 'localhost',
  pexelsAPI: 'api-key-here'
};

export { env };
```

