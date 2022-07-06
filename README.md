# Battleship
A JavaScript game based on a classic "Battleship" game, implemented to practice Test Driven Development. 

## <!-- [Live Preview](https://hmjatt.github.io/Battleship/) -->

<!-- ![This is an image]() -->


This project is created to practice Test Driven Development(TDD) in JavaScript by creating a Battleship game using Jest(JS Testing Framework). Babel and Webpack are also used in this project 	:cityscape: Feel free to reach me at [Twitter](https://twitter.com/hmjatt/) :flying_disc:



### Technologies Used

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/> </a>  &emsp;   <a href="https://babeljs.io/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Babel_Logo.svg" alt="babel" width="50" height="50"/> </a>  &emsp;   <a href="https://jestjs.io/" target="_blank" rel="noreferrer"> <img src="https://jestjs.io/img/jest.png" alt="jest" width="50" height="50"/> </a>  &emsp;  <a href="https://webpack.js.org/" target="_blank" rel="noreferrer"> <img style="margin-top:40px;" src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-dark-bg.svg" alt="webpack" width="120" height="70"/> </a>  &emsp;   <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer"> <img style="margin-top:20px;" src="https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.svg" alt="npm" width="50" height="50"/> </a>


## Includes the following features/components:

	- Jest
	- Babel Loader
	- Webpack
	- Test Driven Development(TDD)
	- Source Maps
	- Html Webpack Plugin
	- Css/Asset Resource Loader


## Usage

Run Dev Server (Port 5500)

    ```
    npm install

    ```

    ```
    npx webpack --watch //Clientside

    ```

	```
	npm test // run tests

	```

## Steps I followed to complete this project

1. ### Initialialize Environment Setup
	- [x] Install **NPM** using `npm init -y` to skip questions.
	- [x] Install **Webpack** using `npm install webpack webpack-cli --save-dev`.
	- [x] Add a `webpack.config.js` file and setup project directory.
	- [x] Run `npx webpack --watch` command to make sure webpack setup is successful.
	- [x] Install **Babel** using `npm install --save-dev babel-jest @babel/core @babel preset-env` command. Configure **Babel** by creating a `babel.config.js` file.
	- [x] Install **Jest** using `npm install --save-dev jest` command.
	- [x] Create a sample *test* using [Jest](https://jestjs.io/docs/getting-started) documentation. Configure **Jest** by adding `"test": "jest"` line to `package.json` file.
	- [x] Run `npm test` command to make sure the mock test passes and everything is configured correctly so far(PASSED).

2. ### Create Game Logic
	- [x] Create `ship.js` module which contains `ship` factory function
		- [x] `ships()` method - is an array of objects which include ship's name, length and it's direction

	- [ ] Create `gameboard.js` module which contains `gameboard` factory function
		- [x] `gameGrid()` method - is an array of 100 elements

	- [ ] Create `player.js` module which contains `gameboard` factory function

3. ### Test Game Logic
	- [x] Test `ship.js` module
		- [x] Test `shipArray` which should returns array of objects

	- [x] Test `gameboard.js` module
		- [x] Test `gameGrid()`	method, it should return array of 100 elements

4. ### Repeat Step 3 and 4
	- Make sure all tests pass.

5. ### Finish Environment Setup
	- [ ] Use source maps.
	- [ ] Load Assets.
		- [ ] CSS
		- [ ] Images
	- [ ] Setup HtmlWebpackPlugin
		- [ ] Clean up the `/dist` folder
		- [ ] Setup template.html
		- [ ] Setup favicon
	- [ ] Update `webpack.config.js` file to finish environment setup.

6. ### Create UI

7. ### Finish the game
	- [ ] Allow users to place their ships
	- [ ] Use coordinates for each ship or implement drag/drop of ships.


## Links to content that helped me with this project

1. The Odin Project
	- [Project: Battleship](https://www.theodinproject.com/lessons/node-path-javascript-battleship)
	- [More Testing](https://www.theodinproject.com/lessons/node-path-javascript-more-testing)

2. YouTube
	- [Web Dev Simplified(How To Build A Battleship Clone)](https://www.youtube.com/watch?v=G6JTM-zt-dQ)
	- [Vsauce 2(The Battleship Algorithm)](https://www.youtube.com/watch?v=LbALFZoRrw8)

3. Jest
	- [Documentation](https://jestjs.io/docs/getting-started)
	- [Matchers](https://jestjs.io/docs/using-matchers)
	- [Using Babel with Jest](https://jestjs.io/docs/getting-started#using-babel)
	- [Using Webpack with Jest](https://jestjs.io/docs/webpack)
	- [Setup and Teardown](https://jestjs.io/docs/setup-teardown)
	- [Mock Functions](https://jestjs.io/docs/mock-functions)

4. Design Inspiration
	- [Dribbble(Phil Goodwin)](https://dribbble.com/shots/15367230)

7. Webpack
	- [Getting Started](https://webpack.js.org/guides/getting-started/)

6. Others
	- [Play Battleship Game](https://learnteachcode.org/Battleship-JavaScript/)
	- [What are Pure Functions](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c)
	- [Measuring Software Quality](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)
	- [Too Much Mocking is Bad](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
	- [Nick Berry(Inspiration)](https://www.datagenetics.com/blog/december32011/)



## Notes/Remarks

## Future Changes/Fixes

1. Polish the intelligence of computer and allow it to place adjacent slots after getting a `hit`.

2. Create a 2 player option
	- Let users take turn by passing the device back and forth.
	- implement a `pass device` screen so players don't see each other's boards!


#### Quote

    “It always seems impossible until it's done.”
    — Nelson Mandela
>  	
> :ship: :dart: :fireworks: