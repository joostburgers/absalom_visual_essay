// Global state to track which sections have been initialized
const sectionInitialized = {
    characters: false,
    events: false,
    language: false
};

export class TOCManager {
    constructor() {
        this.chartElements = null;
        this.colorMappings = null;
        this.eventsChartManager = null;
        this.languageChartsManager = null;
        this.cachedLegendSpans = null;
    }

    init(dependencies) {
        const {
            chartElements,
            colorMappings,
            eventsChartManager,
            languageChartsManager,
            initializeCharts,
            createLegend,
            createSunburstPlot
        } = dependencies;

        this.chartElements = chartElements;
        this.colorMappings = colorMappings;
        this.eventsChartManager = eventsChartManager;
        this.languageChartsManager = languageChartsManager;
        this.initializeCharts = initializeCharts;
        this.createLegend = createLegend;
        this.createSunburstPlot = createSunburstPlot;

        this.loadTOC();
    }

    loadTOC() {
        const headings = document.querySelectorAll(".essay-section h1, .essay-section h2:not(.text-center):not(.glance-subtitle)");
        const tocHtml = [];

        headings.forEach((current, i) => {
            const tagName = current.tagName.toLowerCase();
            const title = current.textContent;
            const anchorName = `tocheading${i}`;
            current.id = anchorName;
            const sectionId = current.closest('.essay-section').id;

            if (tagName === "h1" || tagName === "h2") {
                tocHtml.push(
                    `<li class='toc-${tagName}'>
            <a href='#${anchorName}' data-section='${sectionId}'>${title}</a>
          </li>`
                );
            }
        });

        document.getElementById("TableOfContents").innerHTML = `<ul class="toc-list">${tocHtml.join("")}</ul>`;
        document.querySelectorAll("#TableOfContents .toc-h2").forEach(el => el.style.display = "none");
        document.querySelectorAll(".essay-section").forEach(el => el.classList.remove("active"));
        document.getElementById("about").classList.add("active");

        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll("#TableOfContents a").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const anchor = link.getAttribute("href");
                const sectionId = link.dataset.section;
                const isH1 = link.parentElement.classList.contains("toc-h1");

                if (isH1) {
                    this.activateSection(sectionId);
                } else {
                    this.scrollToAnchor(anchor);
                }
            });
        });
    }

    activateSection(sectionId) {
        document.querySelectorAll(".essay-section").forEach(el => el.classList.remove("active"));
        document.getElementById(sectionId).classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.updateTOCVisibility();
        this.initializeSectionCharts(sectionId);
    }

    scrollToAnchor(anchor) {
        const target = document.querySelector(anchor);
        if (target) {
            const parentSection = target.closest('.essay-section');
            if (!parentSection.classList.contains("active")) {
                document.querySelectorAll(".essay-section").forEach(el => el.classList.remove("active"));
                parentSection.classList.add("active");
            }
            target.scrollIntoView({ behavior: "smooth" });
            this.updateTOCVisibility();
            this.initializeSectionCharts(parentSection.id);
        }
    }

    initializeSectionCharts(sectionId) {
        if (sectionInitialized[sectionId]) {
            return;
        }

        switch (sectionId) {
            case 'characters':
                this.initializeCharacterCharts();
                sectionInitialized.characters = true;
                break;
            case 'events':
                this.initializeEventCharts();
                sectionInitialized.events = true;
                break;
            case 'language':
                this.initializeLanguageCharts();
                sectionInitialized.language = true;
                break;
        }
    }

    initializeCharacterCharts() {
        console.log('🎨 Initializing character charts...');

        setTimeout(() => {
            const charactersSection = document.getElementById('characters');
            if (charactersSection && charactersSection.classList.contains('active')) {
                if (this.chartElements && this.colorMappings && this.initializeCharts) {
                    this.initializeCharts(this.chartElements, this.colorMappings);

                    if (this.createLegend) {
                        this.cachedLegendSpans = this.createLegend(this.chartElements);
                    }
                    if (this.createSunburstPlot) {
                        this.createSunburstPlot();
                    }
                }
            }
        }, 100);
    }

    initializeEventCharts() {
        console.log('📊 Initializing event charts...');

        setTimeout(() => {
            const eventsSection = document.getElementById('events');
            if (eventsSection && eventsSection.classList.contains('active')) {
                if (this.eventsChartManager && document.getElementById('plotchart')) {
                    this.eventsChartManager.makePlot();
                }
            }
        }, 100);
    }

    initializeLanguageCharts() {
        console.log('📝 Initializing language charts...');

        setTimeout(() => {
            const languageSection = document.getElementById('language');
            if (languageSection && languageSection.classList.contains('active')) {
                if (this.languageChartsManager) {
                    this.languageChartsManager.init();
                }
            }
        }, 100);
    }

    updateTOCVisibility() {
        document.querySelectorAll("#TableOfContents .toc-h2").forEach(el => {
            const sectionId = el.querySelector("a").dataset.section;
            if (document.getElementById(sectionId).classList.contains("active")) {
                el.style.display = "";
            } else {
                el.style.display = "none";
            }
        });
    }
}