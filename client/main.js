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

//generating world
function generateWorld() {
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
}

Crafty.scene("main", function() {
  generateWorld();
  Crafty.c('CustomControls',{
    __move: {left: false, right: false, up: false, down: false},
    _speed: tileSize,

    CustomControls: function(speed){
      if (speed) this._speed = speed;
      var move = this.__move;
      this.bind('enterframe', function() {
        alert("func_bind");
        if(move.right) this.x+=this._speed;
        else if(move.left) this.x -= this._speed; 
        else if(move.up) this.y -= this._speed;
        else if(move.down) this.y += this._speed;

      }).bind('keydown', function(e) {
        //default movement booleans to false
        alert("func_keydown");
        move.right = move.left = move.down = move.up = false;
        if(e.key == Crafty.keys['RIGHT_ARROW']){
          move.right=true;
        }
        this.preventTypeaheadFind(e);

      }).bind('keyup', function(e) {
        alert("func_keyup");
        if(e.key == Crafty.keys['RIGHT_ARROW']){
          move.right=false;
        }
        this.preventTypeaheadFind(e);
      });
      return this;
    }
  });

  var player1 = Crafty.e("2D, DOM, player, controls, CustomControls, collision")
    .attr({x: 28, y: 28, z: 1})
    .CustomControls(tileSize)
/*    .bind("keyup", function(e) {
      this.stop();
    })
//    .collision()
    .onhit("wall_left", function() {
        this.x += this._speed;
        this.stop();
    }).onhit("wall_right", function() {
        this.x -= this._speed;
        this.stop();
    }).onhit("wall_bottom", function() {
        this.y -= this._speed;
        this.stop();
    }).onhit("wall_top", function() {
        this.y += this._speed;
        this.stop();
    });*/
});

Crafty.scene("main");


/*
Crafty.c("LeftControls",{
  init: function() {
    this.requires('Multiway');
  },
  leftControls: function(speed){
    this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
    return this;
  }
});
*/


/*
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
*/
