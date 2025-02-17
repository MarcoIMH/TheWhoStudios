import Selector from "../icons/iconSelector.js";
import Icon from "../icons/icon.js";

var ms = 1;
var unlockedStages = 1;

export default class MenuMap extends Phaser.Scene {
	constructor(){
		super({ key: 'menumap'});
		this.currentStage = 1;
		this.maxStage = 3;	
		this.mapSelector = 0;	
		this.defaultIcon;
		this.selector;
	}

	preload(){
		//Background
		this.load.image("backgroundMap", "./assets/states/backgroundmap.jpg");

		//Buttons
		this.load.image("buttonBackIn", "./assets/buttons/buttonBackIn.png");
		this.load.image("buttonBackOut","./assets/buttons/buttonBackOut.png");
		this.load.image("buttonPlayIn", "./assets/buttons/buttonPlayIn.png");
		this.load.image("buttonPlayOut","./assets/buttons/buttonPlayOut.png");

		//Icons for map selector
		this.load.image("selector", "./assets/maps/icons/iconSelector.png");
		this.load.image("icon1", "./assets/maps/icons/icon1.png");
		this.load.image("icon2", "./assets/maps/icons/icon2.png");
		this.load.image("icon3", "./assets/maps/icons/icon3.png");
	}

	create(){
		let pointer = this.input.activePointer;
		this.input.mouse.disableContextMenu();

		//Background
		this.add.image(0,0, "backgroundMap").setOrigin(0);

		//Buttons
		this.buttonBack = this.add.image(1200,760, "buttonBackOut").setScale(0.5).setInteractive();
		this.buttonPlay = this.add.image(270, 760, "buttonPlayOut").setScale(0.5).setInteractive();
		
		//Array for icons
		this.iconArray = this.add.group();
		this.createIcons();			
	}

	update(){
		this.buttonBack.on('pointerover', pointer=>{
			this.buttonBack.destroy();
			this.buttonBack = this.add.image(1200,760, "buttonBackIn").setScale(0.5).setInteractive();
			this.buttonBack.on('pointerdown', pointer=>{
				this.scene.start('menumain');
			});			
		});

		this.buttonPlay.on('pointerover', pointer=>{
			this.buttonPlay.destroy();
			this.buttonPlay = this.add.image(270, 760, "buttonPlayIn").setScale(0.5).setInteractive();
			this.buttonPlay.on('pointerdown', pointer=>{
				if(this.mapSelector!=0){
					this.mapSelector = 0;					
					this.scene.start('game');
				}
			});
		});	
	}

	//Crate icons based on unlockstage
	createIcons(){
		console.log("Unlocked stages: "+ unlockedStages);
		for(let x=1;x<=unlockedStages && x<=this.maxStage;x++){	
			let newIcon;		
			switch(x){
				case 1:{
					newIcon = new Icon(this, this.defaultIcon, 80, 550, x);
					break;
				}
				case 2:{
					newIcon = new Icon(this, this.defaultIcon, 150, 70, x);
					break;
				}
				case 3:{
					newIcon = new Icon(this, this.defaultIcon, 620, 300, x);
					break;
				}
			}				
			this.iconArray.add(newIcon);
		}
	}

	//Create Selector above icon"x"
	createSelector(x){
		this.mapSelector = x;
		this.iconArray.children.iterate(elem=>{
			if(elem.getIconNumber() == this.mapSelector){
				ms = this.mapSelector;
				if(this.selector != undefined) {
					this.selector.clearSelector();
				}
				this.selector = new Selector(this, this.selector, elem.getXPos(), elem.getYPos());
			}
		});
	}
}

export function getMapSelector(){
	return ms;
}

export function increaseUnlockedStages(){
	unlockedStages++;
}