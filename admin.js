// Define default data (same as mockData.js) as fallback
// In a real app, this would be fetched from a server API.
let currentData = defaultAppData; // defaultAppData will be loaded from mockData.js

// Initialize admin panel with current data
document.addEventListener('DOMContentLoaded', () => {
    // Check if we have saved data in localStorage
    const savedData = localStorage.getItem('greatStayData');
    if (savedData) {
        currentData = JSON.parse(savedData);
    }

    // Populate forms
    document.getElementById('prop-name').value = currentData.property.name;
    document.getElementById('prop-header-image').value = currentData.property.headerImage;
    document.getElementById('wifi-network').value = currentData.property.wifi.network;
    document.getElementById('wifi-password').value = currentData.property.wifi.password;

    if (currentData.rules.length > 0) {
        document.getElementById('rule-title').value = currentData.rules[0].title;
        document.getElementById('rule-desc').value = currentData.rules[0].desc;
    }

    renderVideoFields();
});

// Video functionaliteit
window.addVideoField = function () {
    saveVideoInputs();
    currentData.videos.push({ title: "", thumb: "", url: "" });
    renderVideoFields();
};

window.removeVideoField = function (index) {
    saveVideoInputs();
    currentData.videos.splice(index, 1);
    renderVideoFields();
};

function renderVideoFields() {
    const list = document.getElementById('video-list');
    list.innerHTML = '';
    currentData.videos.forEach((v, index) => {
        const html = `
            <div class="video-item" style="border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; position: relative;">
                <button type="button" onclick="removeVideoField(${index})" style="position: absolute; right: 10px; top: 10px; background: none; border: none; color: #dc3545; cursor: pointer;">
                    <ion-icon name="trash" style="font-size: 1.4rem;"></ion-icon>
                </button>
                <div class="form-group">
                    <label>Titel</label>
                    <input type="text" id="video-title-${index}" value="${v.title}" required>
                </div>
                <div class="form-group">
                    <label>Thumbnail / Preview afbeelding (URL link)</label>
                    <input type="url" id="video-thumb-${index}" value="${v.thumb}" required>
                </div>
                <div class="form-group">
                    <label>Video URL (Link naar Youtube/Vimeo)</label>
                    <input type="url" id="video-url-${index}" value="${v.url}" required>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    });
}

function saveVideoInputs() {
    currentData.videos.forEach((v, index) => {
        const titleEl = document.getElementById("video-title-" + index);
        const thumbEl = document.getElementById("video-thumb-" + index);
        const urlEl = document.getElementById("video-url-" + index);
        if (titleEl) {
            v.title = titleEl.value;
            v.thumb = thumbEl.value;
            v.url = urlEl.value;
        }
    });
}

// Handle Save functionality
document.getElementById('admin-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Update data object with new values from the form
    currentData.property.name = document.getElementById('prop-name').value;
    currentData.property.headerImage = document.getElementById('prop-header-image').value;
    currentData.property.wifi.network = document.getElementById('wifi-network').value;
    currentData.property.wifi.password = document.getElementById('wifi-password').value;

    // Update first rule
    if (currentData.rules.length === 0) currentData.rules.push({});
    currentData.rules[0].title = document.getElementById('rule-title').value;
    currentData.rules[0].desc = document.getElementById('rule-desc').value;

    // Save videos
    saveVideoInputs();

    // Save to localStorage (simulating saving to a database)
    localStorage.setItem('greatStayData', JSON.stringify(currentData));

    // Show success message
    const msg = document.getElementById('success-message');
    msg.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
});
