import { menuItems } from "../assets/data/menu-items.js";

const adminRoot = document.querySelector("#admin-app");

const formatCurrency = (value) => `₹${value.toFixed(0)}`;

const getMenuStatus = (index) => {
    if (index % 5 === 0) {
        return "Low stock";
    }

    if (index % 7 === 0) {
        return "Paused";
    }

    return "Active";
};

const getMenuBadgeClass = (status) => {
    if (status === "Active") {
        return "admin-badge is-success";
    }

    if (status === "Low stock") {
        return "admin-badge is-warning";
    }

    return "admin-badge is-muted";
};

const menuRows = menuItems.map((item, index) => ({
    ...item,
    status: getMenuStatus(index),
    soldToday: 12 + (index * 3),
    stockLeft: Math.max(6, 42 - (index * 2))
}));

const orders = [
    {
        id: "ORD-2401",
        student: "Riya Sharma",
        items: "Veg Thali, Fresh Lime Soda",
        total: 165,
        channel: "Pickup",
        time: "12:10 PM",
        status: "Preparing"
    },
    {
        id: "ORD-2402",
        student: "Aman Verma",
        items: "Paneer Roll x2",
        total: 178,
        channel: "Pickup",
        time: "12:18 PM",
        status: "Ready"
    },
    {
        id: "ORD-2403",
        student: "Neha Patel",
        items: "Cold Coffee, Brownie Bite",
        total: 104,
        channel: "Counter",
        time: "12:22 PM",
        status: "Completed"
    },
    {
        id: "ORD-2404",
        student: "Rohan Singh",
        items: "Masala Dosa, Filter Coffee",
        total: 94,
        channel: "Pickup",
        time: "12:27 PM",
        status: "Preparing"
    },
    {
        id: "ORD-2405",
        student: "Priya Nair",
        items: "Crispy Samosa x2, Fresh Lime Soda",
        total: 84,
        channel: "Counter",
        time: "12:33 PM",
        status: "Queued"
    },
    {
        id: "ORD-2406",
        student: "Karan Gupta",
        items: "Lemon Rice Bowl, Cold Coffee",
        total: 129,
        channel: "Pickup",
        time: "12:41 PM",
        status: "Ready"
    }
];

const statusToneMap = {
    Queued: "admin-badge is-warning",
    Preparing: "admin-badge is-info",
    Ready: "admin-badge is-success",
    Completed: "admin-badge is-muted"
};

const categoryCount = new Set(menuItems.map((item) => item.category)).size;
const activeItemsCount = menuRows.filter((item) => item.status === "Active").length;
const todayRevenue = orders.reduce((sum, order) => sum + order.total, 0) + 1320;
const avgPrepMinutes = 8;
const pendingOrdersCount = orders.filter((order) => ["Queued", "Preparing"].includes(order.status)).length;
const completionRate = 94;
const topItems = [...menuRows]
    .sort((a, b) => b.soldToday - a.soldToday)
    .slice(0, 4);

const createStatCard = ({ label, value, meta, tone = "" }) => `
    <article class="admin-stat-card ${tone}">
        <span class="admin-stat-label">${label}</span>
        <strong class="admin-stat-value">${value}</strong>
        <p class="admin-stat-meta">${meta}</p>
    </article>
`;

const createMenuRow = (item) => `
    <tr>
        <td>
            <div class="admin-table-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <strong>${item.name}</strong>
                    <span>${item.description}</span>
                </div>
            </div>
        </td>
        <td>${item.category}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>${item.soldToday}</td>
        <td>${item.stockLeft}</td>
        <td><span class="${getMenuBadgeClass(item.status)}">${item.status}</span></td>
        <td>
            <div class="admin-table-actions">
                <button type="button" class="admin-inline-button">Edit</button>
                <button type="button" class="admin-inline-button is-muted">View</button>
            </div>
        </td>
    </tr>
`;

const createOrderRow = (order) => `
    <tr>
        <td><strong>${order.id}</strong></td>
        <td>${order.student}</td>
        <td>${order.items}</td>
        <td>${formatCurrency(order.total)}</td>
        <td>${order.channel}</td>
        <td>${order.time}</td>
        <td><span class="${statusToneMap[order.status] || "admin-badge"}">${order.status}</span></td>
    </tr>
`;

const createTopItem = (item, index) => `
    <li class="admin-top-item">
        <span class="admin-top-rank">0${index + 1}</span>
        <div class="admin-top-copy">
            <strong>${item.name}</strong>
            <span>${item.category} • ${item.soldToday} sold today</span>
        </div>
        <span class="admin-top-price">${formatCurrency(item.price)}</span>
    </li>
`;

