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
		alert ("Yay");
	}
}