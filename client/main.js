var tileSize = 28;
  var numXTiles = 11;
  var numYTiles = 11;

  //calc game area
  var initSize = [tileSize*numXTiles, tileSize*numYTiles]

  Crafty.init( initSize[0], initSize[1] );
  Crafty.background( 'rgb(0,0,0)' );

  //load tile from "feat.png"
  Crafty.sprite( tileSize, "feat.png", {
    feat1:[0, 0], feat2:[1, 0], feat3:[2, 0], player:[1, 1]
  });

  Crafty.c("LeftControls",{
    init: function() {
      this.requires('Multiway');
    },
    leftControls: function(speed){
      this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
      return this;
    }
  });

  Crafty.c('CustomControls',{
    __move: {left: false, right: false, up: false, down: false},
    _speed: 3,

    CustomControls: function(speed){
      if (speed) this._speed = speed;
      var move = this.__move;

      /*this.bind('enterframe', function() {
        //move the player in a direction depending on the booleans
        //only move the player in one direction at a time (up/down/left/right)
        if(move.right) this.x += this._speed;
        else if(move.left) this.x -= this._speed;
        else if(move.up) this.y -= this._speed;
        else if(move.down) this.y += this._speed;

      })*/
      this.bind('keydown', function(e) {
        //default movement booleans to false
        if(e.key == Crafty.keys['RIGHT_ARROW']){
          this.x+=this._speed;
        }
        /*move.right = move.left = move.down = move.up = false;

        //if keys are down, set the direction
        if(e.keyCode === Crafty.keys.RA) move.right = true;
        if(e.keyCode === Crafty.keys.LA) move.left = true;
        if(e.keyCode === Crafty.keys.UA) move.up = true;
        if(e.keyCode === Crafty.keys.DA) move.down = true;*/

        this.preventTypeaheadFind(e);
      }).bind('keyup', function(e) {
        if(e.key == Crafty.keys['RIGHT_ARROW']){
          this.x=0;
        }
        //if key is released, stop moving
        /*if(e.keyCode === Crafty.keys.RA) move.right = false;
        if(e.keyCode === Crafty.keys.LA) move.left = false;
        if(e.keyCode === Crafty.keys.UA) move.up = false;
        if(e.keyCode === Crafty.keys.DA) move.down = false;*/

        this.preventTypeaheadFind(e);
      });

      return this;
    }

  });

  Crafty.c('Ape',{
    Ape:function(){
      this.requires("Collision")
      .bind('Moved', function(from){
        if(this.hit('solid')){
          this.attr({x: from.x, y: from.y});
        }
      });
      return this;
    }
  });

  for (var i=0; i<=numXTiles; i++){
    for (var j=0; j<=numYTiles; j++){

      // generate grid of tile
      if ((i % 2 === 0) && (j % 2 === 0)
        && (i > 0) && (i < numXTiles - 1)
        && (j > 0) && (j < numYTiles - 1)) {
                    Crafty.e("2D, DOM, solid, feat" + (1 + Math.round( Math.random() * 2 )))
                        .attr({x: i * tileSize, y: j * tileSize, z: 10})
            }
            // generate fence
      if ((i===0) || (i===numXTiles - 1) || (j===0) || (j===numYTiles - 1)){
        Crafty.e("2D, DOM, solid, feat" + (1 + Math.round( Math.random() * 2 )))
          .attr({ x: i * tileSize, y: j * tileSize, z: 10 });
      }
    }
  }

  var player1 = Crafty.e("2D, DOM, player, Ape, LeftControls")
    .attr({x: 28, y: 28, z: 1, xo: 0, yo: 0, left: false, right: false, up: false, down: false})
    .leftControls(tileSize)
    /*.bind('enterframe', function() {
    //move the player in a direction depending on the booleans
    //only move the player in one direction at a time (up/down/left/right)
    alert("enterframe");
    if(this.right) this.x += 28;
    else if(this.left) this.x -= 28;
    else if(this.up) this.y -= 28;
    else if(this.down) this.y += 28;

    }).bind('keydown', function(e) {
    //default thisment booleans to false
    this.right = this.left = this.down = this.up = false;

    //if keys are down, set the direction
    if(e.key == Crafty.keys['RIGHT_ARROW']){
      this.right = true;
    }


    this.preventTypeaheadFind(e);
    })/*.bind('keyup', function(e) {
    //if key is released, stop moving
    if(e.key == Crafty.keys['RIGHT_ARROW']) this.right = false;


    this.preventTypeaheadFind(e);
    })
    /*.bind('KeyDown',function(e){
      if(e.key == Crafty.keys['RIGHT_ARROW']){
        this.xo=this.x;
        this.x=this.x+tileSize;
      } else
      if(e.key == Crafty.keys['LEFT_ARROW']){
        this.xo=this.x;
        this.x=this.x-tileSize;
      } else
      if(e.key == Crafty.keys['UP_ARROW']){
        this.yo=this.y;
        this.y=this.y-tileSize;
      } else
      if(e.key == Crafty.keys['DOWN_ARROW']){
        this.yo=this.y;
        this.y=this.y+tileSize;
      }
    })
    /*.bind('KeyUp', function(e){
      if(e.key == Crafty.keys['RIGHT_ARROW']){
        this.x=0;
      }
    })*/
    .Ape();
    /*.CustomControls(28)
    .bind("keyup", function(e){
      this.stop();
    })
    .collision()
    .bind("enterframe", function(e) {
      alert("asdf");
    })
    .collision()
    .onhit("feat1", function() {
      alert("solid");
    })
    ;*/
