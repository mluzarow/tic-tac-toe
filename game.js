class TictactoeController {
	static initialize () {
		// Gather all cells into matrix
		this.cells = [[], [], []];
		var rows = document.getElementsByClassName ("row");
		var mask = 1;
		
		for (var i = 0; i < 3; i++) {
			var row = rows[i].getElementsByClassName ("cell");
			
			for (var k = 0; k < 3; k++) {
				this.cells[i][k] = new TictactoeCell (row[k], mask);
				mask <<= 1;
			}
		}
		
		// Set move vars
		this.currentMove = true;
		
		// Init the AI
		this.ai = new TicTacToeAI (1);
		this.playerCells = 0;
		this.aiCells = 0;
	}
	
	static reset () {
		for (var i = 0; i < 3; i++) {
			for (var k = 0; k < 3; k++) {
				this.cells[i][k].reset ();
			}
		}
		
		this.currentMove = true;
		this.playerCells = 0;
		this.aiCells = 0;
	}
	
	static toggleTurn () {
		this.currentMove = !this.currentMove;
	}
	
	static checkForWin (playerToCheck) {
		if (playerToCheck === "x") {
			var moves = this.playerCells;
		} else {
			var moves = this.aiCells;
		}
		
		// console.log ("Checking for win...");
		// console.log ("Player: " + playerToCheck);
		// console.log ("Moves: " + moves.toString(2));
		
		// Check for win
		if (
			// Rows
			(moves & 7) === 7 ||      // 000 000 111
			(moves & 56) === 56 ||    // 000 111 000
			(moves & 448) === 448 ||  // 111 000 000
			// Columns
			(moves & 292) === 292 || // 100 100 100
			(moves & 146) === 146 || // 010 010 010
			(moves & 73) === 73 ||   // 001 001 001
			// Diags
			(moves & 273) === 273 || // 100 010 001
			(moves & 84) === 84      // 001 010 100
		) {
			TictactoeController.endGame (playerToCheck === "x" ? 0 : 1);
			return (true);
		} else if (TictactoeController.turns === 9) {
			TictactoeController.endGame (2);
			return (true);
		}
			return (false);
	}
	
	static isPlayersTurn () {
		return (this.currentMove);
	}
	
	static endGame (s) {
		if (s === 0) {
			console.log ("Player wins.");
		} else if (s === 1) {
			console.log ("AI wins.");
		} else {
			console.log ("Nobody wins.");
		}
		
		// TictactoeController.reset ();
	}
}

class TictactoeCell {
	constructor (element, mask) {
		this.DOMelement = element;
		this.DOMelement.addEventListener ("click", this.onClick.bind (this));
		this.mask = mask;
		this.flagTaken = false;
	}
	
	reset () {
		this.DOMelement.innerHTML = "";
		this.DOMelement.style.cursor = "pointer";
		this.flagTaken = false;
	}
	
	setTaken () {
		this.flagTaken = true;
	}
	
	isTaken () {
		return (this.flagTaken);
	}
	
	onClick () {
		if (!this.isTaken () && TictactoeController.isPlayersTurn ()) {
			TictactoeController.turns++;
			this.setTaken ();
			TictactoeController.playerCells |= this.mask;
			this.DOMelement.innerHTML = "X";
			this.DOMelement.style.cursor = "default";
			TictactoeController.toggleTurn ();
			var gameOver = TictactoeController.checkForWin ("x");
			if (!gameOver) {
				TictactoeController.ai.processTurn ();
			}
		}
	}
	
	onClickAI () {
		TictactoeController.turns++;
		this.setTaken();
		TictactoeController.aiCells |= this.mask;
		this.DOMelement.innerHTML = "O";
		this.DOMelement.style.cursor = "default";
		var gameOver = TictactoeController.checkForWin ("o");
		if (!gameOver) {
			TictactoeController.toggleTurn ();
		}
	}
}

class TicTacToeAI {
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