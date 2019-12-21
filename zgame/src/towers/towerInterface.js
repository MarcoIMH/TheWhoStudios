import GObject from "../gObject.js";

export default class TowerInterface extends GObject {
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.upgradeExp;
		this.upgradeOption;
		this.range;
		this.cadence;		
	}

	preUpdate(){
		this.element.bringOnTop();
	}

	setUpgradeOption(opt){
		this.upgradeOption = opt;
	}

	checkUpgrade(){
		//Check exp for upgrade
		if(this.st.getAccumulatedExp() >= this.upgradeExp){
			
			//Destroy the last object if necessary
			if(this.element != undefined) this.element.destroy();

			//Subtract from total exp accumulated this upgraded exp consumed.
			this.st.subtractAccumulatedExp(this.upgradeExp);

			return true;
		}
		return false;
	}
}