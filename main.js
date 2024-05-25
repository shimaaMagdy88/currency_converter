let myInput = document.querySelector(".input");
let exchangeBtn = document.querySelector(".ex-btn");
let fromSelection = document.querySelector(".from select");
let toSelection = document.querySelector(".to select");
let text = document.querySelector(".text");

fetch("https://v6.exchangerate-api.com/v6/15cdbe09f7b9b92e970a45aa/latest/USD")
	.then((res)=> res.json())
	.then((data)=>{
		let option = "";
		for(x in data.conversion_rates){
			option +=`
			<option>${x}</option>
			`;
		};
		fromSelection.innerHTML = option;
		toSelection.innerHTML = option;

		// EXCHANGE BUTTON EVENT
		exchangeBtn.addEventListener("click",()=>{
			fetch(`https://v6.exchangerate-api.com/v6/15cdbe09f7b9b92e970a45aa/latest/${fromSelection.value}`)
				.then((res)=> res.json())
				.then((response)=>{

					if(!isNaN(myInput.value) && myInput.value != ""){
						myInput.style.borderColor = "black";
						myInput.style.color = "black";
						for(x in response.conversion_rates){
							if(toSelection.value == x){
								let exchangedValue = myInput.value * response.conversion_rates[x];
								text.innerHTML = `${myInput.value} ${fromSelection.value} = ${exchangedValue} ${toSelection.value}`;
							};
						};
					}else{
						text.innerHTML = "Enter number !";
						myInput.style.borderColor = "red";
						myInput.style.color = "red";
					};
				});
		});
	});