(()=>{"use strict";var t,e={82:(t,e,s)=>{var i=s(260),a=s.n(i);class n extends Phaser.GameObjects.Container{constructor(t){super(t.scene,t.x,t.y),this.isOver=!1,this.sprite=this.scene.add.sprite(this.x,this.y,t.texture).setDepth(5),this.add(this.sprite),this.scene.add.existing(this.sprite).setScale(3),void 0!==t.textContent&&this.scene.add.text(this.x,this.y,t.textContent,{font:"48px Arial",color:"#000000"}),this.setSize(3*this.sprite.width,3*this.sprite.height),this.scene.add.existing(this),this.setInteractive()}setupCallback(t){t.POINTER_OVER.isActive&&this.on(Phaser.Input.Events.POINTER_OVER,t.POINTER_OVER.callback),t.POINTER_OUT.isActive&&this.on(Phaser.Input.Events.POINTER_OUT,t.POINTER_OUT.callback),t.POINTER_DOWN.isActive&&this.on(Phaser.Input.Events.POINTER_DOWN,t.POINTER_DOWN.callback),t.POINTER_UP.isActive&&this.on(Phaser.Input.Events.POINTER_UP,t.POINTER_UP.callback)}}class h{constructor(){this.isMuted=!1}initialize(t){this.scene=t}static get Instance(){return h.instance||(h.instance=new h),h.instance}get IsMuted(){return this.isMuted}set IsMuted(t){this.isMuted=t,this.isMuted&&(this.pauseAllSound(),this.pauseBGM())}playSoundFX(t,e=1,s=!1){this.isMuted||(this.scene.sound.add(t),this.scene.sound.play(t,{volume:e,loop:s}))}stopSoundFX(t){this.scene.sound.getAllPlaying().forEach((e=>{e.key===t&&e.stop()}))}stopAllSound(){this.scene.sound.getAllPlaying().forEach((t=>{t.stop()}))}pauseAllSound(){this.scene.sound.getAllPlaying().forEach((t=>{t.pause()}))}playBGM(t=1,e=!1){this.isMuted||this.bgm.play({volume:t,loop:e})}stopBGM(){this.bgm.stop()}resumeBGM(){this.isMuted||this.bgm.resume()}pauseBGM(){this.bgm.pause()}}class r extends Phaser.Scene{constructor(){super({key:"UIScene"}),this.initialized=!1}create(){this.score=0,this.displayZone=this.add.zone(0,0,window.innerWidth,window.innerHeight).setDepth(-1),this.scoreText=this.add.text(20,20,"SCORE - "+this.score.toString(),{font:"48px Arial",color:"#000000"}),this.add.existing(this.displayZone),this.add.existing(this.scoreText),this.setupBtn(),Phaser.Display.Align.In.TopLeft(this.displayZone,this.scoreText),this.initialized||(this.scene.get("GameScene").events.on("addScore",(t=>{this.score+=t,this.scoreText.setText("SCORE - "+this.score.toString())})),this.initialized=!0),this.setupPauseMenu()}setupPauseMenu(){this.graphics=this.add.graphics(),this.graphics.fillStyle(0).setAlpha(.75),this.graphics.fillRect(0,0,this.scale.canvas.width,this.scale.canvas.height),this.graphics.setVisible(!1),this.setupContinueBtn(),this.setupNewBtn(),this.setupMuteBtn(),this.pauseMenuContainer=this.add.container(0,0,[this.newBtn,this.continuetBtn,this.muteBtn,this.graphics]),Phaser.Display.Align.In.Center(this.displayZone,this.pauseMenuContainer),this.add.existing(this.pauseMenuContainer),this.pauseMenuContainer.setInteractive(),this.hidePauseContainer()}showPauseContainer(){this.graphics.setVisible(!0),this.newBtn.setActive(!0),this.continuetBtn.setActive(!0),this.muteBtn.setActive(!0),this.newBtn.setVisible(!0),this.continuetBtn.setVisible(!0),this.muteBtn.setVisible(!0),this.newBtn.sprite.setVisible(!0),this.continuetBtn.sprite.setVisible(!0),this.muteBtn.sprite.setVisible(!0),this.pauseBtn.sprite.setDepth(-1),this.pauseBtn.setActive(!1),this.pauseBtn.disableInteractive()}hidePauseContainer(){this.newBtn.setActive(!1),this.continuetBtn.setActive(!1),this.muteBtn.setActive(!1),this.newBtn.setVisible(!1),this.continuetBtn.setVisible(!1),this.muteBtn.setVisible(!1),this.newBtn.sprite.setVisible(!1),this.continuetBtn.sprite.setVisible(!1),this.muteBtn.sprite.setVisible(!1),this.graphics.setVisible(!1),this.pauseBtn.sprite.setDepth(5),this.pauseBtn.setActive(!0),this.pauseBtn.setInteractive()}setupContinueBtn(){this.continuetBtn=new n({scene:this,x:window.innerWidth/2,y:window.innerHeight/2,texture:"continue",textContent:void 0});const t={POINTER_OVER:{isActive:!0,callback:()=>{this.continuetBtn.isOver=!0,this.continuetBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.continuetBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.continuetBtn.isOver=!1,this.continuetBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.continuetBtn.isOver&&(this.scene.resume("GameScene"),this.hidePauseContainer()),this.continuetBtn.sprite.clearTint()}}};this.continuetBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.continuetBtn)}setupNewBtn(){this.newBtn=new n({scene:this,x:window.innerWidth/2-200,y:window.innerHeight/2,texture:"new",textContent:void 0});const t={POINTER_OVER:{isActive:!0,callback:()=>{this.newBtn.isOver=!0,this.newBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.newBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.newBtn.isOver=!1,this.newBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.newBtn.isOver&&(this.scene.stop("GameScene"),this.scene.start("GameScene"),this.scene.restart()),this.newBtn.sprite.clearTint()}}};this.newBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.newBtn)}setupMuteBtn(){this.muteBtn=new n({scene:this,x:window.innerWidth/2+200,y:window.innerHeight/2,texture:"volume",textContent:void 0}),h.Instance.IsMuted&&this.muteBtn.sprite.setTint(8421504);const t={POINTER_OVER:{isActive:!0,callback:()=>{this.muteBtn.isOver=!0,this.muteBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.muteBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.muteBtn.isOver=!1,h.Instance.IsMuted?this.muteBtn.sprite.setTint(8421504):this.muteBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.muteBtn.isOver&&(console.log(h.Instance.IsMuted),h.Instance.IsMuted?(h.Instance.IsMuted=!1,h.Instance.resumeBGM(),this.muteBtn.sprite.clearTint()):(h.Instance.IsMuted=!0,this.muteBtn.sprite.setTint(8421504)))}}};this.muteBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.muteBtn)}setupBtn(){this.pauseBtn=new n({scene:this,x:window.innerWidth-100,y:50,texture:"settings",textContent:void 0});const t={POINTER_OVER:{isActive:!0,callback:()=>{this.pauseBtn.isOver=!0,this.pauseBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.pauseBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.pauseBtn.isOver=!1,this.pauseBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.pauseBtn.isOver&&(this.scene.pause("GameScene"),this.showPauseContainer()),this.pauseBtn.sprite.clearTint()}}};this.pauseBtn.setupCallback(t),Phaser.Display.Align.In.TopRight(this.displayZone,this.pauseBtn)}}class l extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){localStorage.getItem("tank-highscore")||localStorage.setItem("tank-highscore","0"),this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(t=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*t,16)})),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()})),this.load.atlas("confetti","assets\\particles\\cofetti.png","assets\\particles\\cofetti.json"),this.load.atlas("flares","assets/particles/flares.png","assets/particles/flares.json"),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("MenuScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class c extends Phaser.Scene{constructor(){super({key:"GameOverScene"})}init(t){this.score=t.score}create(){this.cameras.main.fadeIn(1e3,0,0,0),this.cameras.main.setBackgroundColor("#ADD8E6");const t=this.add.graphics();this.displayZone=this.add.zone(0,0,window.innerWidth,window.innerHeight).setDepth(-1),this.scoreText=this.add.text(this.cameras.main.width/2,this.cameras.main.height/3,"Score: 0",{font:"64px Arial",color:"#f7f7f7"}).setOrigin(.5);const e={scoreValue:0},s={scoreValue:this.score};this.tweens.add({targets:e,scoreValue:s.scoreValue,duration:750,onUpdate:()=>{this.scoreText.setText("Score: "+Math.floor(e.scoreValue).toString())},callbackScope:this}),t.fillStyle(0,.5),t.fillRoundedRect(this.cameras.main.width/2-this.cameras.main.width/4,this.cameras.main.height/2-this.cameras.main.height/5,this.cameras.main.width/2,this.cameras.main.height/3,10),this.gameOverText=this.add.bitmapText(this.cameras.main.width/2,this.cameras.main.height/4,"font","GAME OVER",100).setOrigin(.5);const i=localStorage.getItem("tank-highscore");i&&this.score>parseInt(i)&&localStorage.setItem("tank-highscore",this.score.toString());const a=localStorage.getItem("tank-highscore");a&&(this.highScoreText=this.add.text(this.cameras.main.width/2,this.cameras.main.height/3+100,"High Score: "+a,{font:"64px Arial",color:"#f7f7f7"}).setOrigin(.5)),this.setupNewBtn(),Phaser.Display.Align.In.Center(this.displayZone,this.scoreText),Phaser.Display.Align.In.Center(this.displayZone,this.highScoreText),Phaser.Display.Align.In.TopCenter(this.displayZone,this.gameOverText)}setupNewBtn(){this.newBtn=new n({scene:this,x:window.innerWidth/2,y:window.innerHeight/2+50,texture:"new",textContent:void 0}),this.newBtn.sprite.setScale(6);const t={POINTER_OVER:{isActive:!0,callback:()=>{this.newBtn.isOver=!0,this.newBtn.sprite.setTint(16711680)}},POINTER_DOWN:{isActive:!0,callback:()=>{this.newBtn.sprite.setTint(65280)}},POINTER_OUT:{isActive:!0,callback:()=>{this.newBtn.isOver=!1,this.newBtn.sprite.clearTint()}},POINTER_UP:{isActive:!0,callback:()=>{this.newBtn.isOver&&(this.cameras.main.fadeOut(1e3,0,0,0),this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(()=>{this.scene.start("GameScene"),this.scene.launch("UIScene"),this.scene.stop()}))),this.newBtn.sprite.clearTint()}}};this.newBtn.setupCallback(t),Phaser.Display.Align.In.Center(this.displayZone,this.newBtn),this.tweens.add({targets:this.newBtn.sprite,scale:7,yoyo:!0,repeat:-1,duration:400})}}class o extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.rotation=t.rotation,this.initImage(),this.scene.add.existing(this)}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}update(){}}class d extends Phaser.GameObjects.Image{getBullets(){return this.bullets}constructor(t){super(t.scene,t.x,t.y,t.texture,t.frame),this.initImage(),this.scene.add.existing(this)}initImage(){this.health=100,this.lastShoot=0,this.speed=225,this.setOrigin(.5,.5),this.setDepth(0),this.angle=180,this.barrel=this.scene.add.image(this.x,this.y,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.barrel.angle=180,this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),null!==this.scene.input.keyboard&&(this.cursors=this.scene.input.keyboard.createCursorKeys(),this.shootingKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.upKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.downKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.leftKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.rightKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)),this.scene.input.on("pointermove",this.updateBarrel,this),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleInput(),this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleInput(){this.cursors.up.isDown||this.upKey.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.speed,this.body.velocity):this.cursors.down.isDown||this.downKey.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,-this.speed,this.body.velocity):this.body.setVelocity(0,0),(this.cursors.left.isDown||this.leftKey.isDown)&&(this.cursors.down.isDown||this.downKey.isDown||this.cursors.up.isDown||this.upKey.isDown)?this.rotation+=.05:(this.cursors.right.isDown||this.rightKey.isDown)&&(this.cursors.down.isDown||this.downKey.isDown||this.cursors.up.isDown||this.upKey.isDown)&&(this.rotation-=.05)}updateBarrel(t){const e=t.positionToCamera(this.scene.cameras.main).subtract(new Phaser.Math.Vector2(this.x,this.y)).angle();this.barrel.rotation=e+Phaser.Math.PI2/4}handleShooting(){(this.shootingKey.isDown&&this.scene.time.now>this.lastShoot||this.scene.input.activePointer.isDown&&this.scene.time.now>this.lastShoot)&&(h.Instance.playSoundFX("shoot",.1),this.scene.tweens.add({targets:this,props:{alpha:.8},delay:0,duration:5,ease:"Power1",easeParams:null,hold:0,repeat:0,repeatDelay:0,yoyo:!0,paused:!1}),this.bullets.getLength()<10&&(this.bullets.add(new o({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+100))}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health/100,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,this.active=!1,this.scene.scene.start("MenuScene"))}}class p extends Phaser.GameObjects.Image{getBarrel(){return this.barrel}getBullets(){return this.bullets}constructor(t){super(t.scene,t.x,t.y,t.texture,t.frame),this.initContainer(),this.scene.add.existing(this)}initContainer(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelRed"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(this.bullets.add(new o({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+600)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,this.active=!1,this.scene.events.emit("addScore",10),h.Instance.playSoundFX("hit",.5))}}class u extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}class y extends Phaser.Scene{constructor(){super({key:"GameScene"}),this.initialized=!1}create(){this.cameras.main.fadeIn(1e3,0,0,0),null!==this.input.keyboard&&(this.escKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)),this.initialized||(this.events.on("outTime",(()=>{})),this.initialized=!0),h.Instance.initialize(this),this.map=this.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),null!==this.tileset&&(this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),null!==this.layer&&(this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.cameras.main.setZoom(1.35),this.layer.setOrigin(0),this.layer.setCollisionByProperty({collide:!0}))),this.obstacles=this.add.group({classType:u,runChildUpdate:!0}),this.enemies=this.add.group({classType:p}),this.convertObjects(),null!=this.layer&&(this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player.getBullets(),this.layer,this.bulletHitLayer,void 0,this)),this.physics.add.collider(this.player,this.obstacles),this.physics.add.collider(this.player.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this),this.enemies.children.each((t=>(this.physics.add.overlap(this.player.getBullets(),t,this.playerBulletHitEnemy,void 0,this),this.physics.add.overlap(t.getBullets(),this.player,this.enemyBulletHitPlayer,void 0),this.physics.add.collider(t.getBullets(),this.obstacles,this.bulletHitObstacles,void 0),null!==this.layer&&this.physics.add.collider(t.getBullets(),this.layer,this.bulletHitLayer,void 0,this),!0)),this),void 0===h.Instance.bgm&&(h.Instance.bgm=this.sound.add("soundtrack")),h.Instance.playBGM(.1,!0),this.cameras.main.startFollow(this.player)}update(){this.player.update(),this.enemies.children.each((t=>{if(t.update(),this.player.active&&t.active&&null!==t.body){const e=Phaser.Math.Angle.Between(t.body.x,t.body.y,this.player.body.x,this.player.body.y);t.getBarrel().angle=(e+Math.PI/2)*Phaser.Math.RAD_TO_DEG}return!0}),this),(0==this.enemies.getLength()||this.escKey.isDown)&&(h.Instance.stopAllSound(),this.cameras.main.fadeOut(1e3,0,0,0),this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(()=>{this.scene.stop("UIScene"),this.scene.stop("GameScene"),this.scene.start("GameOverScene",{score:this.scene.get("UIScene").score})})))}convertObjects(){var t;(null===(t=this.map.getObjectLayer("objects"))||void 0===t?void 0:t.objects).forEach((t=>{if("player"===t.type)this.player=new d({scene:this,x:t.x,y:t.y,texture:"tankBlue"});else if("enemy"===t.type){const e=new p({scene:this,x:t.x,y:t.y,texture:"tankRed"});this.enemies.add(e)}else{const e=new u({scene:this,x:t.x,y:t.y-40,texture:t.type});this.obstacles.add(e)}}))}bulletHitLayer(t){t.destroy()}bulletHitObstacles(t,e){t.destroy()}enemyBulletHitPlayer(t,e){t.destroy(),e.updateHealth()}playerBulletHitEnemy(t,e){t.destroy(),e.updateHealth()}}class m extends Phaser.Scene{constructor(){super({key:"MenuScene"}),this.bitmapTexts=[]}init(){null!==this.input.keyboard&&(this.startKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.startKey.isDown=!1)}create(){this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2-120,this.sys.canvas.height/2,"font","PRESS SPACE TO PLAY",30)),this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2-120,this.sys.canvas.height/2-100,"font","TANK",100))}update(){this.startKey.isDown&&(this.cameras.main.fadeOut(1e3,0,0,0),this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(()=>{this.scene.start("GameScene"),this.scene.launch("UIScene")})))}}const g={title:"Tank",version:"2.0",width:window.innerWidth,height:window.innerHeight,type:Phaser.AUTO,parent:"game",scene:[l,m,y,r,c],input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},backgroundColor:"#000000",render:{pixelArt:!0,antialias:!0}};class b extends a().Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new b(g)}))}},s={};function i(t){var a=s[t];if(void 0!==a)return a.exports;var n=s[t]={exports:{}};return e[t].call(n.exports,n,n.exports,i),n.exports}i.m=e,t=[],i.O=(e,s,a,n)=>{if(!s){var h=1/0;for(o=0;o<t.length;o++){for(var[s,a,n]=t[o],r=!0,l=0;l<s.length;l++)(!1&n||h>=n)&&Object.keys(i.O).every((t=>i.O[t](s[l])))?s.splice(l--,1):(r=!1,n<h&&(h=n));if(r){t.splice(o--,1);var c=a();void 0!==c&&(e=c)}}return e}n=n||0;for(var o=t.length;o>0&&t[o-1][2]>n;o--)t[o]=t[o-1];t[o]=[s,a,n]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={179:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var a,n,[h,r,l]=s,c=0;if(h.some((e=>0!==t[e]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(l)var o=l(i)}for(e&&e(s);c<h.length;c++)n=h[c],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(o)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var a=i.O(void 0,[216],(()=>i(82)));a=i.O(a)})();