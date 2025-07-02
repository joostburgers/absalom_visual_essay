// JavaScript source code
//These are the global chart styles for all future Plotly Charts. This should be either in a global folder or in some location that is easy to draw from. 

const faulknerChartStyles = {
    
   
        colorway: [
            "#1E3A66", // Deep Blue
            "#E5721A", // Warm Orange
            "#C81B1B", // Vibrant Deep Red
            "#64A664", // Saturated Green
            "#2F635D", // Dark Teal
            "#5DA8C4", // Muted Cyan
            "#863B69", // Rich Maroon
            "#3A7828", // Deep Forest Green
            "#C4BA0D"  // Softer Gold-Yellow
        ],


    colorway_bw: ["#FFFFFF", "#bfbfbf", "#808080", "#404040", "#000000"],

    captionStyle: "font-family: 'Playfair Display','Helvetica Neue',Helvetica,Arial,sans-serif; font-weight: normal; font-size:110%;",

};


//The following defines the base layout for all plotly charts. Plotly requires that a layout object is created and then instantiated in a plot in order for the template to be applied.

const faulknerBaseLayout = {
        title: {
        text:
            "Digital Yoknapatawpha Chart"
    },

    xaxis: { title: "X-Axis" },
    yaxis: { title: "Y-Axis" },
    showlegend: true,
    paperBackground: "rgba(255,255,255,0)",
    plotBackground: "rgba(255,255,255,0.4)",
    margin: { l: 75, r: 50, b: 100, t: 50, pad: 4 },
    font: {
        family: "Georgia, 'Times New Roman', Times, serif",
        size: 14,
        color: '#363636'
    }

}

const defaultConfig = {
    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'autoscale2d'],
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: 'png',
        filename: faulknerBaseLayout.title.text,
    }
}
var faulknerLayoutTemplate = { data: {}, layout: faulknerBaseLayout, defaultConfig };