const renderAdminApp = () => `
    <div class="admin-layout">
        <aside class="admin-sidebar">
            <a class="admin-brand" href="./admin.html" aria-label="Baba Canteen Admin Home">
                <span class="admin-brand-mark">BC</span>
                <span class="admin-brand-copy">
                    <strong>Baba Canteen</strong>
                    <small>Admin dashboard</small>
                </span>
            </a>

            <nav class="admin-nav" aria-label="Admin navigation">
                <a class="admin-nav-link is-active" href="#overview">Overview</a>
                <a class="admin-nav-link" href="#menu">Manage Menu</a>
                <a class="admin-nav-link" href="#orders">Orders</a>
                <a class="admin-nav-link" href="#insights">Insights</a>
            </nav>

            <div class="admin-sidebar-card">
                <span class="admin-kicker">Today</span>
                <h2>Lunch rush in progress</h2>
                <p>${pendingOrdersCount} live orders need attention across pickup and counter queues.</p>
                <span class="admin-badge is-info">Peak window · 12 PM to 2 PM</span>
            </div>

            <a class="button-secondary admin-back-link" href="./index.html">← Back to student ordering</a>
        </aside>

        <main class="admin-main">
            <header class="admin-header">
                <div>
                    <span class="admin-kicker">Baba Canteen</span>
                    <h1>Operations dashboard</h1>
                    <p>Track service, menu performance, and active orders from one clean workspace.</p>
                </div>

                <div class="admin-header-actions">
                    <button type="button" class="button-secondary admin-header-button">Export report</button>
                    <button type="button" class="button-primary admin-header-button">Add menu item</button>
                </div>
            </header>

            <section id="overview" class="admin-section">
                <div class="admin-section-heading">
                    <div>
                        <span class="admin-kicker">Overview</span>
                        <h2>Daily snapshot</h2>
                    </div>
                    <p>Fast signals for revenue, throughput, and menu readiness.</p>
                </div>

                <div class="admin-stats-grid">
                    ${createStatCard({
                        label: "Revenue today",
                        value: formatCurrency(todayRevenue),
                        meta: "Up 12% vs yesterday",
                        tone: "is-accent"
                    })}
                    ${createStatCard({
                        label: "Orders in queue",
                        value: `${pendingOrdersCount}`,
                        meta: "2 ready for pickup"
                    })}
                    ${createStatCard({
                        label: "Active menu items",
                        value: `${activeItemsCount}/${menuRows.length}`,
                        meta: `${categoryCount} categories live`
                    })}
                    ${createStatCard({
                        label: "Average prep time",
                        value: `${avgPrepMinutes} min`,
                        meta: `${completionRate}% on-time completion`
                    })}
                </div>

                <div class="admin-overview-grid" id="insights">
                    <section class="admin-panel">
                        <div class="admin-panel-heading">
                            <div>
                                <span class="admin-kicker">Top sellers</span>
                                <h3>Items moving fastest today</h3>
                            </div>
                            <span class="admin-badge is-success">Updated 5 min ago</span>
                        </div>

                        <ul class="admin-top-list">
                            ${topItems.map(createTopItem).join("")}
                        </ul>
                    </section>

                    <section class="admin-panel">
                        <div class="admin-panel-heading">
                            <div>
                                <span class="admin-kicker">Service health</span>
                                <h3>Shift notes</h3>
                            </div>
                        </div>

                        <div class="admin-note-stack">
                            <article class="admin-note-card">
                                <strong>Counter flow is steady</strong>
                                <p>Walk-in orders are under 4 minutes average despite the lunch spike.</p>
                            </article>
                            <article class="admin-note-card">
                                <strong>Cold beverages trending up</strong>
                                <p>Cold Coffee and Fresh Lime Soda are seeing strong post-noon demand.</p>
                            </article>
                            <article class="admin-note-card">
                                <strong>Low stock alert</strong>
                                <p>Review snacks inventory before the evening tea break starts.</p>
                            </article>
                        </div>
                    </section>
                </div>
            </section>

            <section id="menu" class="admin-section">
                <div class="admin-section-heading">
                    <div>
                        <span class="admin-kicker">Manage Menu</span>
                        <h2>Live catalog</h2>
                    </div>
                    <p>Review availability, pricing, and product movement across the canteen menu.</p>
                </div>

                <div class="admin-panel">
                    <div class="admin-panel-heading">
                        <div>
                            <h3>Menu items</h3>
                            <p class="admin-panel-subtext">Static preview UI using demo values inspired by the current canteen catalog.</p>
                        </div>

                        <div class="admin-toolbar-pills">
                            <span class="admin-badge is-muted">All categories</span>
                            <span class="admin-badge is-warning">3 low stock</span>
                        </div>
                    </div>

                    <div class="admin-table-wrap">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Sold</th>
                                    <th>Stock left</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${menuRows.map(createMenuRow).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="orders" class="admin-section">
                <div class="admin-section-heading">
                    <div>
                        <span class="admin-kicker">Orders</span>
                        <h2>Live order board</h2>
                    </div>
                    <p>Monitor active preparation and completed handoffs with a minimal service view.</p>
                </div>

                <div class="admin-orders-grid">
                    <section class="admin-panel">
                        <div class="admin-panel-heading">
                            <div>
                                <h3>Current orders</h3>
                                <p class="admin-panel-subtext">Most recent campus orders for pickup and counter service.</p>
                            </div>
                            <span class="admin-badge is-info">${orders.length} active records</span>
                        </div>

                        <div class="admin-table-wrap">
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Student</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Channel</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orders.map(createOrderRow).join("")}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <aside class="admin-panel admin-queue-panel">
                        <div class="admin-panel-heading">
                            <div>
                                <span class="admin-kicker">Quick queue</span>
                                <h3>Next actions</h3>
                            </div>
                        </div>

                        <div class="admin-queue-list">
                            <article class="admin-queue-card">
                                <strong>ORD-2401</strong>
                                <p>Veg Thali needs final plating and beverage pairing.</p>
                                <span class="admin-badge is-info">Preparing</span>
                            </article>
                            <article class="admin-queue-card">
                                <strong>ORD-2402</strong>
                                <p>Paneer Roll order is packed and ready for pickup shelf.</p>
                                <span class="admin-badge is-success">Ready</span>
                            </article>
                            <article class="admin-queue-card">
                                <strong>ORD-2405</strong>
                                <p>Snacks order entered queue and should move in the next 3 minutes.</p>
                                <span class="admin-badge is-warning">Queued</span>
                            </article>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    </div>
`;

if (adminRoot) {
    adminRoot.innerHTML = renderAdminApp();
}