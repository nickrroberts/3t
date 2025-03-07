    function GameBoard () {
        let board = [[0,0,0], 
                     [0,0,0],
                     [0,0,0]
                ];
        function playToken (move, player) {
            if (!getAvailableCells(move)) {
                console.log("Invalid move, please try again.");
                return false;
            }
            const [row, col] = move;
            board[row][col] = player.token;
            
            return true;
        }

        function getAvailableCells(move) {
            const [row, col] = move;
            console.log("get Available moves input:" + move)
            console.log(typeof move);
            if (board[row][col] === 0) {
                return true
            } else {return false}
        }

        function showGameBoard () {
            console.table(board);

        }
        
        function checkWin() {
            const winningLines = [];

            winningLines.push(...board);

            for (let col = 0; col < 3; col++) {
                winningLines.push([board[0][col], board[1][col], board[2][col]]);
            }

            winningLines.push([board[0][0], board[1][1], board[2][2]]);
            winningLines.push([board[0][2], board[1][1], board[2][0]]);

            for (let line of winningLines) {
                if (line.every(cell => cell === 1)) return "Winner: Player One";
                if (line.every(cell => cell === 2)) return "Winner: Player Two";
            }

            if (board.flat().every(cell => cell !== 0)) return "Tie!";

            return false;


        }

        return {playToken, getAvailableCells, showGameBoard, checkWin}

    }

    function GameController (playerOneName = "Player 1", playerTwoName = "Player 2") {
        const board = GameBoard();
        let playerMove;
        const players = [
            {
                name: playerOneName,
                token: 1,
                symbol: "x-token"
            },
            {
                name: playerTwoName,
                token: 2,
                symbol: "o-token"
            }
        ]

        let activePlayer = players[0];

        function switchActivePlayer(player) {
            if (player == players[0]) {
                activePlayer = players[1]
            } else {activePlayer = players[0]}
            console.log(`${activePlayer.name}'s turn!`);
        }

        function playRound () {
            board.showGameBoard();
            const token = document.createElement("img");
            token.setAttribute("src",`${activePlayer.symbol}.svg`);
            const article = document.querySelector("article");
            let moveMessage = document.getElementById("moveMessage");
            moveMessage.textContent = `Alright, ${activePlayer.name}. What's your move?`
            
            article.addEventListener('click', (event) => {
                let cell = event.target;
                if (cell.hasAttribute("data-id")) {
                    playerMove = cell.getAttribute("data-id").split(",").map(Number);
                    console.log(`value: ${playerMove} and type is ${typeof playerMove} `)
                    let moveValid = board.playToken(playerMove, activePlayer); 
                    if (!moveValid) {               
                        return playRound();  
                    }
                    event.target.appendChild(token);
                }
                let result = board.checkWin();
                if (result !== false) {
                    console.log(result);
                    return;
                }
                switchActivePlayer(activePlayer);
                playRound(); 
            });    

            
        }

        playRound();
        


    }

    const game = GameController();