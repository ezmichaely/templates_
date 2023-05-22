const areaOptions = {
    chart: {
        height: 300,
        type: 'area'
    },
    colors: ['#7F63F4'],
    fill: {
        type: 'gradient',
        gradient: {
            type: "diagonal",
            shade: 'light',
            shadeIntensity: 0.5,
            gradientToColors: ['#7F63F4'],
            inverseColors: true,
            opacityFrom: 0.8,
            opacityTo: 0.2,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false,
    },
    series: [{
        data: [35, 40, 50, 40, 55, 42, 40]
    }],
    toolbar: {
        show: false
    },
    xaxis: {
        categories: [
            "",
            "5월 1일",
            "5월 2일",
            "5월 3일",
            "5월 4일",
            "5월 5일",
            "",
        ],
        labels: {
            style: {
                fontSize: '14px',
                // fontWeight: '700',
                color: '#6A707E'
            },
            offsetY: 5
        },
        tooltip: {
            enabled: false
        },
        dataLabels: {
            enabled: false
        }
    },
    tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return '<div class="bg-dark text-white px-2 py-1 border-0">' + series[seriesIndex][dataPointIndex] + '명</div>';
        }
    }, 
    dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
    }
}

const areaChart = new ApexCharts(document.querySelector("#areaChart"), areaOptions);
areaChart.render();


// for donut Chart
const fetchedData = [
    { 'value': 50, 'label': 'Apples' },
    { 'value': 60, 'label': 'Oranges' },
    { 'value': 55, 'label': 'Bananas' },
    { 'value': 35, 'label': 'Mangoes' },
    { 'value': 45, 'label': 'Strawberry' },
    { 'value': 40, 'label': 'Pineapple' },
    { 'value': 65, 'label': 'Papaya' },
    { 'value': 12, 'label': 'Guava' },
    { 'value': 26, 'label': 'Watermelon' },
    { 'value': 54, 'label': 'Blueberries' },
    { 'value': 18, 'label': 'Dragon fruit' },
    { 'value': 27, 'label': 'Avocado' },
    { 'value': 32, 'label': 'Lychee' },
    { 'value': 43, 'label': 'Durian' },
    { 'value': 9, 'label': 'Olives' },
    { 'value': 22, 'label': 'Lemon' },
];

let usedColors = [];
const rainbowColors = [
    "#FF5274",
    "#FF9800",
    "#F2D400",
    "#71D875",
    "#1D8FF7",
    "#7F63F4",
    "#6f42c1"
];

const color15 = [
    "#FF5274",
    "#FF9800",
    "#F2D400",
    "#71D875",
    "#1D8FF7",
    "#7F63F4",
    "#6f42c1",
    "#EDC8ED",
    "#99EEFF",
    "#EDFFDB",
    "#CCEEDD",
    "#0C4347",
    "#C8C8ED",
    "#660000",
    "#2E2D88"
]

// generate a random color
function generateRandomColor() {
    const randomColor = getRandomLighterColor();
    if (rainbowColors.includes(randomColor) || usedColors.includes(randomColor)) {
        return generateRandomColor();
    }
    usedColors.push(randomColor);
    return randomColor;
}

// get the generated random lighter color
function getRandomLighterColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    // for lighter colors
    for (let i = 0; i < 3; i++) {
        const randomValue = Math.floor(Math.random() * 8) + 8;
        color += letters[randomValue];
        color += letters[randomValue];
    }

    // normal colors
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }

    return color;
}

const sortData = (data) => {
    return  data.sort((a, b) => b.value - a.value);
}

const getSeries = (data) => {
    const sortedData = sortData(data); // sort the data first in ascending order
    const series = sortedData.map(obj => obj.value);
    return series;
}

const getLabels = (data) => {
    const sortedData = sortData(data); // sort the data first in ascending order
    const label = sortedData.map(obj => obj.label);
    return label;
}

const getColors = (data) => {
    const valueCount = data.length;
    let colorsToUse = [];

    // if below 7
    if (valueCount < 7) {
        for(let i = 0; i<=valueCount; i++) {
            colorsToUse.push(rainbowColors[i]);
        }
    }

    // if exact 7
    else if (valueCount === 7) {
        for (let i = 0; i <= valueCount; i++) {
            colorsToUse.push(rainbowColors[i]);
        }
    }

    // if 15 & below
    else if (valueCount <= 15) {
        for (let i = 0; i < valueCount; i++) {
            colorsToUse.push(color15[i]);
        }
    }

    // more than 15
    else if (valueCount > 15) {
        for (let i = 0; i < 15; i++) {
            colorsToUse.push(color15[i]);
        }
        for (let i = 15; i < valueCount; i++) {
            const randomColor = generateRandomColor();
            colorsToUse.push(randomColor);
        }
    }

    return colorsToUse;
}

const donutOptions = {
    chart: {
        height: 306,
        type: 'donut',
    },
    series: getSeries(fetchedData),
    labels: getLabels(fetchedData),
    colors: getColors(fetchedData),
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        pie: {
            donut: {
                spacing: 1,
                size: '60%',
                labels: {
                    show: false,
                    total: {
                        show: false,
                        label: 'Total',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce((a, b) => {
                                return a + b
                            }, 0)
                        }
                    }
                }
            }
        }
    },
    legend: {
        position: 'right'
    },
}

const donutChart = new ApexCharts(document.querySelector("#donutChart"), donutOptions);
donutChart.render();