document.addEventListener('DOMContentLoaded', () => {
    const users = [
        { name: 'Alice', count: 25 },
        { name: 'Bob', count: 18 },
        { name: 'Charlie', count: 12 },
        { name: 'David', count: 8 },
        { name: 'Eve', count: 15 },
        { name: 'Frank', count: 5 },
        { name: 'Grace', count: 22 },
        { name: 'Heidi', count: 9 },
        { name: 'Ivan', count: 11 },
        { name: 'Judy', count: 3 },
    ];

    const leaderboard = document.getElementById('leaderboard');
    const others = document.getElementById('others');

    const topPerformers = users.filter(user => user.count >= 10);
    const otherUsers = users.filter(user => user.count < 10);

    topPerformers.sort((a, b) => b.count - a.count);
    otherUsers.sort((a, b) => b.count - a.count);

    const createTable = (data) => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['S.No.', 'Name', 'Count'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        data.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.count}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    };

    leaderboard.appendChild(createTable(topPerformers));
    others.appendChild(createTable(otherUsers));
});
