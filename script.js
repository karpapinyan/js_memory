$(function(){

	var n = -3;
  	var a;
  	var audioopen = new Audio('audio/open.mp3');
  	var audioclose = new Audio('audio/close.mp3');
  	var audiowin = new Audio('audio/win.mp3');
    
    
	$('#newGame').on('click',function(){
	clearTimeout(a);
	$('.blocks').html(' ');
	$('#timer').html(' ');
	$("#game").attr('style','width:500px');

	$('#timer').html('Score: ' + 0);
	n = -3;
  	new start();
	function start() {
		n++;
		if (n >= -3){
			a = setTimeout(start, 1000);
		}
		if (n>=0){
			$('#timer').html('Score: ' + n);
		}
	}
        var row = 4;
        var col = 4;
	var imgCount = row*col/2;
	var img = [];
	
	for(i = 1; i <= imgCount; i++){
		
		img.push('img'+i);
		//img[i-1]='img'+i;
	}
	//console.log(img);
	function shuffle(array) {
        let counter = array.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

	var shuffleArray = img.concat(img);
	shuffleArray = shuffle(shuffleArray);
        setTimeout(function(){
             $('.block').find('div').fadeOut(1000);
        },3000);
       
        for(key in shuffleArray){
            var div = $('<div>');
            div.addClass('block');
            var image = $('<div>');
            image.css({
                "background":'url(img/'+shuffleArray[key]+'.png)',
                "background-size":'cover',
            });
            image.addClass(shuffleArray[key]);
            div.append(image);
            $('.blocks').append(div);
            // $('.block').find('div').fadeOut(4000);
           
        }

	/*for(j=0;j<shuffleArray.length;j++){
		
		var div = $('<div>');
		div.addClass('block');
		var image = $('<div>');
		image.addClass(shuffleArray[j]);
		div.append(image);
		$('.blocks').append(div);
		$('.block').find('div').fadeOut(2500);
	}*/
	
	var arr = [];
	var step = 1;
	var count = 0;
	$('.block').on('click',function(){
        if($(this).find('div').hasClass('clicked')){
           return false;
           }
        
        if($(this).find('div').hasClass('same')){
           return false;
           }
		$(this).find('div').fadeIn(500);
		if (!$(this).find('div').hasClass('clicked')){
			
			arr.push($(this).find('div').attr('class'));
			$(this).find('div').addClass('clicked');
		} else {
			return
		}
		
		if(step % 2 == 0){
			if (arr[0] != arr[1]){
				
        audioclose.play();
               $(".clicked").fadeOut(500); $(".block").find("div").removeClass('clicked');
    
						
			} else{
				audioopen.play();
				count++;
                 $(".clicked").addClass("same");
                $(".block").find("div").removeClass('clicked');
               
				if (imgCount == $(".same").length/2){
					audioopen.pause();
					audiowin.play();
					clearTimeout(a);
					function func() {
					alert("You Win!!!");
						$("#game").attr('style','width:600px');
          					$("#timer").html("Your score is " + n);
        			}
        			setTimeout(func,300);
				}
			}
			arr = [];
		}
		step++;
	});
	
	});
});