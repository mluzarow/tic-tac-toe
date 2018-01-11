class TictactoeController {
	static initialize () {
		// Gather all cells into matrix
		this.cells = [[], [], []];
		var rows = document.getElementsByClassName ("row");
		
		for (var i = 0; i < 3; i++) {
			var row = rows[i].getElementsByClassName ("cell");
			
			for (var k = 0; k < 3; k++) {
				this.cells[i][k] = new TictactoeCell (row[k]);
			}
		}
		
		// Set move vars
		this.currentMove = 1;
		this.PLAYER_TURN = 1;
		this.COMPUTER_TURN = -1;
	}
	
	static toggleTurn () {
		this.currentMove *= -1;
	}
	
	static currentTurn () {
		return (this.currentMove);
	}
}

class TictactoeCell {
	constructor (element) {
		this.DOMelement = element;
		this.DOMelement.addEventListener ("click", this.onClick.bind (this));
		this.flagTaken = false;
		this.ownedBy = null;
	}
	
	setOwned (side) {
		this.flagTaken = true;
		this.ownedBy = side;
	}
	
	isTaken () {
		return (this.flagTaken);
	}
	
	owner () {
		return (this.ownedBy);
	}
	
	onClick () {
		if (
			!this.isTaken() &&
			TictactoeController.currentTurn () === TictactoeController.PLAYER_TURN
		) {
			this.setOwned('x');
			this.DOMelement.innerHTML = "X";
			this.DOMelement.style.cursor = "default";
			TictactoeController.toggleTurn ();
		}
	}
}