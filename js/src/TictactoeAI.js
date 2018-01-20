class TictactoeAI {
	constructor (difficulty) {
		this.difficulty = difficulty;
	}
	
	processTurn () {
		var cellsState = TictactoeController.playerCells | TictactoeController.aiCells;
		var freeCellList = [];
		
		for (var i = 0; i < 9; i++) {
			if ((cellsState & 1) === 0) {
				freeCellList.push (i);
			}
			cellsState >>= 1;
		}
		
		if (this.difficulty == 1) {
			// Easy mode AI; select cell at random
			var choice = Math.floor(Math.random() * Math.floor(freeCellList.length));
			choice = freeCellList[choice];
			
			TictactoeController.cells[Math.floor (choice / 3)][choice % 3].onClickAI ();
		} else {
			
		}
	}
}
