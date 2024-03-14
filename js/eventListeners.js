//create the event for player's movements

window.addEventListener('keydown', (event) => {
    if (player.preventInput) return;
    switch (event.key) {

        // create the jump event with the key w in lowercase

        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (
                    player.hitbox.position.x + player.hitbox.width <=
                    door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.preventInput = true;
                    player.switchSprite('enterDoor');
                    door.play();
                    return
                }
            }
            if (player.velocity.y === 0) player.velocity.y = -20;
            break

        // create the left movement event with the key a in lowercase

        case 'a':
            keys.a.pressed = true;
            break

        // create the right movement event with the key d in lowercase

        case 'd':
            keys.d.pressed = true;
            break

        // create the jump event with the key w in uppercase

        case 'W':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (
                    player.hitbox.position.x + player.hitbox.width <=
                    door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.preventInput = true;
                    player.switchSprite('enterDoor');
                    door.play();
                    return
                }
            }
            if (player.velocity.y === 0) player.velocity.y = -20;
            break

        // create the left movement event with the key a in uppercase

        case 'A':
            keys.a.pressed = true;
            break

        // create the right movement event with the key d in uppercase

        case 'D':
            keys.d.pressed = true;
            break
    }
})

// fix the problem with movement to each side

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
        case 'A':
            keys.a.pressed = false;
            break
        case 'D':
            keys.d.pressed = false;
            break
    }
})