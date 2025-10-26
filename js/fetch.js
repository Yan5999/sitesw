document.addEventListener('DOMContentLoaded', function () {
    async function fetchCryptoData() {
        try {
            const coinTable = document.querySelector('.coin-table tbody');
            if (coinTable) {
                coinTable.innerHTML =
                    '<tr><td colspan="3" style="text-align: center;">Завантаження даних...</td></tr>';
            }

            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h'
            );

            if (!response.ok) {
                throw new Error(`HTTP помилка! Статус: ${response.status}`);
            }

            const data = await response.json();
            console.log('Отримані дані:', data);

            updateCoinTable(data);
        } catch (error) {
            console.error('Помилка при отриманні даних:', error);
            showErrorMessage(error);
        }
    }

    function updateCoinTable(data) {
        const coinTable = document.querySelector('.coin-table tbody');
        if (!coinTable) return;

        coinTable.innerHTML = '';

        data.forEach((coin) => {
            const priceChangeClass =
                coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
            const priceChangeFormatted =
                coin.price_change_percentage_24h.toFixed(2);

            const priceFormatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(coin.current_price);

            const row = document.createElement('tr');
            row.className = 'coin-row';

            row.innerHTML = `
                <td class="coin-cell">
                    <div class="coin-name">
                        <div class="coin-icon">
                            <img src="${
                                coin.image
                            }" alt="${coin.symbol.toUpperCase()}">
                        </div>
                        <span class="coin-symbol">${coin.symbol.toUpperCase()}</span>
                        <span class="coin-fullname">${coin.name}</span>
                    </div>
                </td>
                <td class="coin-cell">
                    <div class="coin-price">${priceFormatted}</div>
                </td>
                <td class="coin-cell">
                    <div class="coin-change ${priceChangeClass}">${priceChangeFormatted}%</div>
                </td>
            `;

            coinTable.appendChild(row);
        });

        addRefreshButton();
    }

    function showErrorMessage(error) {
        const coinTable = document.querySelector('.coin-table tbody');
        if (coinTable) {
            coinTable.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align: center; color: #cf304a;">
                        Не вдалося завантажити дані.<br>
                        ${error.message}<br>
                        <button id="retry-btn" style="
                            background-color: #FCD535;
                            border: none;
                            border-radius: 4px;
                            color: #000000;
                            font-size: 14px;
                            padding: 5px 15px;
                            margin-top: 10px;
                            cursor: pointer;">
                            Спробувати знову
                        </button>
                    </td>
                </tr>
            `;

            document
                .getElementById('retry-btn')
                .addEventListener('click', fetchCryptoData);
        }
    }

    function addRefreshButton() {
        if (document.getElementById('refresh-btn')) return;

        const tabsContainer = document.querySelector('.tabs');
        if (tabsContainer) {
            const refreshBtn = document.createElement('button');
            refreshBtn.id = 'refresh-btn';
            refreshBtn.textContent = '⟳';
            refreshBtn.style.cssText = `
                background-color: transparent;
                border: none;
                color: #f0b90b;
                font-size: 18px;
                cursor: pointer;
                margin-left: 188px;
                transition: transform 0.3s;
            `;

            refreshBtn.addEventListener('mouseover', () => {
                refreshBtn.style.transform = 'rotate(180deg)';
            });

            refreshBtn.addEventListener('mouseout', () => {
                refreshBtn.style.transform = 'rotate(0)';
            });

            refreshBtn.addEventListener('click', () => {
                refreshBtn.style.transition = 'transform 0.5s';
                refreshBtn.style.transform = 'rotate(360deg)';

                fetchCryptoData();

                setTimeout(() => {
                    refreshBtn.style.transform = 'rotate(0)';
                }, 500);
            });

            tabsContainer.appendChild(refreshBtn);
        }
    }

    fetchCryptoData();

    document.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', function () {
            document
                .querySelectorAll('.tab')
                .forEach((t) => t.classList.remove('active'));

            this.classList.add('active');
        });
    });
});
