// add your JavaScript/D3 to this file

const w = 500;
const h = 400;
const margin = {top: 50, right: 10, bottom: 50,
    left: 80};
const innerWidth = w - margin.left - margin.right;
const innerHeight = h - margin.top - margin.bottom;

// add svg
const svg = d3.select("#plot")
  .append("svg")
    .attr("width", w)
    .attr("height", h);

// getting the data    

const data_test = [{source: "Solar", value: 300, color:"#a1785c"},
                 {source: "Wind", value: 100, color:"#a1785c"},
                 {source: "Hydropower", value: 150, color:"#a1785c"},
                 {source: "Marine", value: 220, color:"#a1785c"},
                 {source: "Bioenergy", value: 70, color:"#a1785c"},
                 {source: "Geothermal", value: 270, color:"#a1785c"}]

const rowConverter = function (d) {
  return {
    source: d.source,
    value: +d.value,
    color: d.color
    }
};  

// Base URL for the repository
const baseURL = `https://raw.githubusercontent.com/JoseMF95/renewable_energy/refs/heads/main/d3_data/`;

// year data files
const years = [2018, 2019, 2020, 2021, 2022];

// Object to store all datasets
const datasets = {};

// Function to load data for each character
years.forEach(year => {
  d3.csv(`${baseURL}world_stats_${year}.csv`, rowConverter)
    .then(function(data) {
      datasets[year] = data; // Store the data using year as key
      console.log(`Data loaded for ${year}:`, data);
    })
    .catch(function(error) {
      console.error(`Error loading data for ${year}:`, error);
    });
});

// datasets will hold the loaded data for all years

// Input                  
                 
d3.selectAll('input[name="year"]')
  .on("click", function(event) {
    var year = event.currentTarget.value;
                 
let bardata = data_test; 

if(year=='2018'){
  bardata = datasets[2018];
} else if(year=='2019'){
  bardata = datasets[2019];
}else if(year==2020){
  bardata = datasets[2020];
}else if(year==2021){
  bardata = datasets[2021];
}else if(character==2022){
  bardata = datasets[2022];
}

const yScale = d3.scaleBand()
    .domain(bardata.map(d => d.source))
    .range([0, innerHeight])
    .paddingInner(.1);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(bardata.map(d => d.value))])
    .range([0, innerWidth])

const xAxis = d3.axisBottom()
    .scale(xScale);

const yAxis = d3.axisLeft()
    .scale(yScale);

// add background rectangle

svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "#ECE5D3");

// add bars as a group

const bars = svg.append("g")
    .attr("id", "plot")
    .attr("transform", `translate (${margin.left}, ${margin.top})`)
  .selectAll("rect")
    .data(bardata);

bars.enter().append("rect")
    .attr("x", d => 0)
    .attr("y", d => yScale(d.source))
    .attr("y", d => yScale(d.source))
    .attr("height", yScale.bandwidth())
    .attr("width", d => xScale(d.value))
    .attr("fill", d => d.color);

// add axes

svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
    .call(xAxis);
    
// create x-axis label
svg.append("g")
    .append("text")
    .attr("id", "xlab")
    .attr("x", innerWidth/1.5)
    .attr("y", innerHeight + 1.7 * margin.bottom)
    .attr("text-anchor", "middle")
    .text("Electricity Generation (in thousands GWh)");

svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .call(yAxis);
    
});

                        


       
