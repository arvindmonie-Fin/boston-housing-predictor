// Regression model coefficients (from regression_analysis.tex)
const COEFFICIENTS = {
    intercept: 36.891960,
    crim: -0.113139,
    zn: 0.047052,
    indus: 0.040311,
    nox: -17.366999,
    rm: 3.850492,
    age: 0.002784,
    dis: -1.485374,
    rad: 0.328311,
    tax: -0.013756,
    ptratio: -0.990958,
    black: 0.009741,
    lstat: -0.534158
};

// Variable ranges and step increments (from Boston Housing Dataset.csv analysis)
const VARIABLE_CONFIG = {
    crim: {
        min: 0.00632,
        max: 88.9762,
        step: 0.1,
        default: 0.25651,
        decimals: 2
    },
    zn: {
        min: 0.0,
        max: 100.0,
        step: 1.0,
        default: 0.0,
        decimals: 0
    },
    indus: {
        min: 0.46,
        max: 27.74,
        step: 0.1,
        default: 9.69,
        decimals: 2
    },
    nox: {
        min: 0.385,
        max: 0.871,
        step: 0.01,
        default: 0.538,
        decimals: 3
    },
    rm: {
        min: 3.561,
        max: 8.78,
        step: 0.1,
        default: 6.2085,
        decimals: 2
    },
    age: {
        min: 2.9,
        max: 100.0,
        step: 1.0,
        default: 77.5,
        decimals: 1
    },
    dis: {
        min: 1.1296,
        max: 12.1265,
        step: 0.1,
        default: 3.20745,
        decimals: 2
    },
    rad: {
        min: 1.0,
        max: 24.0,
        step: 1.0,
        default: 5.0,
        decimals: 0
    },
    tax: {
        min: 187.0,
        max: 711.0,
        step: 10.0,
        default: 330.0,
        decimals: 0
    },
    ptratio: {
        min: 12.6,
        max: 22.0,
        step: 0.1,
        default: 19.05,
        decimals: 1
    },
    black: {
        min: 0.32,
        max: 396.9,
        step: 1.0,
        default: 391.44,
        decimals: 2
    },
    lstat: {
        min: 1.73,
        max: 37.97,
        step: 0.1,
        default: 11.36,
        decimals: 2
    }
};

// Variable descriptions
const VARIABLE_DESCRIPTIONS = {
    crim: "Per capita crime rate by town",
    zn: "Proportion of residential land zoned for lots over 25,000 sq.ft.",
    indus: "Proportion of non-retail business acres per town",
    nox: "Nitric oxides concentration (parts per 10 million)",
    rm: "Average number of rooms per dwelling",
    age: "Proportion of owner-occupied units built prior to 1940",
    dis: "Weighted distances to five Boston employment centres",
    rad: "Index of accessibility to radial highways",
    tax: "Full-value property-tax rate per $10,000",
    ptratio: "Pupil-teacher ratio by town",
    black: "1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town",
    lstat: "Lower status of the population (percent)"
};

/**
 * Generate dropdown options for a variable
 */
function generateOptions(variableName) {
    const config = VARIABLE_CONFIG[variableName];
    const options = [];
    const numDecimals = config.decimals;
    
    // Generate options from min to max with step increment
    for (let value = config.min; value <= config.max; value += config.step) {
        const roundedValue = parseFloat(value.toFixed(numDecimals));
        options.push({
            value: roundedValue,
            text: roundedValue.toString()
        });
    }
    
    return options;
}

/**
 * Populate all dropdowns with options
 */
function populateDropdowns() {
    Object.keys(VARIABLE_CONFIG).forEach(variableName => {
        const select = document.getElementById(variableName);
        if (!select) return;
        
        const options = generateOptions(variableName);
        const config = VARIABLE_CONFIG[variableName];
        
        // Clear existing options
        select.innerHTML = '';
        
        // Add options
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });
        
        // Set default value
        const defaultOption = options.find(opt => 
            Math.abs(opt.value - config.default) < config.step / 2
        );
        if (defaultOption) {
            select.value = defaultOption.value;
        }
    });
}

/**
 * Calculate predicted median home price using regression formula
 */
function calculatePrediction() {
    let prediction = COEFFICIENTS.intercept;
    
    Object.keys(COEFFICIENTS).forEach(key => {
        if (key === 'intercept') return;
        
        const select = document.getElementById(key);
        if (select) {
            const value = parseFloat(select.value);
            prediction += COEFFICIENTS[key] * value;
        }
    });
    
    return prediction;
}

/**
 * Format price for display
 * The regression model outputs prices in thousands of dollars (e.g., 24.5 = $24,500)
 * This function converts to actual dollars by multiplying by 1000
 */
function formatPrice(price) {
    // Ensure price is a number
    const priceValue = parseFloat(price) || 0;
    // Convert from thousands to actual dollars
    const fullPrice = priceValue * 1000;
    // Format as US currency with no decimal places
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(fullPrice);
}

/**
 * Update the displayed prediction
 */
function updatePrediction() {
    const prediction = calculatePrediction();
    const priceDisplay = document.getElementById('predicted-price');
    
    if (priceDisplay) {
        priceDisplay.textContent = formatPrice(prediction);
        
        // Add animation class
        priceDisplay.classList.add('updated');
        setTimeout(() => {
            priceDisplay.classList.remove('updated');
        }, 300);
    }
}

/**
 * Toggle form visibility
 */
function toggleForm() {
    const mainContent = document.getElementById('main-content');
    const toggleButton = document.getElementById('toggle-form');
    
    if (mainContent && toggleButton) {
        mainContent.classList.toggle('visible');
        toggleButton.classList.toggle('rotated');
        
        // If showing for the first time, populate dropdowns
        if (mainContent.classList.contains('visible')) {
            populateDropdowns();
            updatePrediction();
        }
    }
}

/**
 * Initialize the application
 */
function init() {
    // Set up toggle button
    const toggleButton = document.getElementById('toggle-form');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleForm);
    }
    
    // Add event listeners to all dropdowns (will be populated when form is shown)
    Object.keys(VARIABLE_CONFIG).forEach(variableName => {
        const select = document.getElementById(variableName);
        if (select) {
            select.addEventListener('change', updatePrediction);
        }
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
