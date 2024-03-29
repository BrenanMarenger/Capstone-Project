# Netflix-Clone
## Objective
> A web app for my capstone project, replicating Netflix with my childhood VHS tapes using modern technologies. Shares complex functions, layouts, and interactions of popular streaming sites. My goal of this project is to prepare myself and learn the industry standard of web development on a full-stack level, using all my own assets

## Content
[Tech Stack](https://github.com/BrenanMarenger/Capstone-Project#tech-stack)

[Project Map](https://github.com/BrenanMarenger/Capstone-Project#project-map)

[Features](https://github.com/BrenanMarenger/Capstone-Project#features)

[Tools](https://github.com/BrenanMarenger/Capstone-Project#tools)

[Screenshots](https://github.com/BrenanMarenger/Capstone-Project#screenshots)

[TODO](https://github.com/BrenanMarenger/Capstone-Project#todo)

[Retrospect](https://github.com/BrenanMarenger/Capstone-Project#retrospect)

[Project Essay](https://github.com/BrenanMarenger/Capstone-Project/blob/main/RetroFlix%20-%20Final%20Paper.pdf)

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

## Features
* Account system that stores personal favorites and a resumable watch history
* Top 5 rating system based on users' favorite videos from all accounts for accurate ranking.
* Modal displaying additional information and related videos based on shared categories
* Secure authentication with appropriate redirection, token storage, policies, and hashing to ensure the safety of user data.
* Custom video player with keybinds and a variety of features, including AI-generated captions
* Dynamic gallery page with multiple changing categories
* Scalable project, able to adapt to new videos, users, and data, automatically adding new categories and filters 
* Dynamic searching and filtering, with the ability to combine filters and searches, proply changing the query URLs.
* Seamless UI/UX interaction with responsive and dynamic buttons that scale to all screens, transitions and animations, and lazy/skeleton loading
* Custom carousel with index tabs and dynamic scrolling based on screen size and number of videos


## Screenshots

> History 
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/History.PNG)

> Modal
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Modal2.gif)

> Featured Video
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Feature.gif)

> Display
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Display.PNG)

> Top 5 Rating 
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Top5.PNG)

> Filtering
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/NavBar.PNG)

> Loading State
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Loading.gif)

> Searching
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Searching.PNG)

> Dynamic Carousel
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Carousel.gif)

> Register / Log in
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/Register.gif)

> Gallery / Scrolling Animation
![](https://github.com/BrenanMarenger/Capstone-Project/blob/main/Img/ScrollAnimation.gif)

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



