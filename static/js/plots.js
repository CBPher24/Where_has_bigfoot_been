

function classBarChart(BFData) {
    var BFData = JSON.parse(BFData)
    // console.log(BFData.data.set())
    let classes = ["Class A", "Class B", "Class C"];
    var aCount = 0
    var bCount = 0
    var cCount = 0
    for (var i = 0; i < BFData.length; i++) {
        if (BFData[i].data.class == "Class A") {
            aCount = aCount+1;}
        else if (BFData[i].data.class == "Class B"){
            bCount = bCount +1;}
        else {
            cCount = cCount+1
        }
        }
    let counts = [aCount,bCount,cCount]
    plotMetric(classes, counts);
    }


     function plotMetric(classes,counts){

        let trace1 = {
          x: classes,
          y: counts,
          type: "bar"
        }
      
        let data = [trace1]
      
        // Pass metric to chart title
        let layout = {
          title: `Bigfoot Incidents by Class`
        };
      
        Plotly.newPlot("plot", data, layout);
      }
      
      // Invoke the plot creating function

      function classYearChart(BFData) {
        var BFData = JSON.parse(BFData)

        var twenties = 0
        var thirties = 0
        var fourties = 0
        var fifties = 0
        var sixties = 0
        var seventies = 0
        var eighties = 0
        var nineties = 0
        var twos = 0
        var twotens = 0
        var twotwenties = 0

        for (var i = 0; i < BFData.length; i++ ){
            if (BFData[i].data.Year < 1930){
                var twenties = twenties+1;
            }
            else if (BFData[i].data.Year < 1940){
                var thirties = thirties+1;
            }
            else if(BFData[i].data.Year < 1950){
                var fourties = fourties+1;
            }
            else if(BFData[i].data.Year < 1960){
                var fifties = fifties+1;
            }
            else if(BFData[i].data.Year < 1970){
                var sixties = sixties+1;
            }
            else if(BFData[i].data.Year < 1980){
                var seventies = seventies+1;
            }
            else if(BFData[i].data.Year < 1990){
                var eighties = eighties+1;
            }
            else if(BFData[i].data.Year < 2000){
                var nineties = nineties+1;
            }
            else if(BFData[i].data.Year < 2010){
                var twos = twos+1;
            }
            else if(BFData[i].data.Year < 2020){
                var twotens = twotens+1;
            }
            else {
                var twotwenties = twotwenties +1;
            };

            
        }
        counts = [twenties,thirties,fourties,fifties,sixties,seventies,eighties,nineties,twos,twotens,twotwenties];
        years=["1920's", "1930's", "1940's", "1950's","1960's","1970's","1980's","1990's","2000's","2010's","2020's"];
        var trace1 = {

            x: years,
          
            y: counts,
          
            type: 'scatter'
          
          };
          
          
          
          
          
          var data = [trace1];
          
          
          Plotly.newPlot('lineplot', data);
        console.log(counts);
    }
            
        // var BFData = JSON.parse(BFData)
        // let year = [];
        // for (var i = 0; i < BFData.length; i++ ){
        //     year.push(BFData[i].data.Year);
        // }
        // var setYears= new Set(year);
        // var yearArr = Array.from(setYears).sort();
        // yearArr.shift()
        // // setYears.sort(function compareFunction(firstNum, secondNum){
        // //     return firstNum - secondNum
        // // })
        // console.log(yearArr);
    
      

    
