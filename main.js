//https://teachablemachine.withgoogle.com/models/0vGdeb3xL/
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0vGdeb3xL/model.json",modelLoaded)
function modelLoaded(){
    console.log("model loaded succefully")
}
Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality: 90 
});
Webcam.attach( '#camera')
function take_snapshot(){
    Webcam.snap( function(pic){
        document.getElementById("result").innerHTML='<img id="cam_pic" src="'+pic+'">'
    })
}
p1=""
p2=""
function speak(){
   speak_data_1 = "the first prediction is " + p1
   speak_data_2 = "and the second prediction is " + p2
   speakaudio = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
   window.speechSynthesis.speak(speakaudio)
}

function check() {
    img = document.getElementById('cam_pic');
    classifier.classify(img , getResult)
}
function getResult(e,r){
    if(e){
        console.error(e)
    }
    else{
        console.log(r);
        p1 = r[0].label;
        p2 = r[1].label;
        document.getElementById('result_handsign_name').innerHTML = p1;
        document.getElementById('result_handsign_name2').innerHTML = p2;
        if(p1=="thumbs up"){
            document.getElementById('update_emoji').innerHTML = "&#128077;"
        }
        else if(p1=="victory"){
            document.getElementById('update_emoji').innerHTML = "&#9996;"
        }
        else if(p1=="ok"){
            document.getElementById('update_emoji').innerHTML = "&#128076;"
        }
        if(p2=="thumbs up"){
            document.getElementById('update_emoji2').innerHTML = "&#128077;"
        }
        else if(p2=="victory"){
            document.getElementById('update_emoji2').innerHTML = "&#9996;"
        }
        else if(p2=="ok"){
            document.getElementById('update_emoji2').innerHTML =  "&#128076;"
        }
    }
}