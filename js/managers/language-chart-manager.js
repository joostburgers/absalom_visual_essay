import { CONFIG } from '../config/app-config.js';
import { wordsPerSentenceData } from '../data/chart-data.js';
import { processCSVData } from '../utils/chart-utilities.js';
import { CHART_CONFIGS } from '../config/chart-configs.js';
import { faulknerChartStyles } from '../config/faulkner-chart-styles.js';
// After VideoManager class, add:
export class LanguageChartsManager {
    constructor() {
        this.languageScrollyManager = null;
        this.initialized = false;
    }

    initializeWordsChart() {
        const element = document.getElementById('wordchart');
        if (!element) return;
        Plotly.newPlot('wordchart', wordsPerSentenceData, CHART_CONFIGS.LANGUAGE.WORDS_LAYOUT, CHART_CONFIGS.PLOTLY);
    }

    processParenthesisData(response) {
        const fieldMappings = {
            'depth': (d) => parseInt(d['depth']) || null,
            'start': (d) => parseInt(d['start']) || null,
            'level_1': (d) => parseInt(d['level_1']) || null,
            'level_2': (d) => parseInt(d['level_2']) || null,
            'level_3': (d) => parseInt(d['level_3']) || null,
            'level_4': (d) => parseInt(d['level_4']) || null
        };
        return processCSVData(response, fieldMappings);
    }

    makeParenthesisPlot() {
        $.ajax({
            type: "GET",
            url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/parenthetical_staggered_wide.csv",
            dataType: "text",
            success: (response) => {
                const allData = this.processParenthesisData(response);
                this.makeParenthesisPlotly(allData);
            }
        });
    }

    makeParenthesisPlotly(data) {


        const { depth, level_1, level_2, level_3, level_4 } = data;

        const chapter = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const chapter_marker = [1, 46000, 99402, 156765, 245268, 328114, 412488, 558423, 686037];

        const x_long_break = [334038, 355880, 394110, 394224];
        const y_long_break = [1, 2, 3, 4];
        const break_text = [
            '(then Shreve again, "Wait. Wait. You mean...")',
            '("How was it?" Shreve said. "You told...',
            "(Because there was love Mr Compson said...",
            "(Quentin)"
        ];

        const plotData = [
            {
                x: level_1, y: depth, name: "Level 1: ()", type: 'scatter', mode: 'lines+markers',
                hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
                marker: { size: 4, color: faulknerChartStyles.colorway[0] },
                line: { width: 1, dash: 'dot', color: faulknerChartStyles.colorway[0] }
            },
            {
                x: level_2, y: depth, name: "Level 2: (())", type: 'scatter', mode: 'lines+markers',
                hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
                marker: { size: 4, color: faulknerChartStyles.colorway[1] },
                line: { width: 1, dash: 'dot', color: faulknerChartStyles.colorway[1] }
            },
            {
                x: level_3, y: depth, name: "Level 3: ((()))", type: 'scatter', mode: 'lines+markers',
                hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
                marker: { size: 4, color: faulknerChartStyles.colorway[2] },
                line: { width: 1, dash: 'dot', color: faulknerChartStyles.colorway[2] }
            },
            {
                x: level_4, y: depth, name: "Level 4: (((())))", type: 'scatter', mode: 'lines+markers',
                hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
                marker: { size: 4, color: faulknerChartStyles.colorway[3] },
                line: { width: 1, dash: 'dot', color: faulknerChartStyles.colorway[3] }
            }
        ];

        const layout = {
            ...CHART_CONFIGS.LANGUAGE.PARENTHESIS_LAYOUT,
            xaxis: {
                ...CHART_CONFIGS.LANGUAGE.PARENTHESIS_LAYOUT.xaxis,
                tickvals: chapter_marker,
                ticktext: chapter
            },
            annotations: [
                { x: x_long_break[0], y: y_long_break[0], text: break_text[0], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left" },
                { x: x_long_break[1], y: y_long_break[1], text: break_text[1], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left" },
                { x: x_long_break[2], y: y_long_break[2], text: break_text[2], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left" },
                { x: x_long_break[3], y: y_long_break[3], text: break_text[3], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left" }
            ]
        };

        Plotly.newPlot('parenthesisChart', plotData, layout, CHART_CONFIGS.PLOTLY);
    }
    setupLanguageScrolly() {
        const languageScrollyElement = document.getElementById('language-scrolly');
        if (!languageScrollyElement) return;

        const scrolly = d3.select("#language-scrolly");
        const step = scrolly.select("article").selectAll(".step");
        const scroller = scrollama();

        const calculateOpacity = (progress) => {
            console.log('🔧 Progress:', progress, 'Fade in:', CONFIG.LANGUAGE.OPACITY.FADE_IN_THRESHOLD, 'Fade out:', CONFIG.LANGUAGE.OPACITY.FADE_OUT_THRESHOLD);
            
            if (progress <= CONFIG.LANGUAGE.OPACITY.FADE_IN_THRESHOLD) {
                // Fade in: 0 to 1 as progress goes from 0 to FADE_IN_THRESHOLD
                const opacity = progress / CONFIG.LANGUAGE.OPACITY.FADE_IN_THRESHOLD;
                console.log('🔧 Fade IN - Progress:', progress, 'Opacity:', opacity);
                return opacity;
            } else if (progress >= CONFIG.LANGUAGE.OPACITY.FADE_OUT_THRESHOLD) {
                // ✅ FIXED: Use correct denominator for fade out
                const opacity = (1 - progress) / (1 - CONFIG.LANGUAGE.OPACITY.FADE_OUT_THRESHOLD);
                console.log('🔧 Fade OUT - Progress:', progress, 'Opacity:', opacity);
                return Math.max(0, opacity); // Ensure opacity doesn't go negative
            }
            // Full opacity in the middle
            console.log('🔧 Full opacity - Progress:', progress);
            return 1;
        };

        const handleStepProgress = (response) => {
            const opacity = calculateOpacity(response.progress);
            step.each(function(d, i) {
                if (i === response.index) {
                    d3.select(this)
                        .style("opacity", opacity)
                        .classed("is-active", opacity > CONFIG.LANGUAGE.OPACITY.ACTIVE_THRESHOLD);
                } else {
                    d3.select(this)
                        .style("opacity", 0)
                        .classed("is-active", false);
                }
            });
        };

        scroller.setup({
            step: "#language-scrolly article .step",
            offset: CONFIG.SCROLLAMA.OFFSET,
            progress: true,
            debug: CONFIG.SCROLLAMA.DEBUG
        }).onStepProgress(handleStepProgress);

        this.languageScrollyManager = scroller;
    }

    init() {
        if (this.initialized) return;
        this.initializeWordsChart();
        this.makeParenthesisPlot();
        setTimeout(() => this.setupLanguageScrolly(), CONFIG.RESIZE_DELAY);
        this.initialized = true;
    }

    resize() {
        setTimeout(() => {
            const wordChart = document.getElementById('wordchart');
            const parenthesisChart = document.getElementById('parenthesisChart');
            if (wordChart) Plotly.Plots.resize('wordchart');
            if (parenthesisChart) Plotly.Plots.resize('parenthesisChart');
        }, CONFIG.RESIZE_DELAY);
    }
}
