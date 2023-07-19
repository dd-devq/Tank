(()=>{"use strict";var t,e={342:(t,e,s)=>{var i=s(260),h=s.n(i);class a extends Phaser.GameObjects.Container{constructor(t){super(t.scene,t.x,t.y),this.isOver=!1,this.sprite=this.scene.add.sprite(this.x,this.y,t.texture),this.add(this.sprite),this.scene.add.existing(this.sprite).setScale(3),void 0!==t.textContent&&this.scene.add.text(this.x,this.y,t.textContent,{font:"48px Arial",color:"#000000"}),this.setSize(3*this.sprite.width,3*this.sprite.height),this.scene.add.existing(this),this.setInteractive()}setupCallback(t){t.POINTER_OVER.isActive&&this.on(Phaser.Input.Events.POINTER_OVER,t.POINTER_OVER.callback),t.POINTER_OUT.isActive&&this.on(Phaser.Input.Events.POINTER_OUT,t.POINTER_OUT.callback),t.POINTER_DOWN.isActive&&this.on(Phaser.Input.Events.POINTER_DOWN,t.POINTER_DOWN.callback),t.POINTER_UP.isActive&&this.on(Phaser.Input.Events.POINTER_UP,t.POINTER_UP.callback)}}class n extends Phaser.Scene{constructor(){super({key:"UIScene"}),this.initialized=!1}create(){this.score=0,this.displayZone=this.add.zone(0,0,window.innerWidth,window.innerHeight).setDepth(-1),this.scoreText=this.add.text(20,20,"SCORE - "+this.score.toString(),{font:"48px Arial",color:"#000000"}),this.add.existing(this.displayZone),this.add.existing(this.scoreText),this.setupBtn(),Phaser.Display.Align.In.TopLeft(this.displayZone,this.scoreText),this.initialized||(this.scene.get("GameScene").events.on("addScore",(t=>{this.score+=t,this.scoreText.setText("SCORE - "+this.score.toString())})),this.initialized=!0)}setupBtn(){this.pauseBtn=new a({scene:this,x:window.innerWidth-100,y:50,texture:"settings",textContent:void 0});const t={POINTER_OVER:{isActive:!0,callback:()=>{this.pauseBtn.isOver=!0,this.pauseBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.pauseBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.pauseBtn.isOver=!1,this.pauseBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.pauseBtn.isOver&&(this.scene.pause("GameScene"),this.scene.pause("UIScene"),this.scene.launch("PauseScene")),this.pauseBtn.sprite.clearTint()}}};this.pauseBtn.setupCallback(t),Phaser.Display.Align.In.TopRight(this.displayZone,this.pauseBtn)}}class r extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(t=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*t,16)})),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()})),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("MenuScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class l extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.rotation=t.rotation,this.initImage(),this.scene.add.existing(this)}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}update(){}}class o{constructor(){this.isMuted=!1}initialize(t){this.scene=t}static get Instance(){return o.instance||(o.instance=new o),o.instance}get IsMuted(){return this.isMuted}set IsMuted(t){this.isMuted=t,this.isMuted&&(this.pauseAllSound(),this.pauseBGM())}playSoundFX(t,e=1,s=!1){this.isMuted||(this.scene.sound.add(t),this.scene.sound.play(t,{volume:e,loop:s}))}stopSoundFX(t){this.scene.sound.getAllPlaying().forEach((e=>{e.key===t&&e.stop()}))}stopAllSound(){this.scene.sound.getAllPlaying().forEach((t=>{t.stop()}))}pauseAllSound(){this.scene.sound.getAllPlaying().forEach((t=>{t.pause()}))}playBGM(t=1,e=!1){this.isMuted||this.bgm.play({volume:t,loop:e})}stopBGM(){this.bgm.stop()}resumeBGM(){this.isMuted||this.bgm.resume()}pauseBGM(){this.bgm.pause()}}class c extends Phaser.GameObjects.Image{getBullets(){return this.bullets}constructor(t){super(t.scene,t.x,t.y,t.texture,t.frame),this.initImage(),this.scene.add.existing(this)}initImage(){this.health=100,this.lastShoot=0,this.speed=225,this.setOrigin(.5,.5),this.setDepth(0),this.angle=180,this.barrel=this.scene.add.image(this.x,this.y,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.barrel.angle=180,this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),null!==this.scene.input.keyboard&&(this.cursors=this.scene.input.keyboard.createCursorKeys(),this.shootingKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.upKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.downKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.leftKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.rightKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)),this.scene.input.on("pointermove",this.updateBarrel,this),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleInput(),this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleInput(){this.cursors.up.isDown||this.upKey.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.speed,this.body.velocity):this.cursors.down.isDown||this.downKey.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,-this.speed,this.body.velocity):this.body.setVelocity(0,0),(this.cursors.left.isDown||this.leftKey.isDown)&&(this.cursors.down.isDown||this.downKey.isDown||this.cursors.up.isDown||this.upKey.isDown)?this.rotation+=.05:(this.cursors.right.isDown||this.rightKey.isDown)&&(this.cursors.down.isDown||this.downKey.isDown||this.cursors.up.isDown||this.upKey.isDown)&&(this.rotation-=.05)}updateBarrel(t){const e=t.positionToCamera(this.scene.cameras.main).subtract(new Phaser.Math.Vector2(this.x,this.y)).angle();this.barrel.rotation=e+Phaser.Math.PI2/4}handleShooting(){(this.shootingKey.isDown&&this.scene.time.now>this.lastShoot||this.scene.input.activePointer.isDown&&this.scene.time.now>this.lastShoot)&&(o.Instance.playSoundFX("shoot",.1),this.scene.tweens.add({targets:this,props:{alpha:.8},delay:0,duration:5,ease:"Power1",easeParams:null,hold:0,repeat:0,repeatDelay:0,yoyo:!0,paused:!1}),this.bullets.getLength()<10&&(this.bullets.add(new l({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+100))}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health/100,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,this.active=!1,this.scene.scene.start("MenuScene"))}}class d extends Phaser.GameObjects.Image{getBarrel(){return this.barrel}getBullets(){return this.bullets}constructor(t){super(t.scene,t.x,t.y,t.texture,t.frame),this.initContainer(),this.scene.add.existing(this)}initContainer(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelRed"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(this.bullets.add(new l({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+600)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,this.active=!1,this.scene.events.emit("addScore",10),o.Instance.playSoundFX("hit",.5))}}class p extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}class u extends Phaser.Scene{constructor(){super({key:"GameScene"})}create(){o.Instance.initialize(this),this.map=this.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),null!==this.tileset&&(this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),null!==this.layer&&(this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.cameras.main.setZoom(1.35),this.layer.setOrigin(0),this.layer.setCollisionByProperty({collide:!0}))),this.obstacles=this.add.group({classType:p,runChildUpdate:!0}),this.enemies=this.add.group({classType:d}),this.convertObjects(),null!=this.layer&&(this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player.getBullets(),this.layer,this.bulletHitLayer,void 0,this)),this.physics.add.collider(this.player,this.obstacles),this.physics.add.collider(this.player.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this),this.enemies.children.each((t=>(this.physics.add.overlap(this.player.getBullets(),t,this.playerBulletHitEnemy,void 0,this),this.physics.add.overlap(t.getBullets(),this.player,this.enemyBulletHitPlayer,void 0),this.physics.add.collider(t.getBullets(),this.obstacles,this.bulletHitObstacles,void 0),null!==this.layer&&this.physics.add.collider(t.getBullets(),this.layer,this.bulletHitLayer,void 0,this),!0)),this),void 0===o.Instance.bgm&&(o.Instance.bgm=this.sound.add("soundtrack")),o.Instance.playBGM(.1,!0),this.cameras.main.startFollow(this.player)}update(){this.player.update(),this.enemies.children.each((t=>{if(t.update(),this.player.active&&t.active&&null!==t.body){const e=Phaser.Math.Angle.Between(t.body.x,t.body.y,this.player.body.x,this.player.body.y);t.getBarrel().angle=(e+Math.PI/2)*Phaser.Math.RAD_TO_DEG}return!0}),this),0==this.enemies.getLength()&&console.log("player Win")}convertObjects(){var t;(null===(t=this.map.getObjectLayer("objects"))||void 0===t?void 0:t.objects).forEach((t=>{if("player"===t.type)this.player=new c({scene:this,x:t.x,y:t.y,texture:"tankBlue"});else if("enemy"===t.type){const e=new d({scene:this,x:t.x,y:t.y,texture:"tankRed"});this.enemies.add(e)}else{const e=new p({scene:this,x:t.x,y:t.y-40,texture:t.type});this.obstacles.add(e)}}))}bulletHitLayer(t){t.destroy()}bulletHitObstacles(t,e){t.destroy()}enemyBulletHitPlayer(t,e){t.destroy(),e.updateHealth()}playerBulletHitEnemy(t,e){t.destroy(),e.updateHealth()}}class y extends Phaser.Scene{constructor(){super({key:"MenuScene"}),this.bitmapTexts=[]}init(){null!==this.input.keyboard&&(this.startKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.startKey.isDown=!1)}create(){this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2-120,this.sys.canvas.height/2,"font","PRESS SPACE TO PLAY",30)),this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2-120,this.sys.canvas.height/2-100,"font","TANK",100))}update(){this.startKey.isDown&&(this.scene.start("GameScene"),this.scene.launch("UIScene"))}}class b extends Phaser.Scene{constructor(){super({key:"PauseScene"})}create(){this.graphics=this.add.graphics(),this.graphics.fillStyle(0).setAlpha(.75),this.graphics.fillRect(0,0,this.scale.canvas.width,this.scale.canvas.height),this.graphics.setVisible(!0),this.displayZone=this.add.zone(0,0,window.innerWidth,window.innerHeight).setDepth(-1),this.setupContinueBtn(),this.setupNewBtn(),this.setupMuteBtn()}setupContinueBtn(){this.continuetBtn=new a({scene:this,x:window.innerWidth/2,y:window.innerHeight/2,texture:"continue",textContent:void 0});const t={POINTER_OVER:{isActive:!0,callback:()=>{this.continuetBtn.isOver=!0,this.continuetBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.continuetBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.continuetBtn.isOver=!1,this.continuetBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.continuetBtn.isOver&&(this.scene.stop(),this.scene.resume("GameScene"),this.scene.resume("UIScene")),this.continuetBtn.sprite.clearTint()}}};this.continuetBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.continuetBtn)}setupNewBtn(){this.newBtn=new a({scene:this,x:window.innerWidth/2-200,y:window.innerHeight/2,texture:"new",textContent:void 0});const t={POINTER_OVER:{isActive:!0,callback:()=>{this.newBtn.isOver=!0,this.newBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.newBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.newBtn.isOver=!1,this.newBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.newBtn.isOver&&(this.scene.stop("UIScene"),this.scene.launch("UIScene"),this.scene.stop("GameScene"),this.scene.start("GameScene"),this.scene.stop()),this.newBtn.sprite.clearTint()}}};this.newBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.newBtn)}setupMuteBtn(){this.muteBtn=new a({scene:this,x:window.innerWidth/2+200,y:window.innerHeight/2,texture:"volume",textContent:void 0}),o.Instance.IsMuted&&this.muteBtn.sprite.setTint(8421504);const t={POINTER_OVER:{isActive:!0,callback:()=>{this.muteBtn.isOver=!0,this.muteBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.muteBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.muteBtn.isOver=!1,o.Instance.IsMuted?this.muteBtn.sprite.setTint(8421504):this.muteBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.muteBtn.isOver&&(console.log(o.Instance.IsMuted),o.Instance.IsMuted?(o.Instance.IsMuted=!1,o.Instance.resumeBGM(),this.muteBtn.sprite.clearTint()):(o.Instance.IsMuted=!0,this.muteBtn.sprite.setTint(8421504)))}}};this.muteBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.muteBtn)}}const g={title:"Tank",version:"2.0",width:window.innerWidth,height:window.innerHeight,type:Phaser.AUTO,parent:"game",scene:[r,y,u,n,b],input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},backgroundColor:"#000000",render:{pixelArt:!0,antialias:!0}};class m extends h().Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new m(g)}))}},s={};function i(t){var h=s[t];if(void 0!==h)return h.exports;var a=s[t]={exports:{}};return e[t].call(a.exports,a,a.exports,i),a.exports}i.m=e,t=[],i.O=(e,s,h,a)=>{if(!s){var n=1/0;for(c=0;c<t.length;c++){for(var[s,h,a]=t[c],r=!0,l=0;l<s.length;l++)(!1&a||n>=a)&&Object.keys(i.O).every((t=>i.O[t](s[l])))?s.splice(l--,1):(r=!1,a<n&&(n=a));if(r){t.splice(c--,1);var o=h();void 0!==o&&(e=o)}}return e}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[s,h,a]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={179:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var h,a,[n,r,l]=s,o=0;if(n.some((e=>0!==t[e]))){for(h in r)i.o(r,h)&&(i.m[h]=r[h]);if(l)var c=l(i)}for(e&&e(s);o<n.length;o++)a=n[o],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(c)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var h=i.O(void 0,[216],(()=>i(342)));h=i.O(h)})();