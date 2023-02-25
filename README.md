# Netflix-Clone
## Objective
> A website app for my senior project, replicating Netflix with my childhood VHS tapes. My goal of this project is to prepare myself and learn the industry standard of web development on a full-stack level.

## Content
[Tech Stack](https://github.com/BrenanMarenger/Capstone-Project#tech-stack)

[Project Map](https://github.com/BrenanMarenger/Capstone-Project#project-map)

[Wireframes](https://github.com/BrenanMarenger/Capstone-Project#wireframes)

[Tools](https://github.com/BrenanMarenger/Capstone-Project#tools)

[Features](https://github.com/BrenanMarenger/Capstone-Project#features)

[Screenshots](https://github.com/BrenanMarenger/Capstone-Project#screenshots)

[TODO](https://github.com/BrenanMarenger/Capstone-Project#todo)

## Tech Stack
* Vue
* Express
* SQLite
* AWS - S3, Cloudfront
* Webpack

## Project Map
<p align="center">
  <img src="https://github.com/BrenanMarenger/Capstone-Project/blob/main/Map%401.25x.png" width="950" />
</p>

## Wireframes
<p align="center">
  <img src="https://github.com/BrenanMarenger/Capstone-Project/blob/main/Wireframs.png" width="700" />
</p>

## Tools
### Client
* **Vue Router**    - allow multi-page navigation, redirection 
* **Vuex**          - persistedstate, stores states (token, loading, user id, etc.)
* **Axios**         - API to make HTTP requests to my server
* **Vuetify?** - TBD component based styling library
* **Google Icons** - SVG icons
### Server
* **Sequelize**     - connects to my SQLite DB, allowing operations, associations 
* **Postman**     - server endpoint functional, integration, and regression testing
* **Nodemon**       - restarts server when a change is detected (QoL)
* **Eslint**        - help debug and find issues
* **Bcrypt**        - password hashing
* **Bluebird**      - allows promisifying node modules (async)
* **Morgan**        - logs requests, helps visualize server interactions 
* **Joi**           - used to enfore email and password schema
* **JWT**           - "JSON Web Token" generates user token for logged in users
* **Cors**          - fetching resources 
### Misc
* **Whisper**     - API to generate captions
* **Whimsical**   - Visualizing and planning project
* **Elgato Video Capture** - Converting VHS tapes to digital download

## Features
* Account system with personal favorites and watch history
* Authentication with appropriate redirection, token storage, and policies
* Custom video player with keybinds and a variety of features
* Dynamic gallery page with different featured video and changing arragement of categories/videos
* Scalable project, adapting to new videos and users. Automatically adding new categories
* Dynamic searching and filtering, query urls
* UI/UX Design with responsive and dynamic buttons, scaling to all screens

## Screenshots
Coming Soon

## TODO
* Styling
* Loading page/animations
* Profile system for each account
* Debug and clean code
* Modal displays video length
* Passport for better authenticaiton
* Vitest for testing
* Rating system to display number of like/top rated videos
* Describe features with code and in-app examples

