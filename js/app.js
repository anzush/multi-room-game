// apply canvas's style 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; //

//define parameters

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

// add the avatar to the principal character with his animations

const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        // right animation
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        // left animation
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        // walk right side animation
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        // walk right side animation
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
            //image: new Image(),
        },
        // enter door animation
        enterDoor: {
            frameRate: 8,
            frameBuffer: 5,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                console.log('a');
                overlay.opacity;
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++;
                        levels[level].init();
                        player.switchSprite('idleRight');
                        player.preventInput = false;
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                });
            }
        },
    },
});

// levels selector

let level = 1;
let levels = {
    //first level
    1: {
        init: () => {
            //add the collision blocks for each level
            parsedCollisions = collisionLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;

            //add background

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel1.png',
            });

            // add door and select its position

            doors = [
                new Sprite({
                    position: {
                        x: 767.38,
                        y: 270,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    //second level
    2: {
        init: () => {
            //add the collision blocks for each level
            parsedCollisions = collisionLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;

            //select character's position

            player.position.x = 76;
            player.position.y = 140;

            //reload animation

            if (player.currentAnimation) {
                player.currentAnimation.isActivate = false;
            }
            //add background
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel2.png',
            });
            // add door and select its position
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    //third level
    3: {
        init: () => {
            //add the collision blocks for each level
            parsedCollisions = collisionLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            //select character's position
            player.position.x = 700;
            player.position.y = 140;

            //reload animation

            if (player.currentAnimation) {
                player.currentAnimation.isActivate = false;
            }
            //add background
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel3.png',
            });
            // add door and select its position
            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    }
}
// define variables to movement events
const keys = {
    w: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
}

// define screen object to change level 
const overlay = {
    opacity: 0,
}

//define function to works animations and others

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw();
    });

    doors.forEach(doors => {
        doors.draw();
    });
    player.hadleInput(keys);
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = ('#3F3851');
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}

// run functions

levels[level].init();
animate();