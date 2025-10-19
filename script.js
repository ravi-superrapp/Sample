document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');
    const others = document.getElementById('others');
    const prizeMessage = document.querySelector('.prize-message');
    const prizeImages = document.querySelector('.prize-images');

    prizeMessage.addEventListener('click', () => {
        prizeImages.style.display = prizeImages.style.display === 'flex' ? 'none' : 'flex';
    });

    const fetchData = async () => {
        try {
            const response = await fetch('https://zvt2bbpn-3600.inc1.devtunnels.ms/leaderboard');
            const users = await response.json();

            const topPerformers = users.filter(user => user.count >= 10);
            const otherUsers = users.filter(user => user.count < 10);

            topPerformers.sort((a, b) => b.count - a.count);
            otherUsers.sort((a, b) => b.count - a.count);

            renderTable(leaderboard, topPerformers, true);
            renderTable(others, otherUsers, false);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            leaderboard.innerHTML = '<p>Could not load leaderboard data.</p>';
        }
    };

    const renderTable = (element, data, isLeaderboard) => {
        element.innerHTML = ''; // Clear existing content
        const table = createTable(data, isLeaderboard);
        element.appendChild(table);
    };

    const createTable = (data, isLeaderboard) => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['Rank', 'Name', 'Count'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        data.forEach((user, index) => {
            const row = document.createElement('tr');
            let rankCell = `<td>${index + 1}</td>`;

            if (isLeaderboard && index < 3) {
                const medals = ['🥇', '🥈', '🥉'];
                rankCell = `<td>${medals[index]}</td>`;
            }

            row.innerHTML = `
                ${rankCell}
                <td>${user.name}</td>
                <td>${user.count}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    };

    fetchData();
});
