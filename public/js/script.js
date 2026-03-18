document.getElementById('convertBtn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const resultDiv = document.getElementById('result');
    if (!amount || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
    }
    resultDiv.textContent = 'Converting...';
    try {
        const response = await fetch(`/api/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await response.json();
        if (response.ok) {
            resultDiv.textContent = `${data.amount} ${data.from} = ${data.result.toFixed(2)} ${data.to.toUpperCase()} (Rate: 1 ${data.from} = ${data.rate} ${data.to})`;
        } else {
            resultDiv.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultDiv.textContent = 'Network error. Please try again.';
        console.error(error);
    }
});
