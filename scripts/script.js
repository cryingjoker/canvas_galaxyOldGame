$(document).ready(function(){
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	var fireSpaceSheep = [];
	var userSheep = [];
	var userSheepFire = []
	
		

	var x = 10;
	var y = 10;

	var numbersOfCell =10;
	var numbersOfRow = 10;

		context.canvas.width  = canvasWidth;
		context.canvas.height = canvasHeight;



	var cellWidth = parseInt(canvasWidth/numbersOfCell);
	var cellHeight = parseInt(canvasHeight/numbersOfRow)-1;
	
	context.strokeStyle = '#000';

	for (var i = 0; i <= numbersOfCell; i++) {
		context.beginPath();
		context.moveTo(cellWidth*i,0);
		context.lineTo(cellWidth*i,cellHeight*numbersOfRow);
		context.stroke();
		context.closePath();
		context.fill();
	};

	for (var j = 0; j <= numbersOfRow; j++) {
//console.log(canvasHeight,numbersOfRow,cellHeight*j,j);
		context.beginPath();
		context.moveTo(cellWidth*numbersOfCell,cellHeight*j);
		context.lineTo(0,cellHeight*j);
		context.lineWidth = 1;
		context.lineCap = 'butt';
		context.stroke();
		context.closePath();
		context.fill();
	};

	var spaceShips = [];
	spaceShips[0] = [];
	for (var i = 0; i <10; i++) {
		var ship = 0;
		if(i>1&&i<8){
			ship = 1;
		}
	 	 spaceShips[0].push(ship);
	};
	spaceShips[1]  = [];
	for (var i = 0; i <10; i++) {
		var ship = 0;
		if(i>2&&i<7){
			ship = 1;
		}
	 	 spaceShips[1].push(ship);
	 };
	spaceShipsDraw();
	function spaceShipsDraw(){
		 for(i in spaceShips){
	 		for(j in spaceShips[i]){

		 		if(spaceShips[i][j]){
		 			context.beginPath();
		 			context.fillStyle = 'rgba(155,0,0,0.4)';
		 			context.fillRect(cellWidth*j+1,cellHeight*i+1,cellHeight-2,cellWidth-2);
		 			context.closePath();
					context.fill();
		 		}
	 		}
	 	}
	}
	function spaceShipsGo(where){
		for(i in spaceShips){
		/*	if(where =='left'&&spaceShips[i][0]===1){
				where ='right';
			}
			if(where =='right'&&spaceShips[i][numbersOfCell-1]===1){
				where ='left';
				//spaceShips[i][j-1]
			}*/
			for( j in spaceShips[i]){
				i = i-0;
				j = j-0;
				var j2 = numbersOfCell - 1 - j;
				if (spaceShips[i][j]&&where=='left') {
					if(!j&&spaceShips[i][j]){
						return false;
					}
							spaceShips[i][j-1]=1;
							spaceShips[i][j]=0;					
				}
				if(spaceShips[i][j2]&&where=='right'){
					if(j2==numbersOfCell-1&&spaceShips[i][j2]){

						return false;
					}
				

							spaceShips[i][j2]=0;
							spaceShips[i][j2+1]=1;
							
						//	console.log(spaceShips[0],'j2', j2);

					
					}
				};
			
		}
	}
	function spaceShipsReset() {
		 for(i in spaceShips){
	 		for(j in spaceShips[i]){
		 		if(spaceShips[i][j]){
		 			context.clearRect(cellWidth*j+1,cellHeight*i+1,cellHeight-2,cellWidth-2);
		 		}
	 		}
	 	}	
	}
	function spaceShipsFly(sleepTime,where){
		setTimeout(function(){
			
				for(i in spaceShips){
					if(spaceShips[i][0]){
						where = 'right';
					}
					if (spaceShips[i][numbersOfCell-1]){
						where = 'left';
					};
				}
			spaceShipsReset();
			spaceShipsGo(where);
			spaceShipsDraw();
			spaceShipsFly(sleepTime,where);
		},sleepTime);


	}
	spaceShipsFly(2000,'left');
	spaceShipsAtack(5000);
	function spaceShipsAtack(sleepTime){
		setTimeout(function(){
		var numbersOfSpaceSheeps = 0;
		var numbersOfSpaceSheepsOnFlang = 0
		var topShips = [];
		for(i in spaceShips){
			//console.log(spaceShips[0]);
			for(j in spaceShips[spaceShips.length-i-1]){
				if((i-0)===0){
					topShips.push(spaceShips[spaceShips.length-i-1][j]);
					if(spaceShips[spaceShips.length-i-1][j]){
						numbersOfSpaceSheepsOnFlang++;
					}
				}
				else{
					if(!topShips[j]&&spaceShips[spaceShips.length-i-1][j]){
						numbersOfSpaceSheepsOnFlang++;
						topShips[j]=1;
					}
				}

				if (spaceShips[spaceShips.length-i-1][j]){

					numbersOfSpaceSheeps++;
				};
			}
		var sheepFire = parseInt(Math.random()*numbersOfSpaceSheepsOnFlang);
		indexSheepFire = function(){
			var x  = 0;
			for(i in topShips){
				if(topShips[i]){
					if(x===sheepFire){
						x = i;
						return x;
					}
					x++;
				}
			}
		}
		var indexSheepFire = indexSheepFire();
		//for(i ) 
		

		}

		//console.log(numbersOfSpaceSheeps,numbersOfSpaceSheepsOnFlang);
		//console.log(topShips);

		function fireSheepCoord(){
		for (var i=spaceShips.length-1; i>=0; i--) {


				if(spaceShips[i][indexSheepFire]){
					fireSpaceSheep.push([i+1,indexSheepFire]);
					return false	
				}
		};
		}
		fireSheepCoord();

		context.beginPath();
		context.fillStyle = 'rgba(0,155,0,0.4)';
		context.fillRect(cellWidth*fireSpaceSheep[fireSpaceSheep.length-1][1]+parseInt(cellWidth/2)-10,cellHeight*fireSpaceSheep[fireSpaceSheep.length-1][0]+1+parseInt(cellHeight/2)-10,10,10);
		context.closePath();
		context.fill();
		spaceShipsAtack(sleepTime);
		},sleepTime);
	}
	function fireFly(sleepTime){
		setTimeout(function(){
			if(fireSpaceSheep.length>0){

				for(i in fireSpaceSheep){
		 			context.clearRect(cellWidth*fireSpaceSheep[i][1]+parseInt(cellWidth/2)-10,cellHeight*fireSpaceSheep[i][0]+parseInt(cellHeight/2)-15,15,25);
					fireSpaceSheep[i]=[fireSpaceSheep[i][0]+1,fireSpaceSheep[i][1]];
					context.beginPath();
					context.fillStyle = 'rgba(0,155,0,0.4)';
					context.fillRect(cellWidth*fireSpaceSheep[i][1]+parseInt(cellWidth/2)-10,cellHeight*fireSpaceSheep[i][0]+parseInt(cellHeight/2)-10,10,10);
					context.closePath();
					context.fill();



				}
				//console.log('dsfdsf',fireSpaceSheep);
			}
			fireFly(sleepTime);
		},sleepTime);
	
	}
	fireFly(6000);

	function pleerShow(){

		context.beginPath();
		context.fillStyle = 'rgba(0,0,155,0.4)';
		context.fillRect(cellWidth*userSheep[1],cellHeight*userSheep[0]+2,cellWidth-2,cellHeight-2);
		context.closePath();
		context.fill();

	}
	function pleerClear(){
		 context.clearRect(cellWidth*userSheep[1],cellHeight*userSheep[0]+2,cellWidth-2,cellHeight-2);
	}
	function pleerGo(where){
		pleerClear();
		switch(where){
		
			case 'left':{
				if(userSheep[1]<1){
					break;
				}
				userSheep[1]= (userSheep[1])-1;
				break;


			}
			case 'right':{
				if(userSheep[1]>numbersOfCell-2){
					break;
				}

				userSheep[1]= (userSheep[1]-0)+1;
				break;
			}
		}
		pleerShow();
	}
	function pleerFire(){
		userSheepFire.push([userSheep[0]-1,userSheep[1]]);

		context.beginPath();
		context.fillStyle = 'rgba(155,155,0,0.4)';
		context.fillRect(cellWidth*userSheepFire[userSheepFire.length-1][1]+parseInt(cellWidth/2)-10,cellHeight*userSheepFire[userSheepFire.length-1][0]+parseInt(cellHeight/2)-10,10,10);
		context.closePath();
		context.fill();
	}
	function pleerfireFly(sleepTime){
		setTimeout(function(){
			if(userSheepFire.length>0){

				for(i in userSheepFire){
				//	console.log(userSheepFire[i][0],userSheepFire[i][1]);
		 			context.clearRect(cellWidth*userSheepFire[i][1]+parseInt(cellWidth/2)-10,cellHeight*userSheepFire[i][0]+parseInt(cellHeight/2)-15,15,25);
					userSheepFire[i]=[userSheepFire[i][0]-1,userSheepFire[i][1]];
					context.beginPath();
					context.fillStyle = 'rgba(155,155,0,0.4)';
					context.fillRect(cellWidth*userSheepFire[i][1]+parseInt(cellWidth/2)-10,cellHeight*userSheepFire[i][0]+parseInt(cellHeight/2)-10,10,10);
					context.closePath();
					context.fill();



				}
				//console.log('dsfdsf',fireSpaceSheep);
			}
			pleerfireFly(sleepTime);
		},sleepTime);
	
	}
	pleerfireFly(6000);
	pleerShow();
flyingSheepDie(6000);
	$('body').on({
		keydown: function(e){
			console.log(e.keyCode);//39 37
			switch(e.keyCode){
				case 37: pleerGo('left');
					break;
				case 39: pleerGo('right');
					break;
				case 32: 
					pleerFire();
					console.log(userSheepFire);
					break;
			}
		}
	});
	console.log(spaceShips);
	function flyingSheepDie(sleepTime){
		setInterval(function(){
			// spaceShips.splice(0, 5);
			for(i in userSheepFire){
			console.log('*** ',userSheepFire[i][0],userSheepFire[i][1]);

				if(userSheepFire[i][0]<3){
					var index;
					if(userSheepFire[i][0]==2){
						index=1;
					}
					else{
						index=0;
					}
					if(spaceShips[index][userSheepFire[i][1]]){
						spaceShips[index][userSheepFire[i][1]]=0;
						context.clearRect(cellWidth*userSheepFire[i][1]+1,cellHeight*userSheepFire[i][0]+1,cellHeight-2,cellWidth-2);
						spaceShips[index].splice(userSheepFire[i][0],1);
						userSheepFire.splice(i,1);
						console.log(spaceShips);


					}
				}
			}
		},sleepTime);

	}
	//spaceShipsGo('right');



})