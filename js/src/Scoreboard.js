class Scoreboard {
	static initialize () {
		this.scorePlayer = 0;
		this.scoreAI = 0;
		this.TAG_WIN = "<span class = \"result win\">Win</span>";
		this.TAG_LOSE = "<span class = \"result lose\">Lose</span>";
		this.TAG_TIE = "<span class = \"result tie\">Tie</span>";
		this.scorePlayerElement = document.getElementById ("tag-player-score");
		this.scoreAIElement = document.getElementById ("tag-ai-score");
		this.scorePlayerHistoryElement = document.getElementById ("player-scores");
		this.scoreAIHistoryElement = document.getElementById ("ai-scores");
		this.buttonResetElement = document.getElementById ("score-status");
		document.getElementById ("play-again").addEventListener (
			"click",
			this.onClickResetButton.bind (this)
		);
	}
	
	static playerWins () {
		this.scorePlayer += 1;
		this.scorePlayerElement.innerHTML = this.scorePlayer;
		this.scorePlayerHistoryElement.innerHTML += this.TAG_WIN;
		this.scoreAIHistoryElement.innerHTML += this.TAG_LOSE;
		this.buttonResetElement.style.display = "block";
	}
	
	static computerWins () {
		this.scoreAI += 1;
		this.scoreAIElement.innerHTML = this.scoreAI;
		this.scorePlayerHistoryElement.innerHTML += this.TAG_LOSE;
		this.scoreAIHistoryElement.innerHTML += this.TAG_WIN;
		this.buttonResetElement.style.display = "block";
	}
	
	static nobodyWins () {
		this.scorePlayerHistoryElement.innerHTML += this.TAG_TIE;
		this.scoreAIHistoryElement.innerHTML += this.TAG_TIE;
		this.buttonResetElement.style.display = "block";
	}
	
	static onClickResetButton () {
		this.buttonResetElement.style.display = "none";
		TictactoeController.reset ();
	}
}