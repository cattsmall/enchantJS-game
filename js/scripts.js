enchant();

window.onload = function(){
    var game = new Game(640, 128);

    game.fps = 30;
    game.scale = 1;

    // Preload assets
    game.preload("assets/player1.gif", "assets/map1.gif");

    game.onload = function(){

      // New scene
      var scene1 = new Scene();

      // Map
      var map = new Map(32, 32);
      map.image = game.assets["assets/map1.gif"];
      
      var mapblocks = [
        [ 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5],
        [ 5, 5, 4, 5, 3, 5, 4, 5, 5, 5, 4, 5, 3, 5, 4, 5, 8, 5, 4, 5, 3, 5, 4, 5, 5, 5, 4, 5, 3, 5, 4, 5, 5, 5, 4, 5, 3, 5, 4, 5, 8, 5, 4, 5, 3, 5, 4, 5, 5, 5, 4, 5, 3, 5, 4, 5],
        [ 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5,12, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 12, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5],
        [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
      ];
      map.loadData(mapblocks);
      
      // Player
      player = new Sprite(32, 64);
      player.image = game.assets["assets/player1.gif"];
      player.x = 16;
      player.y = 32;
      player.vx = 0;
      player.vy = 0;
      player.ax = 0;
      player.ay = 0;
      player.moveSpeed = 4;
      player.pose = 0;
      player.frame = 0;

      player.addEventListener('enterframe', function(e) {
        this.ax = 0;
        if (game.input.left && player.x >= 0) this.ax -= this.moveSpeed;
        if (game.input.right && player.x <= map.width - player.width) this.ax += this.moveSpeed;
        if (this.ax > 0) this.scaleX = 1;
        if (this.ax < 0) this.scaleX = -1;
        if (this.ax != 0) {
            if (game.frame % 5 == 0) {
                this.pose++;
                this.pose %= 4;
            }
            this.frame = this.pose + 1;
        } else {
            this.frame = 0;
        }
  
        this.x += this.ax;
      });

      // Add map
      scene1.addChild(map);

      // Add player
      scene1.addChild(player);    
      // Add the scene
      game.pushScene(scene1);
      

      scene1.addEventListener('enterframe', function(e) {
          var x = Math.min((game.width  - 16) / 2 - player.x, 0);
          var y = Math.min((game.height - 16) / 2 - player.x, 0);
          x = Math.max(game.width,  x + map.width)  - map.width;
          y = Math.max(game.height, y + map.height) - map.height;
          scene1.x = x;
          scene1.y = y;
      });
    };

    game.start();
};