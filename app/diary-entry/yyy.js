
function init() {
	let baseUrl = 'http://www.healtheoz.co.in'
	let dataUrl = '/sharedData/'
	var tableDataArray = [];

	let urlAddr = window.location.href.toString();
	// "http://app.healtheoz.com/client2/bz2IsqL4j1sEfmMqkI5ZLGNZO55Qz978ZOGMa6VI";
	
	let key = urlAddr.lastIndexOf('/');


	var keyVal = urlAddr.slice(key + 1, urlAddr.length);
	if (!keyVal || keyVal.length !== 40) {
		alert('invalid key');
		throw new Error('invalid key');
	}
	let fetchDataUrl = baseUrl + dataUrl + keyVal;
	let userData, userName, userStartDate, userEndDate;
	let diayTemplateUrl = './post.html';

	if (!key) {
		alert('couldnt obtain key from url');
		return;
	}

	function fetchTemplate(url, cb) {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqTemplateListener);
		oReq.addEventListener("error", transferTemplateFailed);
		oReq.open("GET", url);
		oReq.setRequestHeader("Content-Type", 'text');
		oReq.send();

		function reqTemplateListener(event) {
			let response = oReq.response;
			return cb(null, response);
		}

		function transferTemplateFailed(err) {
			cb(err);
		}

	}


	function createAndAppendDiary(diaryDivTemplate, data, id) {
		parser = new DOMParser();
		// console.log(diaryDivTemplate);
		let doc = parser.parseFromString(diaryDivTemplate, "text/html").body.firstChild;
		doc.getElementsByTagName('h3')[0].textContent = data.title;
		if (data.message) {
			doc.getElementsByTagName('p')[1].textContent = data.message;
		} else {
			doc.getElementsByTagName('p')[1].style.display = 'none';
		}
		if (data.mediaURL) {
			let type = checkMediaType(data.mediaURL);
			// console.log(type);
			if (type === 2) {
				var x = document.createElement("AUDIO");
				// x.length="100%";
				x.width="200px";
				if (x.canPlayType("audio/x-wav")) {
					x.setAttribute("src", data.mediaURL);
				} else {
					x.setAttribute("src", data.mediaURL);
				}
				x.setAttribute("controls", "controls");
				doc.getElementsByTagName('div')[2].appendChild(x);
			} else {
				var image = document.createElement("img");
				// var imageParent = document.getElementById("image");
				image.id = "id";
				image.className = "class";
				image.src = data.mediaURL;            // image.src = "IMAGE URL/PATH"
				image.style.height = '400px';
				image.style.width = '400px';
				image.style['margin-right'] = '1em';
				doc.getElementsByTagName('div')[2].appendChild(image);
				// console.log(image);
				// console.log(doc);
				
			}
		}
		if (data.dated) {
			let time = new Date(data.dated);
			time = time.toDateString();
			let text = document.createTextNode(time || '');
			doc.getElementsByTagName('p')[0].appendChild(text);

		} else {
			if (!data.mediaUrl)
				doc.getElementsByTagName('div')[1].style.display = 'none';
		}
		document.getElementById('allDiaryDiv').appendChild(doc);
	}

	function showImageModal(imageUrl) {
		// console.log(imageUrl);
		let modal = document.getElementById("myModal");
		let modalImg = document.getElementById("img01");
		modal.style.display = "block";
		modalImg.src = imageUrl;
		let span = document.getElementsByClassName("close")[0];
		span.addEventListener("click", hideModal);
		function hideModal() {
			modal.style.display = "none";
			span.removeEventListener('click', hideModal);
		}
	}
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.addEventListener("error", transferFailed);
	// console.log(fetchDataUrl);
	oReq.open("GET", fetchDataUrl);
	oReq.send();

	function reqListener(event) {
		let response = JSON.parse(oReq.response);
		userData = response.sharedData;
		userName = response.patientName;
		userStartDate = response.from;
		userEndDate = response.to;

		console.log(response);
		var textNode, startDate, endDate;
		if(userData&&userName){
		textNode = document.createTextNode(userName);
		document.getElementById('patientName').appendChild(textNode);
		}
		if(response.patientPicture){
			
			console.log("image");
			var image = document.createElement("img");
			image.src = response.patientPicture;            
			document.getElementById('imageDiv').appendChild(image);
		}else{
			console.log("no image");
			var image = document.createElement("img");
			image.src = "./happyMom.jpg";
			document.getElementById('imageDiv').appendChild(image);
		}
		if (userData && userData.diary.length > 0) {
			let idNum = 1;
			fetchTemplate(diayTemplateUrl, function (err, template) {
				if (err) {
					return console.log(err);
				}
				for (i = 0; i < userData.diary.length; i++)
					createAndAppendDiary(template, userData.diary[i], i);
			});
		}

	}
	function transferFailed(err, div) {
		document.getElementById('content').innerHTML += '<h2>Something went wrong</h2>';
		document.getElementById('content').innerHTML += err.message;
	}
	function checkMediaType(file) {
		var fileIsImage = isImage(file);
		if (fileIsImage) {
			return 1;
		}
		var fileIsAudio = isAudio(file);
		if (fileIsAudio) {
			return 2;
		}
	}
	function getExtension(filename) {
		var parts = filename.split('.');
		return parts[parts.length - 1];
	}

	function isImage(filename) {
		var ext = getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'bmp':
			case 'png':
				//etc
				return true;
		}
		return false;
	}

	function isAudio(filename) {
		var ext = getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'x-wav':
			case 'wav':
				// etc
				return true;
		}
		return false;
	}
}

window.onload = function () {
	init();
}
   