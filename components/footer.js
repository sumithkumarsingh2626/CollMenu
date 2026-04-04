import { icons } from "./icons.js";

export function createFooter() {
    return `
        <footer class="site-footer" data-reveal>
            <div class="footer-grid">
                <div>
                    <span class="section-label">CollMenu</span>
                    <h2>Baba Canteen, upgraded for a cleaner campus ordering experience.</h2>
                </div>

                <div class="footer-list">
                    <h3>Hours</h3>
                    <p>Mon to Sat · 8:00 AM to 8:30 PM</p>
                    <p>Fresh batches throughout the day</p>
                </div>

                <div class="footer-list">
                    <h3>Visit</h3>
                    <p>${icons.pin} Main campus block, near the library</p>
                    <p>${icons.phone} Front desk support for pickup questions</p>
                </div>
            </div>
        </footer>
    `;
}
