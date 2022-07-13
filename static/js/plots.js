

function classBarChart(BFData) {
    var BFData = JSON.parse(BFData)
    // console.log(BFData)
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
          title: `Bigfoot Incidents by Csass`
        };
      
        Plotly.newPlot("plot", data, layout);
      }
      
      // Invoke the plot creating function
      

    
