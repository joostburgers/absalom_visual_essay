// All data constants. This data is relatively small and immutable. There is no need to load it through ajax.

import { faulknerChartStyles } from '../config/faulkner-chart-styles.js';
console.log('faulknerChartStyles loaded:', faulknerChartStyles);

export const demographyChartData = [
    { "Race": "Black", "total": 36, "percent": 0.23 },
    { "Race": "Indian", "total": 3, "percent": 0.02 },
    { "Race": "Mixed Ancestry", "total": 9, "percent": 0.06 },
    { "Race": "Multiracial Group", "total": 5, "percent": 0.03 },
    { "Race": "White", "total": 101, "percent": 0.66 }
];

export const demographyPresentData = [
    { "Race": "Black", "total": 27666, "percent": 0.07 },
    { "Race": "Indian", "total": 2075, "percent": 0 },
    { "Race": "Mixed Ancestry", "total": 66452, "percent": 0.16 },
    { "Race": "Multiracial Group", "total": 2083, "percent": 0 },
    { "Race": "White", "total": 320567, "percent": 0.77 }
];

// Filtered data for second chart (removes 0% entries)
export const demographyPresentDataFiltered = demographyPresentData.filter(item =>
    item.Race !== "Indian" && item.Race !== "Multiracial Group"
);


export const wordsPerSentenceData = [
    {
        x: ["<i>Moby Dick</i><br> Herman Melville", "<i>Huckleberry Finn</i><br>Mark Twain", "<i>The Great Gatsby</i><br>F. Scott Fitzgerald", "<i>Absalom, Absalom!</i><br>William Faulkner", "<i>Beloved</i><br> Toni Morrison"],
        y: [22, 19, 14, 50, 12],
        type: 'bar',
        marker: {
            color: [
                faulknerChartStyles.colorway[0] + '80',
                faulknerChartStyles.colorway[0] + '80',
                faulknerChartStyles.colorway[0] + '80',
                faulknerChartStyles.colorway[2] + 'CC',
                faulknerChartStyles.colorway[0] + '80'
            ],
            line: {
                color: [
                    faulknerChartStyles.colorway[0],
                    faulknerChartStyles.colorway[0],
                    faulknerChartStyles.colorway[0],
                    faulknerChartStyles.colorway[2],
                    faulknerChartStyles.colorway[0]
                ],
                width: 1.5
            }
        },
        hovertemplate: "<b>Text:</b> %{x}<br> <b>Average words per sentence: </b> %{y}<extra></extra>"
    }
];

// Pre-structured sunburst data with proper types
export const SUNBURST_DATA = [
    { labels: "Total", values: 418843, parents: "", ids: "", race: "", percent: "" },
    { labels: "White", values: 320567, parents: "Total", ids: "Total - White", race: "Total", percent: "77" },
    { labels: "Mixed Ancestry", values: 66452, parents: "Total", ids: "Total - Mixed Ancestry", race: "Total", percent: "16" },
    { labels: "Black", values: 27666, parents: "Total", ids: "Total - Black", race: "Total", percent: "7" },
    { labels: "Multiracial Group", values: 2083, parents: "Total", ids: "Total - Multiracial Group", race: "Total", percent: "0" },
    { labels: "Indian", values: 2075, parents: "Total", ids: "Total - Indian", race: "Total", percent: "0" },
    { labels: "Thomas Sutpen", values: 48366, parents: "Total - White", ids: "Total - White - Thomas Sutpen", race: "White", percent: "15" },
    { labels: "Rosa Coldfield", values: 34327, parents: "Total - White", ids: "Total - White - Rosa Coldfield", race: "White", percent: "11" },
    { labels: "Henry Sutpen", values: 29893, parents: "Total - White", ids: "Total - White - Henry Sutpen", race: "White", percent: "9" },
    { labels: "Judith Sutpen", values: 27200, parents: "Total - White", ids: "Total - White - Judith Sutpen", race: "White", percent: "8" },
    { labels: "Charles Bon", values: 31996, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Charles Bon", race: "Mixed Ancestry", percent: "48" },
    { labels: "Clytemnestra", values: 16004, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Clytemnestra", race: "Mixed Ancestry", percent: "24" },
    { labels: "Mrs. Thomas Sutpen(1)", values: 7203, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Mrs. Thomas Sutpen(1)", race: "Mixed Ancestry", percent: "11" },
    { labels: "Charles Etienne Saint-Valery Bon", values: 5882, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Charles Etienne Saint-Valery Bon", race: "Mixed Ancestry", percent: "9" },
    { labels: "Unnamed Twenty Original Sutpen Slaves", values: 7271, parents: "Total - Black", ids: "Total - Black - Unnamed Twenty Original Sutpen Slaves", race: "Black", percent: "26" },
    { labels: "Luster", values: 1632, parents: "Total - Black", ids: "Total - Black - Luster", race: "Black", percent: "6" },
    { labels: "Unnamed Slaves of Sutpen", values: 1322, parents: "Total - Black", ids: "Total - Black - Unnamed Slaves of Sutpen", race: "Black", percent: "5" },
    { labels: "Unnamed Enslaved Field Hands", values: 1233, parents: "Total - Black", ids: "Total - Black - Unnamed Enslaved Field Hands", race: "Black", percent: "4" },
    { labels: "Unnamed Passersby", values: 702, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed Passersby", race: "Multiracial Group", percent: "34" },
    { labels: "Unnamed Customers at Sutpen's Store", values: 182, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed Customers at Sutpen's Store", race: "Multiracial Group", percent: "9" },
    { labels: "Unnamed Four or Five Boys", values: 88, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed Four or Five Boys", race: "Multiracial Group", percent: "4" },
    { labels: "Unnamed People in the Reconstruction South", values: 201, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed People in the Reconstruction South", race: "Multiracial Group", percent: "10" },
    { labels: "Doom", values: 151, parents: "Total - Indian", ids: "Total - Indian - Doom", race: "Indian", percent: "7" },
    { labels: "Unnamed Indians in Western Virginia", values: 697, parents: "Total - Indian", ids: "Total - Indian - Unnamed Indians in Western Virginia", race: "Indian", percent: "34" },
    { labels: "Others", values: 165, parents: "Total - Indian", ids: "Total - Indian - Others", race: "Indian", percent: "8" }
];