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
		this.previousCompletionTime = null;
		this.improvementRate = null;
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

		this.endTime = Date.now();
		this.completionTime = (this.endTime - this.startTime) / 1000.0;
		if(this.selectedItem == this.targetItem) {
			if(this.trial % 3 == 1) {
				this.improvementRate = 0;
			}
			else {
				this.improvementRate = ((this.previousCompletionTime - this.completionTime) / this.previousCompletionTime) * 100.0;
			}
			this.previousCompletionTime = this.completionTime;
			this.errorRate = 1 - (1 / this.attempt) * 100.0;
		}
		else {
			this.improvementRate = 0;
			this.errorRate = "N.A.";
		}
		this.trials.push([this.trial, this.attempt, this.menuType, this.menuDepth, this.menuBreadth, this.targetItem, this.selectedItem, this.completionTime, this.errorRate, this.improvementRate])
		this.resetTimers();
		this.attempt++;

	}

	newTrial() {
		this.attempt = 1;
	}

	toCsv() {
		var csvFile = "Trial,Attempt,Menu Type,Menu Depth,Menu Breadth,Target Item,Selected Item,Completion Time,Error Rate,Improvement Rate\n";
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
