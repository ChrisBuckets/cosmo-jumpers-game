# cosmo-jumpers-game

![Cosmo Jumpers](https://media.giphy.com/media/83c5roMPn6MPizpFuT/giphy.gif)

## General Info
Cosmo Jumpers is a simple side scrolling arcade game based off the popular game "Flappy Bird". My friend and I's goal was to make an arcade game with playable
NFT characters. You have to dodge the astroids by jumping in time, each set of asteroids you pass, the higher score you get. This project is the part I worked
on which was the base game and a program to randomly create a character to be minted onto the blockchain. 

### Code

#### An interesting part of this game was the use of interpolation, which means regardless of the user's framerate, the game will still function the same.

Here is an example of how the character falls, it uses deltaTime to calculate how much the character should fall based off of the their frame rate.
```
  this.fall = function () {
    this.y += 0.5 * deltaTime;
    if (this.y > height + 80) {
      this.y = height + 80;
    }
  };
```
Another example of interpolating the x axis movement of the character

```
  this.update = function (speed) {
    this.x -= speed * deltaTime;
  };
```
### Technologies

* Javascript
* HTML/CSS
* p5.js

