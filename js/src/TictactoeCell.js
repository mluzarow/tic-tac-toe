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
