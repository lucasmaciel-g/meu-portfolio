let display = document.getElementById('display');
let expression = document.getElementById('expression');
let currentExpression = '';
let result = null;
let memory = 0;
let history = [];

function updateDisplay() {
    if (currentExpression === '') {
        display.textContent = result !== null ? result : '0';
        expression.textContent = '';
    } else {
        display.textContent = currentExpression;
        expression.textContent = currentExpression;
    }
}

function addNumber(number) {
    if (result !== null && currentExpression === '') {
        result = null;
    }
    currentExpression += number;
    updateDisplay();
}

function addOperator(operator) {
    if (currentExpression === '' && result !== null) {
        currentExpression = result + ' ' + operator + ' ';
    } else if (currentExpression !== '') {
        currentExpression += ' ' + operator + ' ';
    }
    updateDisplay();
}

function addDecimal() {
    const parts = currentExpression.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1].trim();
    if (!lastPart.includes('.')) {
        if (lastPart === '') {
            currentExpression += '0.';
        } else {
            currentExpression += '.';
        }
        updateDisplay();
    }
}

function addFunction(func) {
    currentExpression += func;
    updateDisplay();
}

function addConstant(constant) {
    if (constant === 'pi') {
        currentExpression += Math.PI;
    } else if (constant === 'e') {
        currentExpression += Math.E;
    }
    updateDisplay();
}

function addParenthesis(paren) {
    currentExpression += paren;
    updateDisplay();
}

function clearAll() {
    currentExpression = '';
    result = null;
    updateDisplay();
}

function clearEntry() {
    currentExpression = '';
    updateDisplay();
}

function backspace() {
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    }
}

function calculate() {
    if (currentExpression === '') return;

    try {
        let expr = currentExpression;
        
        // Substituir funções matemáticas
        expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
        expr = expr.replace(/pow\(/g, 'Math.pow(');
        expr = expr.replace(/sin\(/g, 'Math.sin(');
        expr = expr.replace(/cos\(/g, 'Math.cos(');
        expr = expr.replace(/tan\(/g, 'Math.tan(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        
        // Avaliar expressão
        result = eval(expr);
        
        // Arredondar resultado para evitar problemas de ponto flutuante
        result = Math.round(result * 1000000000000) / 1000000000000;
        
        // Adicionar ao histórico
        addToHistory(currentExpression, result);
        
        currentExpression = '';
        updateDisplay();
        
    } catch (error) {
        display.textContent = 'ERRO';
        expression.textContent = 'Expressão inválida';
        setTimeout(() => {
            clearAll();
        }, 2000);
    }
}

function addToHistory(expr, result) {
    const historyContainer = document.getElementById('history');
    
    if (history.length === 0) {
        historyContainer.innerHTML = '';
    }
    
    history.unshift({ expression: expr, result: result });
    
    // Limitar histórico a 10 itens
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    renderHistory();
}

function renderHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';
    
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item bg-black/50 rounded p-2 border border-cyan-400/20 cursor-pointer hover:border-cyan-400/50 transition-colors';
        div.innerHTML = `
            <div class="text-cyan-300 text-sm font-mono">${item.expression}</div>
            <div class="text-green-400 font-mono">= ${item.result}</div>
        `;
        div.onclick = () => {
            currentExpression = item.result.toString();
            result = item.result;
            updateDisplay();
        };
        historyContainer.appendChild(div);
    });
}

function clearHistory() {
    history = [];
    document.getElementById('history').innerHTML = `
        <div class="text-gray-400 text-sm text-center py-4">
            Nenhum cálculo ainda
        </div>
    `;
}

// Funções de memória
function memoryClear() {
    memory = 0;
    document.getElementById('memoryValue').textContent = '0';
}

function memoryRecall() {
    currentExpression = memory.toString();
    result = memory;
    updateDisplay();
}

function memoryAdd() {
    const currentValue = result !== null ? result : parseFloat(currentExpression) || 0;
    memory += currentValue;
    document.getElementById('memoryValue').textContent = memory;
}

function memorySubtract() {
    const currentValue = result !== null ? result : parseFloat(currentExpression) || 0;
    memory -= currentValue;
    document.getElementById('memoryValue').textContent = memory;
}

// Suporte a teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        addNumber(key);
    } else if (key === '+') {
        addOperator('+');
    } else if (key === '-') {
        addOperator('-');
    } else if (key === '*') {
        addOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        addOperator('/');
    } else if (key === '.') {
        addDecimal();
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '(') {
        addParenthesis('(');
    } else if (key === ')') {
        addParenthesis(')');
    }
});

// Inicializar display
updateDisplay();