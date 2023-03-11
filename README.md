# Netflix-Clone
## Objective
> A website app for my capstone project, replicating Netflix with my childhood VHS tapes and mordern technologies. Shares complex functions, layouts, and interactions of popular streaming sites. My goal of this project is to prepare myself and learn the industry standard of web development on a full-stack level.

## Content
[Tech Stack](https://github.com/BrenanMarenger/Capstone-Project#tech-stack)

[Project Map](https://github.com/BrenanMarenger/Capstone-Project#project-map)

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

## Tools
### Client
* **Vue Router**    - allow multi-page navigation, redirection 
* **Vuex**          - persistedstate, stores states (token, loading, user id, etc.)
* **Axios**         - API to make HTTP requests to my server
* **Vuetify?** - TBD component based styling library
* **Scss?** - TBD make styling easier
* **Google Icons** - SVG icons
* **VueUse** - Vue library providing additional hooks, event listeners (onClickOutside, Screen Observer)
### Server
* **Sequelize**     - connects to my SQLite DB, allowing operations, associations 
* **Postman**     - server endpoint functional, integration, and regression testing
* **DB Browser for SQLite** - help visualize and build tables in the database
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
* Account system with personal favorites and watch history (resuming where left off)
* Top 5 rating system based on favorites from all accounts
* Authentication with appropriate redirection, token storage, policies, and hashing
* Custom video player with keybinds and a variety of features, including ai generated captions
* Dynamic gallery page with different featured videos and changing arrangements of categories/videos
* Scalable project, adapting to new videos, users, and data. Automatically adding new categories and filters
* Dynamic searching and filtering (combinations work), query urls/links
* UI/UX Design with responsive and dynamic buttons, scaling to all screens


## Screenshots
Coming Soon

## TODO
* Styling (General, carousel, filtering/searching video layout)
* Transitions and animations
* Profile system for each account
* Increase search/filtering capabilities
* Passport for better authenticaiton
* Vitest for testing


