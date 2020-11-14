

class FlowChart {
    constructor(data, activeYear, isImmigration, updateActCountry) {
        this.activeYear = activeYear;
        this.isImmigration = isImmigration;
        this.activeCountry = null;
        this.updateActCountry = updateActCountry;


        this.chart = d3.select("#flow-chart").append("svg");

    }

    drawChart(){
        let matrix = [
            [11975,  5871, 0, 0],
            [ 1951, 10048, 2060, 6171],
            [ 8010, 16145, 8090, 8045],
            [ 1013,   990,  940, 6907]
        ];

        // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
        let res = d3.chord()
            .padAngle(0.05)     // padding between entities (black arc)
            .sortSubgroups(d3.descending)
            (matrix)

        // add the groups on the inner part of the circle
        this.chart
            .datum(res)
            .append("g")
            .selectAll("g")
            .data(function(d) { return d.groups; })
            .enter()
            .append("g").attr("transform", "translate(350, 350)")
            .append("path")
            .style("fill", "grey")
            .style("stroke", "black")
            .attr("d", d3.arc()
                .innerRadius(300)
                .outerRadius(310)
            )

        // Add the links between groups
        this.chart
            .datum(res)
            .append("g").attr("transform", "translate(350, 350)")
            .selectAll("path")
            .data(function(d) { return d; })
            .enter()
            .append("path")
            .attr("d", d3.ribbon()
                .radius(300)
            )
            .style("fill", "#69b3a2")
            .style("stroke", "black");

    }



}