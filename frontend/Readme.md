- [Serve the frontend](#orgddc79e0)
- [Example `env.js`](#orgcf19497)




<a id="orgddc79e0"></a>

# Serve the frontend

Create `env.js` and add the relevant environment variables into it. Example
shown [here](#orgcf19497)

```sh
cd frontend/public/
touch env.js
python -m http.server 8000
```

Then open <http://localhost:8000/> or <http://localhost:8000/index.html> in a web-browser


<a id="orgcf19497"></a>

# Example `env.js`

```JavaScript
const env = {
  port: '8080',
  host: 'localhost',
  pexelsAPI: 'api-key-here'
};

export { env };
```

|     | hello | what |    |      |
|-----|-------|------|----|------|
| hey |       |      | no | yaaa |

