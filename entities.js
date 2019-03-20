/////////////////////////////////////////////////////////////
//////////////////////// SPRITES ////////////////////////////
/////////////////////////////////////////////////////////////

var sprites = {
  // ESCENARIO
  fondo :  {sx: 421, sy: 0, w:550, h:625, frames: 1},
  logofrogger : {sx: 48, sy: 400, w:40, h:24, frames: 1},
  // VEHICULOS
  cocheAmarillo : {sx: 213, sy: 5, w:95, h:50, frames: 1},
  cocheAzul : {sx: 8, sy: 7, w:90, h:47, frames: 1},
  cocheVerde : {sx: 110, sy: 5, w:95, h:50, frames: 1},
  bomberos : {sx: 7, sy: 62, w:123, h:45, frames: 1},
  camion : {sx: 150, sy: 63, w:200, h:45, frames: 1},
  // TRONCOS
  troncoPeque : {sx: 271, sy: 172, w:129, h:42, frames: 1},
  troncoMediano : {sx: 10, sy: 122, w:191, h:42, frames: 1},
  troncoGrande : {sx: 9, sy: 171, w:247, h:42, frames: 1},
  // TORTUGA
  tortugaUno : {sx: 0, sy: 288, w:54, h:46, frames: 1},
  tortugaDos : {sx: 0, sy: 288, w:54, h:46, frames: 1},
  // RANA
  rana : {sx: 0, sy: 346, w:38, h:24, frames: 1},
  muerteRana : {sx: 210, sy: 125, w:48, h:35, frames: 4}
};

var OBJECT_PLAYER = 1,
    OBJECT_ENEMY = 2,
    OBJECT_TRANS = 4,
    OBJECT_HOME = 8;

/////////////////////////////////////////////////////////////
/////////////////// CLASE PADRE SPRITES /////////////////////
/////////////////////////////////////////////////////////////

var Sprite = function()  
 { }

Sprite.prototype.setup = function(sprite,props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w =  SpriteSheet.map[sprite].w;
  this.h =  SpriteSheet.map[sprite].h;
}

Sprite.prototype.merge = function(props) {
  if(props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
}
Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
}

Sprite.prototype.hit = function(damage) {
  this.board.remove(this);
}

/////////////////////////////////////////////////////////////
////////////////////// PLAYER - RANA ////////////////////////
/////////////////////////////////////////////////////////////

var Frog = function()
{
  this.setup('rana',);

  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - 8 - this.h;
  this.vx = 0;

  this.step = function(dt) 
  {  
    if(Game.keys['left']) 
    { 
      this.x = this.x - 40; 
      Game.keys['left'] = false;
    }
    else if(Game.keys['right']) 
    { 
      this.x = this.x + 40; 
      Game.keys['right'] = false;
    }
    else if(Game.keys['up']) 
    { 
      this.y = this.y - 48; 
      Game.keys['up'] = false;
    }    
    else if(Game.keys['down']) 
    { 
      this.y = this.y + 48;
      Game.keys['down'] = false;
    }
    
    //this.x += this.vx * dt;
    //this.vx = 0;
    //console.log("##### x : " + this.x);
    //console.log("##### y : " + this.y);
    // si supera el limite de X
    if(this.x < 0) 
    { 
      this.x = 0; 
    }
    else if(this.x > Game.width - this.w) 
    { 
        this.x = Game.width - this.w; 
    }
    // si supera el limite de Y
    if(this.y < 8) 
    { 
      this.y = 8; 
    }
    else if(this.y > Game.height - 8 - this.h) 
    { 
        this.y = Game.height - 8 - this.h;
    }

    // COLISIONES 
    var collisionTroncos = this.board.collide(this,OBJECT_TRANS);
    var collision = this.board.collide(this,OBJECT_ENEMY);
    var collisionFin = this.board.collide(this,OBJECT_HOME);
    //console.log("%%%%%% home colision : " + collisionFin);
    //console.log("%%%%%% trans colision : " + collisionTroncos);
    //console.log("%%%%%% enemy colision : " + collision);
    // si la rana no colisiona con los troncos, prueba con la colision normal
    if(collisionTroncos)
    {
      this.vx = collisionTroncos.velocidad;
      //console.log("$$$$$ vx : " + this.vx);
      this.x += this.vx * dt;
      //console.log("$$$$$ x : " + this.x);
    }
    else if(collision)
    {
      if(this.board.remove(this))
      {
        this.board.add(new Death(this.x + this.w/2, this.y + this.h/2));
        //finPartida = true;
        setTimeout(loseGame, 600);
        //loseGame();
      }
    }   
    else if(collisionFin){
      //exito = true;
      setTimeout(winGame, 200);
      //winGame();
    }
  }
}

