var breakLength = 5 , sessionLength = 25 , seconds = 60 , intervalWorking = false , interval , breakTime
, sessionLengthStart = 25 , breakLengthStart = 5 , sessionLinearGradientPercentage = 100 / (25 * 60)
, breakWorking = false , isItBreak = false , breakLinearGradientPercentage;
$(document).ready(function(){
	//handle break length buttons
	$("#plus1").click(function(){
		if(!intervalWorking && !breakWorking){
			breakLengthStart++;
			$("#breakLength").text(breakLengthStart  + "");
			if(isItBreak){
				$("#sessionPeriod").text(breakLengthStart  + "");
				$(".session").css("background","transparent");
				seconds = 60;
			}
			breakLength = breakLengthStart;
			breakLinearGradientPercentage = 100 / (breakLengthStart * 60);
		}
	});
	$("#minus1").click(function(){
		if(!intervalWorking && !breakWorking){
			breakLengthStart--;
			if(breakLengthStart < 1)
				breakLengthStart = 1;
			$("#breakLength").text(breakLengthStart  + "");
			if(isItBreak){
				$("#sessionPeriod").text(breakLengthStart  + "");
				$(".session").css("background","transparent");
				seconds = 60;
			}
			breakLength = breakLengthStart;
			breakLinearGradientPercentage = 100 / (breakLengthStart * 60);
		}
	});
	//handle session length buttons
	$("#plus2").click(function(){
		if(!intervalWorking && !breakWorking){
			sessionLengthStart++;
			$("#sessionLength").text(sessionLengthStart  + "");
			if(!isItBreak){
				$("#sessionPeriod").text(sessionLengthStart  + "");
				$(".session").css("background","transparent");
				seconds = 60;
			}
			sessionLength = sessionLengthStart;
			sessionLinearGradientPercentage = 100 / (sessionLengthStart * 60);
			
		}
	});
	$("#minus2").click(function(){
		if(!intervalWorking && !breakWorking){
			sessionLengthStart--;
			if(sessionLengthStart < 1)
				sessionLengthStart = 1;
			$("#sessionLength").text(sessionLengthStart  + "");
			if(!isItBreak){
				$("#sessionPeriod").text(sessionLengthStart  + "");
				$(".session").css("background","transparent");
				seconds = 60;
			}
			sessionLength = sessionLengthStart;			
			sessionLinearGradientPercentage = 100 / (sessionLengthStart * 60);			
			
		}
	});
	//handle session
	$(".session").click(function(){
		if(isItBreak){
			if(!breakWorking){
				breakWorking = true;
				breakTime = setInterval(handleBreak,1000);
			}
			else{
				breakWorking = false;
				clearInterval(breakTime);
			}
				
		}
		else if(!intervalWorking){
			intervalWorking = true;
			interval = setInterval(handleSession,1000);
		}
		else {
			intervalWorking = false;
			clearInterval(interval);
		}	
	});
	//handle break
	function handleBreak(){
				if(seconds == 60){
					breakLength--;
				}
				if(seconds == 0){
					seconds = 60;
					if(breakLength == 0){
						clearInterval(breakTime);
						intervalWorking = true;
						//start session
						$(".session p").text("Session");
						$("#sessionPeriod").text(sessionLengthStart);
						$(".session").css("background","transparent");
						breakWorking = false;
						isItBreak = false;
						sessionLength = sessionLengthStart;
						sessionLinearGradientPercentage = 100 / (sessionLengthStart * 60);
						interval = setInterval(handleSession,1000);
						return;
					}
					breakLength--;
				}
				--seconds;
				//fill the circle
				$(".session").css("background","linear-gradient(to top,#FF4444 " + 
								 breakLinearGradientPercentage + "% , transparent " + breakLinearGradientPercentage
								   + "%)");
				breakLinearGradientPercentage += 100 / (breakLengthStart * 60);
				if(seconds < 10)
					$("#sessionPeriod").text(breakLength + ":0" + seconds);
				else
					$("#sessionPeriod").text(breakLength + ":" + seconds);
	}
	function handleSession(){
		if(seconds == 60){
			sessionLength--;
		}
		if(seconds == 0){
			seconds = 60;
			if(sessionLength == 0){
				clearInterval(interval);
				intervalWorking = false;
				//start break
				$(".session p").text("Break");
				$("#sessionPeriod").text(breakLengthStart);
				$(".session").css("background","transparent");
				breakWorking = true;
				isItBreak = true;
				breakLength = breakLengthStart;
				breakLinearGradientPercentage = 100 / (breakLengthStart * 60);
				breakTime = setInterval(handleBreak,1000);
				return;
			}
			sessionLength--;
		}
		--seconds;
		//fill the circle
		$(".session").css("background","linear-gradient(to top,#99CC00 " + 
						 sessionLinearGradientPercentage + "% , transparent " + sessionLinearGradientPercentage
						   + "%)");
		sessionLinearGradientPercentage += 100 / (sessionLengthStart * 60);
		if(seconds < 10)
			$("#sessionPeriod").text(sessionLength + ":0" + seconds);
		else
			$("#sessionPeriod").text(sessionLength + ":" + seconds);
	}
});