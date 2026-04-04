const iconTemplate = (paths, className = "") => `
    <svg
        class="${className}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
    >
        ${paths}
    </svg>
`;

export const icons = {
    arrowRight: iconTemplate('<path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path>'),
    bag: iconTemplate('<path d="M6 8h12l1 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path>'),
    close: iconTemplate('<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'),
    clock: iconTemplate('<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path>'),
    menu: iconTemplate('<path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path>'),
    minus: iconTemplate('<path d="M5 12h14"></path>'),
    phone: iconTemplate('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.29a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z"></path>'),
    pin: iconTemplate('<path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"></path><circle cx="12" cy="11" r="2.5"></circle>'),
    plus: iconTemplate('<path d="M12 5v14"></path><path d="M5 12h14"></path>'),
    search: iconTemplate('<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>'),
    sparkles: iconTemplate('<path d="m12 3 1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4L12 3Z"></path><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"></path><path d="m5 14 .9 2.1L8 17l-2.1.9L5 20l-.9-2.1L2 17l2.1-.9L5 14Z"></path>'),
    star: iconTemplate('<path d="m12 3 2.9 5.88 6.49.94-4.7 4.58 1.11 6.48L12 17.77 6.2 20.88l1.11-6.48-4.7-4.58 6.49-.94L12 3Z"></path>'),
    trash: iconTemplate('<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="m19 6-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>')
};