Frog.prototype = new Sprite();
Frog.prototype.type = OBJECT_PLAYER;

/////////////////////////////////////////////////////////////
/////////////////////////// FONDO ///////////////////////////
/////////////////////////////////////////////////////////////

var Fondo = function(){
	this.setup(
		'fondo',
		{
			x: 0, 
			y: 0
		});
	this.step = function (dt){}
}

Fondo.prototype = new Sprite();

/////////////////////////////////////////////////////////////
////////////////////////// ARRAYS ///////////////////////////
/////////////////////////////////////////////////////////////

var coches = {
  bomberos:{
    x:12,
    y:480,
    sprite:'bomberos',
    velocidad:75
  },
  camion:{
    x:400,
    y:527,
    sprite:'camion',
    velocidad:-100
  },
  cocheAmarillo:{
    x:12,
    y:379,
    sprite:'cocheAmarillo',
    velocidad:100
  },
  cocheAzul:{
    x:12,
    y:335,
    sprite:'cocheAzul',
    velocidad:125
  },
  cocheVerde:{
    x:12,
    y:428,
    sprite:'cocheVerde',
    velocidad:150
  }
};

var rio = {
  tortugaUno:{
    x:0,
    y:100,
    sprite:'tortugaUno',
    velocidad:70
  },
  tortugaDos:{
    x:0,
    y:200,
    sprite:'tortugaDos',
    velocidad:40
  },
  troncoPeque:{
    x:500,
    y:248,
    sprite:'troncoPeque',
    velocidad:-100
  },
  troncoMediano:{
    x:500,
    y:150,
    sprite:'troncoMediano',
    velocidad:-75
  },
  troncoGrande:{
    x:500,
    y:50,
    sprite:'troncoGrande',
    velocidad:-50
  }
};

var vehiculos = [
  {   
    sprite:'bomberos',
    tiempoACC:0,
    tiempoCICLO:4.5
  },
  {
    sprite:'camion',
    tiempoACC:0,
    tiempoCICLO:3.5
  },
  {
    sprite:'cocheAmarillo',
    tiempoACC:0,
    tiempoCICLO:2
  },
  {
    sprite:'cocheAzul',
    tiempoACC:0,
    tiempoCICLO:3
  },
  {
    sprite:'cocheVerde',
    tiempoACC:0,
    tiempoCICLO:4
  }
]

var objetosRio = [
  {   
    sprite:'tortugaUno',
    tiempoACC:0,
    tiempoCICLO:3
  },
  {
    sprite:'tortugaDos',
    tiempoACC:0,
    tiempoCICLO:4
  },
  {
    sprite:'troncoPeque',
    tiempoACC:0,
    tiempoCICLO:4
  },
  {
    sprite:'troncoMediano',
    tiempoACC:0,
    tiempoCICLO:5
  },
  {
    sprite:'troncoGrande',
    tiempoACC:0,
    tiempoCICLO:7
  }
]

/////////////////////////////////////////////////////////////
////////////////////////// COCHES ///////////////////////////
/////////////////////////////////////////////////////////////

var Car = function(tipoCoche){
  //console.log("####### 1");
  this.setup(tipoCoche.sprite,tipoCoche);
  //console.log("####### 2");
  //console.log("####### velocidad : " + this.velocidad);
  this.step = function (dt)
  {
    //console.log("####### velocidad : " + this.velocidad);
    //console.log("####### dt : " + dt);
    this.x += this.velocidad * dt;
    //console.log("####### X : " + this.x);
    if(this.x > Game.width
      || this.x < -this.w)
    {
      this.board.remove(this);
    }
  }
}
Car.prototype = new Sprite();
Car.prototype.type = OBJECT_ENEMY;

