// Initialize app with mock data
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Set Header Info
    document.getElementById('greeting-text').innerText = 'Welkom in';
    document.getElementById('property-name').innerText = appData.property.name;
    document.getElementById('app-header').style.backgroundImage = `url('${appData.property.headerImage}')`;

    // Render Views
    renderHomeView();
    renderInfoView();
    renderOmgevingView();
    renderContactView();

    // Setup Tabs
    setupTabs();
}

function renderHomeView() {
    const html = `
        <div class="tab-content active" id="view-home">
            <h2 style="margin-bottom: 20px;">Snel inzicht</h2>
            
            <div class="card clickable" onclick="openWifiModal()">
                <div class="icon-wrapper"><ion-icon name="wifi-outline"></ion-icon></div>
                <div class="card-content">
                    <h3>WiFi Netwerk</h3>
                    <p>Tik om code te zien</p>
                </div>
            </div>

            <div class="card">
                <div class="icon-wrapper"><ion-icon name="key-outline"></ion-icon></div>
                <div class="card-content">
                    <h3>Uitchecken</h3>
                    <p>Morgen voor 10:00</p>
                </div>
            </div>

            <h2 style="margin-top: 30px; margin-bottom: 20px;">Video Instructies</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${appData.videos.map(v => `
                    <div class="video-card" onclick="openVideoModal('${v.url}')" style="cursor: pointer;">
                        <div class="video-thumb" style="background-image: url('${v.thumb}')">
                            <ion-icon name="play-circle"></ion-icon>
                        </div>
                        <p style="font-weight: 600; font-size: 0.9rem; text-align: center; width: 100%; margin-top: 5px;">${v.title}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('main-content').insertAdjacentHTML('beforeend', html);
}

function renderInfoView() {
    const html = `
        <div class="tab-content" id="view-info">
            <h2 style="margin-bottom: 20px;">Huisregels & Info</h2>
            <div class="info-list">
                ${appData.rules.map(r => `
                    <div class="info-item">
                        <div>
                            <h4>${r.title}</h4>
                            <p>${r.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('main-content').insertAdjacentHTML('beforeend', html);
}

function renderOmgevingView() {
    const html = `
        <div class="tab-content" id="view-omgeving">
            <h2 style="margin-bottom: 20px;">Lokale Tips</h2>
            <div class="info-list">
                ${appData.restaurants.map(r => `
                    <a href="${r.url}" class="info-item" style="text-decoration: none;">
                        <div>
                            <h4>${r.name}</h4>
                            <p>${r.desc}</p>
                        </div>
                        <ion-icon name="chevron-forward-outline" style="color: var(--text-secondary);"></ion-icon>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('main-content').insertAdjacentHTML('beforeend', html);
}

function renderContactView() {
    const html = `
        <div class="tab-content" id="view-contact">
            <div class="host-profile">
                <img src="${appData.property.host.avatar}" alt="Host" class="host-avatar">
                <h2>Vragen?</h2>
                <p style="color: var(--text-secondary); margin-top: 5px;">Je host ${appData.property.host.name} helpt je graag.</p>
            </div>
            
            <button class="btn btn-whatsapp" onclick="window.open('https://wa.me/${appData.property.host.phone}', '_blank')">
                <ion-icon name="logo-whatsapp"></ion-icon> WhatsApp
            </button>
            <button class="btn btn-call" onclick="window.location.href='tel:${appData.property.host.phone}'">
                <ion-icon name="call-outline"></ion-icon> Bellen
            </button>
        </div>
    `;
    document.getElementById('main-content').insertAdjacentHTML('beforeend', html);
}

// Tab Navigation Logic
function setupTabs() {
    const tabs = document.querySelectorAll('.nav-item');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = `view-${tab.dataset.tab}`;

            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and its content
            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');

            // Scroll to top
            document.getElementById('main-content').scrollTop = 0;
        });
    });
}

// Modal Logic
function openWifiModal() {
    document.getElementById('wifi-network').textContent = appData.property.wifi.network;
    document.getElementById('wifi-password').textContent = appData.property.wifi.password;
    document.getElementById('wifi-modal').classList.add('show');
}

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('wifi-modal').classList.remove('show');
});

function openVideoModal(url) {
    let embedUrl = url;
    // Automatisch standaard YouTube links omzetten naar een Embed link (zodat ze direct afspelen)
    if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    document.getElementById('video-iframe').src = embedUrl;
    document.getElementById('video-modal').classList.add('show');
}

// Close video modal and stop audio playback
document.querySelector('.close-video-btn')?.addEventListener('click', () => {
    document.getElementById('video-iframe').src = "";
    document.getElementById('video-modal').classList.remove('show');
});

// Close modal when clicking outside of it (for both modals)
window.addEventListener('click', (event) => {
    const wifiModal = document.getElementById('wifi-modal');
    const videoModal = document.getElementById('video-modal');

    if (event.target == wifiModal) {
        wifiModal.classList.remove('show');
    }
    if (event.target == videoModal) {
        document.getElementById('video-iframe').src = ""; // Stop video audio
        videoModal.classList.remove('show');
    }
});
