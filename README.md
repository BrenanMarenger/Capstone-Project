# Netflix-Clone
## Objective
> A web app for my capstone project, replicating Netflix with my childhood VHS tapes using modern technologies. Shares complex functions, layouts, and interactions of popular streaming sites. My goal of this project is to prepare myself and learn the industry standard of web development on a full-stack level, using all my own assets

## Content
[Tech Stack](https://github.com/BrenanMarenger/Capstone-Project#tech-stack)

[Project Map](https://github.com/BrenanMarenger/Capstone-Project#project-map)

[Tools](https://github.com/BrenanMarenger/Capstone-Project#tools)

[Features](https://github.com/BrenanMarenger/Capstone-Project#features)

[Screenshots](https://github.com/BrenanMarenger/Capstone-Project#screenshots)

[TODO](https://github.com/BrenanMarenger/Capstone-Project#todo)

[Retrospect](https://github.com/BrenanMarenger/Capstone-Project#retrospect)

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
* **Vuex**          - persistedstate, stores states (token, loading, user id)
* **Axios**         - API to make HTTP requests to my server
* **Google Icons** - SVG icons
* **VueUse** - Vue library providing additional hooks, event listeners (onClickOutside, Screen Observer)
### Server
* **Sequelize**     - connects to my SQLite DB, allowing operations, associations 
* **Postman**     - server endpoint functional, integration, and regression testing
* **DB Browser for SQLite** - help visualize and build tables in the database
* **Nodemon**       - restarts server when a change is detected (QoL)
* **Eslint**        - debugger
* **Bcrypt**        - password hashing 
* **Joi**           - enforce email and password schema
* **JWT**           - "JSON Web Token" generates user token for logged in users
### Misc
* **Whisper**     - API to generate captions
* **Whimsical**   - Visualizing and planning project
* **Elgato Video Capture** - Converting VHS tapes to digital download

## Features
* Account system with personal favorites and watch history (resuming where left off)
* Top 5 rating system based on favorites from all accounts
* Modal showing related videos (shared categories)
* Authentication with appropriate redirection, token storage, policies, and hashing
* Custom video player with keybinds and a variety of features, including ai generated captions
* Dynamic gallery page, with multiple categories
* Scalable project, adapting to new videos, users, and data. Automatically adding new categories and filters
* Dynamic searching and filtering (combinations work), query urls/links
* Seamless UI/UX interaction with responsive and dynamic buttons, transitions and animations, lazy/skeleton loading
* Custom Carousel with index tabs and dynamic scrolling


## Screenshots
Coming Soon

## TODO

* Vitest for testing components
* Multiple profile system for each account to have many users
* Calculated "Match" system, based on favorited videos shared categories (weighted higher on appearing more)
* More video api data, cast section, rating
* Increase search/filtering capabilities
* Passport for better authentication
* Deploy to host

## Retrospect
> If I had to remake this project, using what I learned now, I would have taken a different route and used different technologies
* Firebase - simplify the server-side/backend, allowing for more features and dynamic DB setup
* Typescript - came across ambiguous typing issues, leading to some DB problems 
* Scss - better organized, easier to read, and use for CSS 
* Vue 3 - more up-to-date, more features, easier configuration with imported tools
* Rich Server - too much functionality on the client-side, distribution of data for performance
* Refractor - organize code better, specifically html tags, component usage, easier to read  