/////////////////////////////////////////////////////////////
////////////////////////// TRUNK ////////////////////////////
/////////////////////////////////////////////////////////////

var Trunk = function(tipoObjeto){
  //console.log("####### tipoObjeto : " + tipoObjeto);
  this.setup(tipoObjeto.sprite,tipoObjeto);
  //console.log("####### 2");
  this.step = function (dt)
  {
    //console.log("####### velocidad : " + this.velocidad);
    //console.log("####### dt : " + dt);
    //console.log("####### 3");
    this.x += this.velocidad * dt;
    //console.log("####### X : " + this.x);
    //console.log("####### 4");
    if(this.x > Game.width
      || this.x < -this.w)
    {
      this.board.remove(this);
    }
  }
}

Trunk.prototype = new Sprite();
Trunk.prototype.type = OBJECT_TRANS;

/////////////////////////////////////////////////////////////
///////////////////////// SPAWNER ///////////////////////////
/////////////////////////////////////////////////////////////

var Spawner = function (){
  this.t = 0;
  //console.log("&&&&& 1");
  for(var i = 0; i < vehiculos.length; ++i){
    vehiculos[i].tiempoACC = 0;
  }
  for(var i = 0; i < objetosRio.length; ++i){
    objetosRio[i].tiempoACC = 0;
  }
  //console.log("&&&&& 2");
  this.step = function (dt)
  {
    //console.log("&&&&& 3");
    this.t += dt;
    //console.log("&&&&& vehiculos length : " + vehiculos.length);
    for(var i = 0; i < vehiculos.length; ++i)
    {
      //console.log("&&&&& 4");
      if(this.t > vehiculos[i].tiempoACC)
      {
        vehiculos[i].tiempoACC += vehiculos[i].tiempoCICLO;        
        var modelo = coches[vehiculos[i].sprite];        
        //console.log("&&&&& modelo1 : " + modelo);        
        this.board.addFront(new Car(modelo));        
        //console.log("&&&&& 6");
      }
    }
    //console.log("&&&&& 7");
    for(var i = 0; i < objetosRio.length; ++i)
    {
      //console.log("&&&&& objetosRio : " + objetosRio[i].sprite);
      if(this.t > objetosRio[i].tiempoACC)
      {
        objetosRio[i].tiempoACC += objetosRio[i].tiempoCICLO;
        var modeloDos = rio[objetosRio[i].sprite];
        //console.log("&&&&& modelo2 : " + modeloDos);
        this.board.addFront(new Trunk(modeloDos));
        //console.log("&&&&& 6");
      }
    }
  }
}

Spawner.prototype.draw = function () {};

/////////////////////////////////////////////////////////////
////////////////////////// WATER ////////////////////////////
/////////////////////////////////////////////////////////////

var Water = function(){
  this.x = 0;
  this.y = 52;
  this.w = 550;
  this.h = 240;
  this.step = function(dt){};
  this.draw = function(ctx){};
}

Water.prototype = new Sprite();
Water.prototype.type = OBJECT_ENEMY;

/////////////////////////////////////////////////////////////
///////////////////////// HOME //////////////////////////////
/////////////////////////////////////////////////////////////

var Home = function(){
  this.x = 0;
  this.y = 0;
  this.w = 550;
  this.h = 70;
  this.step = function(dt){};
  this.draw = function(ctx){};
}

Home.prototype = new Sprite();
Home.prototype.type = OBJECT_HOME;

/////////////////////////////////////////////////////////////
////////////////////// MUERTE RANA //////////////////////////
/////////////////////////////////////////////////////////////

var Death = function(centerX, centerY){
  this.setup('muerteRana',{frame:0});
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
  this.subFrame = 0;
};

Death.prototype = new Sprite();
Death.prototype.step = function(dt)
{
  this.frame = Math.floor(this.subFrame++ / 8);
  if(this.subFrame >= 36) {
    this.board.remove(this);
  }
};

