document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateInput');
    const timestampInput = document.getElementById('timestampInput');
    const dateToTimestampBtn = document.getElementById('dateToTimestampBtn');
    const timestampToDateBtn = document.getElementById('timestampToDateBtn');
    const currentTimestampBtn = document.getElementById('currentTimestampBtn');
    const copyTimestampBtn = document.getElementById('copyTimestampBtn');
    const copyDateBtn = document.getElementById('copyDateBtn');
    
    const timestampResult = document.getElementById('timestampResult');
    const dateResult = document.getElementById('dateResult');
    const isoResult = document.getElementById('isoResult');
    const currentTimestamp = document.getElementById('currentTimestamp');
    const currentDateTime = document.getElementById('currentDateTime');

    // Atualizar timestamp atual a cada segundo
    function updateCurrentTime() {
        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);
        
        currentTimestamp.textContent = timestamp;
        currentDateTime.textContent = now.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Inicializar e atualizar a cada segundo
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // Definir data atual como padrão
    const now = new Date();
    const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    dateInput.value = localDateTime;

    // Converter data para timestamp
    dateToTimestampBtn.addEventListener('click', function() {
        if (!dateInput.value) {
            timestampResult.textContent = 'ERROR: Selecione uma data';
            timestampResult.className = 'font-mono text-lg text-red-400';
            copyTimestampBtn.disabled = true;
            return;
        }

        const date = new Date(dateInput.value);
        const timestamp = Math.floor(date.getTime() / 1000);
        
        timestampResult.textContent = timestamp;
        timestampResult.className = 'font-mono text-lg text-yellow-300';
        copyTimestampBtn.disabled = false;
    });

    // Converter timestamp para data
    timestampToDateBtn.addEventListener('click', function() {
        const timestamp = parseInt(timestampInput.value);
        
        if (!timestamp || timestamp < 0) {
            dateResult.textContent = 'ERROR: Digite um timestamp válido';
            dateResult.className = 'font-mono text-red-400';
            isoResult.textContent = '';
            copyDateBtn.disabled = true;
            return;
        }

        const date = new Date(timestamp * 1000);
        
        const localDate = date.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const isoDate = date.toISOString();
        
        dateResult.textContent = localDate + ' (Brazil)';
        dateResult.className = 'font-mono text-green-300';
        isoResult.textContent = `ISO: ${isoDate}`;
        copyDateBtn.disabled = false;
    });

    // Usar timestamp atual
    currentTimestampBtn.addEventListener('click', function() {
        const currentTs = Math.floor(Date.now() / 1000);
        timestampInput.value = currentTs;
        timestampToDateBtn.click();
    });

    // Copiar timestamp
    copyTimestampBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(timestampResult.textContent).then(() => {
            const originalText = copyTimestampBtn.textContent;
            copyTimestampBtn.textContent = '✓ Copiado!';
            setTimeout(() => {
                copyTimestampBtn.textContent = originalText;
            }, 2000);
        });
    });

    // Copiar data
    copyDateBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(dateResult.textContent).then(() => {
            const originalText = copyDateBtn.textContent;
            copyDateBtn.textContent = '✓ Copiado!';
            setTimeout(() => {
                copyDateBtn.textContent = originalText;
            }, 2000);
        });
    });

    // Auto-converter quando digitar timestamp
    timestampInput.addEventListener('input', function() {
        if (timestampInput.value.length >= 10) {
            timestampToDateBtn.click();
        }
    });

    // Auto-converter quando mudar data
    dateInput.addEventListener('change', function() {
        dateToTimestampBtn.click();
    });

    // Converter data inicial
    dateToTimestampBtn.click();
});