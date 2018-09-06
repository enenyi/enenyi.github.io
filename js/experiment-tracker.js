// Class used to track experiment
class ExperimentTracker {


	constructor() {
		this.trials = [];
		this.attempt = 0;
		this.trial = null;
		this.attempt = null;
		this.menuType = null;
		this.menuDepth = null;
		this.menuBreadth = null;
		this.targetItem = null;
		this.selectedItem = null;
		this.startTime = null;
		this.endTime = null;
		this.completionTime = null;
		this.errorRate = null;
		this.redoTries = 0;
		this.totalTries = 0;
		this.redoRate = null;
	}

	resetTimers(){
		this.startTime = null;
		this.endTime = null;
	}

	startTimer() {
		this.startTime = Date.now();
	}

	recordSelectedItem(selectedItem) {
		this.selectedItem = selectedItem;
		this.stopTimer();
	}

	stopTimer() {
		if(this.selectedItem == null) {
			this.totalTries++;
			this.redoTries++;
			this.errorRate = "N.A.";
		}
		else {
			if(this.selectedItem == this.targetItem) {
				this.errorRate = (1 - (1 / this.attempt)) * 100.0;
			}
			else {
				this.errorRate = "N.A.";
			}
		}
		this.endTime = Date.now();
		this.completionTime = (this.endTime - this.startTime) / 1000.0;
		this.redoRate = (this.redoTries / this.totalTries) * 100.0;
		this.trials.push([this.trial, this.attempt, this.menuType, this.menuDepth, this.menuBreadth, this.targetItem, this.selectedItem, this.completionTime, this.errorRate, this.redoRate])
		this.resetTimers();
		this.attempt++;
	}

	setSwitchOverPoint() {
		this.totalTries = 0;
	}

	newTrial() {
		this.attempt = 1;
		this.totalTries++;
	}

	toCsv() {
		var csvFile = "Trial,Attempt,Menu Type,Menu Depth,Menu Breadth,Target Item,Selected Item,Completion Time,Error Rate,Redo Rate(Cumulative)\n";
		for (var i = 0; i < this.trials.length; i++) {
			csvFile += this.trials[i].join(',');
			csvFile += "\n";
		}

		var hiddenLink = document.createElement('a');
		hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
		hiddenLink.target = '_blank';
		hiddenLink.download = 'experiment.csv';
		document.body.appendChild(hiddenLink);
		hiddenLink.click();
	}


}
