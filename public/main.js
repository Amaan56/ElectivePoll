const form = document.getElementById('vote-form');

//Form Submit Event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const choice = document.querySelector('input[name=subject]:checked').value;
    const data = {
        subject : choice
    }

    fetch('http://localhost:4000/poll', {
        method : 'post' ,
        body : JSON.stringify(data),
        headers : new Headers({
            'Content-type':'application/json'
        })
    })
        .then( res => res.json())
        .then( data => console.log(data))
        .catch( err => console.log(err))

      

});

//Graph using canvasJS
let dataPoints = [
    {label : 'Image Processing' , y : 0},
    {label : 'Software Architecture' , y : 0},
    {label : 'E-Commerce' , y : 0},
    {label : 'Multimedia Systems' , y : 0},
    {label : 'Usability Engg' , y : 0},
    {label : 'Ubiquitous Computing' , y : 0}
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled : true ,
        theme : 'theme2' ,
        title : {
            text : 'Elective Subject Poll'
        },
        data : [
            {
                type : 'column',
                dataPoints : dataPoints
            }
        ]
    });
    chart.render();

     // Enable pusher logging - don't include this in production
     Pusher.logToConsole = true;

     var pusher = new Pusher('7f7fa7d8e65cee73e3d0', {
       cluster: 'ap2',
       encrypted: true
     });
 
     var channel = pusher.subscribe('elective-poll');
     channel.bind('elective-vote', function(data) {
       
        dataPoints = dataPoints.map( x => {
            if(x.label==data.subject){
                x.y += data.points;
                return x; 
            }else{
                return x;
            }
        });
        chart.render();
     });
}


