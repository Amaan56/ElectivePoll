const form = document.getElementById('vote-form');

//Form Submit Event
form.addEventListener('submit', (e) => {
 
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

        e.preventDefault();

});

//get request
fetch('http://localhost:4000/poll')
 .then(res => res.json())
 .then (data => {
     const votes = data.votes;
     const totalVotes = votes.length;

     //Count votes count
     const voteCounts = votes.reduce(
         (acc,vote) => (
            (acc[vote.subject] = (acc[vote.subject] || 0) + vote.points),acc
        ),
        {}
    );

    //Graph using canvasJS
let dataPoints = [
    {label : 'ImageProcessing' , y : voteCounts.ImageProcessing},
    {label : 'SoftwareArchitecture' , y : voteCounts.SoftwareArchitecture},
    {label : 'ECommerce' , y : voteCounts.ECommerce},
    {label : 'MultimediaSystems' , y : voteCounts.MultimediaSystems},
    {label : 'UsabilityEngg' , y : voteCounts.UsabilityEngg},
    {label : 'UbiquitousComputing' , y : voteCounts.UbiquitousComputing}
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
};
 });

