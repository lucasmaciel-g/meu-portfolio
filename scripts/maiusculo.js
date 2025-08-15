document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertButton = document.getElementById('convertButton');
    const clearButton = document.getElementById('clearButton');
    const copyButton = document.getElementById('copyButton');
    const copyStatus = document.getElementById('copyStatus');

    // Função para converter para maiúsculas
    convertButton.addEventListener('click', function() {
        const text = inputText.value.trim();
        
        copyStatus.innerHTML = '<span class="text-yellow-400">></span> <span class="animate-pulse">Processando...</span>';
        
        setTimeout(() => {
            if (!text) {
                copyStatus.innerHTML = '<span class="text-red-400">></span> ERROR: Digite um texto primeiro';
                outputText.value = '';
                copyButton.disabled = true;
                return;
            }

            const upperCaseText = text.toUpperCase();
            outputText.value = upperCaseText;
            copyButton.disabled = false;
            copyStatus.innerHTML = '<span class="text-green-400">></span> Conversão concluída!';
        }, 300);
    });

    // Função para limpar
    clearButton.addEventListener('click', function() {
        inputText.value = '';
        outputText.value = '';
        copyButton.disabled = true;
        copyStatus.innerHTML = '<span class="text-yellow-400">></span> Aguardando conversão...';
    });

    // Função para copiar
    copyButton.addEventListener('click', function() {
        outputText.select();
        document.execCommand('copy');
        copyStatus.innerHTML = '<span class="text-green-400">></span> Texto copiado!';
        
        setTimeout(() => {
            copyStatus.innerHTML = '<span class="text-cyan-400">></span> Pronto para nova conversão';
        }, 2000);
    });

    // Auto-conversão enquanto digita (opcional)
    inputText.addEventListener('input', function() {
        if (inputText.value.trim()) {
            copyStatus.innerHTML = '<span class="text-cyan-400">></span> Digite e clique em convert';
        } else {
            copyStatus.innerHTML = '<span class="text-yellow-400">></span> Aguardando texto...';
            outputText.value = '';
            copyButton.disabled = true;
        }
    });

    // Permitir conversão com Enter
    inputText.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            convertButton.click();
        }
    });
});