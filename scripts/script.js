$(document).ready(function(){
	var canvas = $('#canvas');
	var ctxt = canvas[0].getContext('2d');
	var cWidth = canvas.width();
	var cHeight = canvas.height();

	var numbersOfCell = 10;
	var numbersOfRow = 10;
	
	var sleepTime = 1500;
	
	var gameSpace = [];

	
	
	var	cellWidth  = parseInt(cWidth/numbersOfCell);
	var	cellHeight = parseInt(cHeight/numbersOfRow); 

		ctxt.canvas.width  = cWidth;
		ctxt.canvas.height = cHeight;

	for(var i = 0; i < numbersOfRow;i++){
		gameSpace[i]=[];

		for(var j = 0; j < numbersOfCell; j++){

				gameSpace[i][j] = 0;				
		}
	}
	var user;

		user = {
			Ox : parseInt(numbersOfCell/2),
			Oy : numbersOfCell-1,
			OxBefore : parseInt(numbersOfCell/2),
			OyBefore : numbersOfCell-1,
			choice : 0
		} 

  	function drawRect(colorR, Ox, Oy, widthR, heightR){
		ctxt.beginPath();
		ctxt.fillStyle = colorR;
		ctxt.fillRect(Ox,Oy,widthR,heightR);


		ctxt.closePath();
		ctxt.fill();
	}
	function deleteRect(i,j){
		var Ox = j*cellWidth;
		var Oy = i*cellHeight;
		ctxt.clearRect(Ox,Oy,cellWidth,cellHeight);
	}

	function drawLine(colorL,Ox1,Oy1,Ox2,Oy2,width){
		ctxt.beginPath();
		ctxt.fillStyle = colorL;
		ctxt.lineWidth = width;
		ctxt.moveTo(Ox1,Oy1);
		ctxt.lineTo(Ox2,Oy2);
		ctxt.stroke();
		ctxt.closePath();
		ctxt.fill();
	}

	function makeGrid(numbersOfCell,numbersOfRow){
		


			for(var i = 0; i <= numbersOfCell; i++){

				var Ox1 = 0;
				var Oy1 = i*cellHeight;
				
				var Ox2= cWidth;
				var Oy2 = i*cellHeight;

				var width = 1;
				var color ='#000';

				drawLine(color,Ox1,Oy1,Ox2,Oy2,width);
			}
			for(var i = 0; i <= numbersOfRow; i++){

				var Ox1 = i*cellWidth;
				var Oy1 = 0;
				
				var Ox2= i*cellWidth;
				var Oy2 = cHeight;

				var width = 1;
				var color ='#000';

				drawLine(color,Ox1,Oy1,Ox2,Oy2,width);
			}
		}

	function makeSpaceShip(){
		for(var i = 0; i < 2; i++){
			for( var j = 0; j<numbersOfCell; j++){
				if(j>2+i && j<numbersOfCell-2-i){
					gameSpace[i][j] = 'eShip';
				}
			}
		}
	}
	gameSpace[user.Oy][user.Ox] = 'user';

	function drawSpace(){


		for(var i in gameSpace){
			for( j in gameSpace[i]){
				switch(gameSpace[i][j]){
					case('eShip'):{
						drawRect('rgba(255,0,0,1)',cellWidth*j,cellHeight*i,cellWidth,cellHeight);
						break;
					}
					case('user'):{
						deleteRect(user.OyBefore,user.OxBefore);
						drawRect('rgba(0,255,0,1)',cellWidth*j,cellHeight*i,cellWidth,cellHeight);
						break
					}
				}
			}
		}
	}


	function goLeft(i,j){
		var obj = gameSpace[i][j];
			gameSpace[i][j] = 0;
			gameSpace[i][j-1] = obj;
	}

	function goRight(i,j){
		var obj = gameSpace[i][j];
		if(j<numbersOfCell){

			gameSpace[i][j] = 0;
			gameSpace[i][j+1] = obj;
		
		}
	}
	function clearSpace(obj){
		for(var i = 0; i< numbersOfCell; i++){
			for(var j = 0; j< numbersOfCell; j++){
				if (gameSpace[i][j] == obj) {
					deleteRect(i,j);
				};
			}
		}
		
	}



	function spaceObjGo(where,obj){
		
		switch(where){
			case('left'):
				for(var j = 0; j< numbersOfCell; j++){
					for(var i = 0; i< numbersOfCell; i++){
						
						if(gameSpace[i][j] == obj){
							if(j===0){
								spaceObjGo('right',obj);

								return false;
							}
							else{
								goLeft(i,j);
							}
						}
					}	
				}
			return true;
			break;
			
			case('right'):
				for(var j = numbersOfCell-1; j>= 0; j--){

					for(var i = 0; i< numbersOfCell; i++){
						if(gameSpace[i][j] == obj){
							if(j===numbersOfCell-1){
								spaceObjGo('bottom',obj);
								return false;
							}
							else{
								goRight(i,j);
							}
						}
					}	
				}
				return true;
			break;
			case('bottom'):

				for(var i = numbersOfCell-1; i>= 0; i--){

					for(var j = 0; j< numbersOfCell; j++){

						if(gameSpace[i][j] == obj){

							gameSpace[i][j]=0;
							gameSpace[i+1][j] = obj;
						}
					}
				}
				return false;
		}
	}
	var whereEShipGoing = 'left';
	function eShipGoing(){
		clearSpace('eShip');


		if(!spaceObjGo(whereEShipGoing,'eShip')){
			switch(whereEShipGoing){
				case('left'):
					whereEShipGoing = 'right';
					break;
				case('right'):
					whereEShipGoing = 'left';
					break;
			}
		}
		
		drawSpace();
		setTimeout(function(){
			eShipGoing();
			if(user.choice){
				user.choice = 0;
			}

		},sleepTime);
	}
	
	$(window).on({
	keydown: function(e){
		if(!user.choice){
			switch(e.keyCode){
				case(37):
					if(user.Ox!==0){
						gameSpace[user.Oy][user.Ox] = 0;
						gameSpace[user.Oy][user.Ox-1] = 'user';
						user.OyBefore = user.Oy;
						user.OxBefore = user.Ox;
						user.Ox --;
					}
					break;
				case(39):
					if(user.Ox!==numbersOfCell){
						gameSpace[user.Oy][user.Ox] = 0;
						gameSpace[user.Oy][user.Ox+1] = 'user';
						user.OyBefore = user.Oy;
						user.OxBefore = user.Ox;
						user.Ox++;
					}
					break;
			}
			user.choice = 1;
		}
			
		}
	});
	

	//makeGrid(numbersOfCell,numbersOfRow);
	makeSpaceShip();
	eShipGoing();


	

	

	


})