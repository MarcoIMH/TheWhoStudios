export default class EnemyFactory{
	constructor(state, mapSel){
		this.st = state;
		this.ms = mapSel;
		this.enemySettings = [];			
		this.type;
	}

	getEnemyConfig(type){
		this.type = type;

		//Reset config array
		this.resetConfig = [];
		this.enemySettings = this.resetConfig;
		
		/*-----------------------------------------------------------------------------------------------------------
				Array Structure: DAMAGE / HP / POISON RES / ICE RES / FIRE RES / THUNDER RES / EXPERIENCIE PER KILL
		------------------------------------------------------------------------------------------------------------*/
		switch(this.ms){
			case 1: {
				if     (this.type == "light")	this.enemySettings = [140,100,0,0,0,0,7];
				else if(this.type == "middle")	this.enemySettings = [170,250,5,0,0,10,8];
				else if(this.type == "heavy")	this.enemySettings = [300,500,10,0,0,20,25];
				break;
			}
			case 2:{
				if     (this.type == "light")	this.enemySettings = [200,150,5,0,0,10,10];
				else if(this.type == "middle")	this.enemySettings = [400,350,10,0,0,20,25];
				else if(this.type == "heavy")	this.enemySettings = [800,800,15,0,0,30,70];
				break;
			} 			
			case 3: {
				if     (this.type == "light")	this.enemySettings = [400,200,10,0,0,20,25];
				else if(this.type == "middle")	this.enemySettings = [800,400,15,0,0,30,70];
				else if(this.type == "heavy")	this.enemySettings = [1200,850,20,0,0,40,165];
				break;
			}
		}			
		return this.enemySettings;
	}
}