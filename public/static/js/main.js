var game = new Phaser.Game(1024, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    // game.load.image('sky', 'assets/sky.png');
    // game.load.image('ground', 'assets/platform.png');
    // game.load.image('star', 'assets/star.png');
    // game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    //15 margin; 0 spacing
    game.load.spritesheet('man', 'assets/character.png', 64, 64, -1, 1);

}

var players, player;
var platforms;
var cursors;
var upStart = 12*8;
var leftStart = 12*9;
var downStart = 12*10;
var rightStart = 12*11;
var currentDirection = rightStart;
var walkFrameUp = [];
var walkFrameLeft = [];
var walkFrameDown = [];
var walkFrameRight = [];
for (var i = 1; i < 9; i++) {
    walkFrameUp.push(upStart + i);
    walkFrameLeft.push(leftStart + i);
    walkFrameDown.push(downStart + i);
    walkFrameRight.push(rightStart + i);
}
// for (var i = 1; i < 8; i++) {
//     walkFrameUp.push(upStart + (8 - i));
//     walkFrameLeft.push(leftStart + (8 - i));
//     walkFrameDown.push(downStart + (8 - i));
//     walkFrameRight.push(rightStart + (8 - i));
// }

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = game.add.group();

    // //  We will enable physics for any object that is created in this group
    // platforms.enableBody = true;

    // // Here we create the ground.
    // var ground = platforms.create(0, game.world.height - 64, 'ground');

    // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);

    // //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;

    // //  Now let's create two ledges
    // var ledge = platforms.create(400, 400, 'ground');
    // ledge.body.immovable = true;

    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;

    // The player and its settings
    // player = game.add.sprite(32, game.world.height - 350, 'man');
    // player = game.add.sprite(0, game.world.height, 'man');
    // player2 = game.add.sprite(32, game.world.height, 'man');
    // player3 = game.add.sprite(64, game.world.height, 'man');
    // player4 = game.add.sprite(96, game.world.height, 'man');

    //  We need to enable physics on the player
    // game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 0;
    // player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 20, true);
    // player.animations.add('right', [5, 6, 7, 8], 20, true);

    // player.frame = 0;
    // player2.frame = 1;
    // player3.frame = 2;
    // player4.frame = 3;

    players = game.add.group();
    players.enableBody = true;

    // var player1 = players.create(0, game.world.height-200, 'man');

    for (var i = 8; i < 16; i++) {
        for (var j = 0; j < 12; j++) {
            
            // players.create(0, game.world.height-64*(8-i), 'man', i);
            if(i>12 && j> 5)
                continue;
            players.create((i - 8)*64, j*64, 'man', i*12 + j);
        }
    }
    //walk player
    player = players.create(0, 8 * 64, 'man', rightStart);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('up', walkFrameUp, 10, true);
    player.animations.add('left', walkFrameLeft, 10, true);
    player.animations.add('down', walkFrameDown, 10, true);
    player.animations.add('right', walkFrameRight, 10, true);


    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

var jumpMode = 0;//0: no jump; 1: 1st jump; 2: double jump

function update() {

    //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;

    // var isTouchingBottom = player.position.y + player.body.height == game.world.height;

//walking player
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if(cursors.up.isDown){
        player.body.velocity.x = 0;
        player.body.velocity.y = -130;
        player.animations.play('up');
        currentDirection = upStart;
    }
    else if(cursors.left.isDown){
        player.body.velocity.x = -130;
        player.body.velocity.y = 0;
        player.animations.play('left');
        currentDirection = leftStart;
    }
    else if(cursors.down.isDown){
        player.body.velocity.x = 0;
        player.body.velocity.y = 130;
        player.animations.play('down');
        currentDirection = downStart;
    }
    else if(cursors.right.isDown){
        player.body.velocity.x = 130;
        player.body.velocity.y = 0;
        player.animations.play('right');
        currentDirection = rightStart;
    }
    else{
        player.frame = currentDirection;
    }

    // if(isTouchingBottom){
    //     if (cursors.left.isDown)
    //     {
    //         //  Move to the left
    //         player.body.velocity.x = -330;

    //         player.animations.play('left');
    //     }
    //     else if (cursors.right.isDown)
    //     {
    //         //  Move to the right
    //         player.body.velocity.x = 330;

    //         player.animations.play('right');
    //     }
    //     else
    //     {
    //         //  Stand still
    //         player.animations.stop();

    //         player.frame = 4;
    //         player.body.velocity.x = 0;
    //     }
    // }

    // //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && (player.body.touching.down || isTouchingBottom))
    // {
    //     player.body.velocity.y = -350;
    // }

}