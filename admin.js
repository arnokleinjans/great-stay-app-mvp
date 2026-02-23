// Define default data (same as mockData.js) as fallback
// In a real app, this would be fetched from a server API.
let currentData = appData; // appData will be loaded from mockData.js

let globalAvailableImages = [];
let globalAvailableIcons = [];

// Initialize admin panel with current data
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch available images
    try {
        const response = await fetch('http://localhost:8002/api/images');
        globalAvailableImages = await response.json();
    } catch (e) {
        console.error("Could not fetch images", e);
    }

    // Fetch available icons
    try {
        const response = await fetch('http://localhost:8002/api/icons');
        globalAvailableIcons = await response.json();
    } catch (e) {
        console.error("Could not fetch icons", e);
    }

    // Populate forms
    document.getElementById('access-code').value = currentData.accessCode || '';
    document.getElementById('prop-name').value = currentData.property.name;
    document.getElementById('wifi-network').value = currentData.property.wifi.network;
    document.getElementById('wifi-password').value = currentData.property.wifi.password;

    // Populate header image select
    const headerSelect = document.getElementById('prop-header-image');
    headerSelect.innerHTML = globalAvailableImages.map(img =>
        `<option value="${img}" ${currentData.property.headerImage === img ? 'selected' : ''}>${img.split('/').pop()}</option>`
    ).join('');

    renderInsightFields();
    renderRuleFields();
    renderTipFields();
    renderVideoFields();
});

// --- Snel Inzicht Functionaliteit ---

window.addInsightField = function () {
    saveInsightInputs();
    currentData.insights = currentData.insights || [];
    currentData.insights.push({ icon: "info.svg", title: "", subtitle: "", action: "none" });
    renderInsightFields();
};

window.removeInsightField = function (index) {
    saveInsightInputs();
    if (currentData.insights) {
        currentData.insights.splice(index, 1);
    }
    renderInsightFields();
};

function renderInsightFields() {
    const list = document.getElementById('insight-list');
    list.innerHTML = '';
    (currentData.insights || []).forEach((item, index) => {
        const selectHtml = globalAvailableIcons.map(icon => `<option value="${icon}" ${item.icon === icon ? 'selected' : ''}>${icon}</option>`).join('');
        const html = `
            <div class="video-item" style="border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; position: relative;">
                <button type="button" onclick="removeInsightField(${index})" style="position: absolute; right: 10px; top: 10px; background: none; border: none; color: #dc3545; cursor: pointer;">
                    <ion-icon name="trash" style="font-size: 1.4rem;"></ion-icon>
                </button>
                <div style="display: flex; gap: 15px;">
                    <div class="form-group" style="flex: 1;">
                        <label>Icoon</label>
                        <select id="insight-icon-${index}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); font-family: 'Nunito', sans-serif;">
                            ${selectHtml}
                        </select>
                    </div>
                    <div class="form-group" style="flex: 2;">
                        <label>Speciale Actie (Optioneel)</label>
                        <select id="insight-action-${index}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); font-family: 'Nunito', sans-serif;">
                            <option value="none" ${item.action === 'none' ? 'selected' : ''}>Geen (Alleen tekst tonen)</option>
                            <option value="wifi-modal" ${item.action === 'wifi-modal' ? 'selected' : ''}>Open WiFi Wachtwoord Popup</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Titel</label>
                    <input type="text" id="insight-title-${index}" value="${item.title}" required>
                </div>
                <div class="form-group">
                    <label>Subtekst</label>
                    <input type="text" id="insight-subtitle-${index}" value="${item.subtitle}" required>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    });
}

function saveInsightInputs() {
    (currentData.insights || []).forEach((item, index) => {
        const iconEl = document.getElementById("insight-icon-" + index);
        const titleEl = document.getElementById("insight-title-" + index);
        const subEl = document.getElementById("insight-subtitle-" + index);
        const actionEl = document.getElementById("insight-action-" + index);
        if (titleEl) {
            item.icon = iconEl.value;
            item.title = titleEl.value;
            item.subtitle = subEl.value;
            item.action = actionEl.value;
        }
    });
}

// --- Huisregels Functionaliteit ---
window.addRuleField = function () {
    saveRuleInputs();
    currentData.rules = currentData.rules || [];
    currentData.rules.push({ title: "", desc: "" });
    renderRuleFields();
};

window.removeRuleField = function (index) {
    saveRuleInputs();
    if (currentData.rules) {
        currentData.rules.splice(index, 1);
    }
    renderRuleFields();
};

function renderRuleFields() {
    const list = document.getElementById('rule-list');
    list.innerHTML = '';
    (currentData.rules || []).forEach((r, index) => {
        const html = `
            <div class="video-item" style="border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; position: relative;">
                <button type="button" onclick="removeRuleField(${index})" style="position: absolute; right: 10px; top: 10px; background: none; border: none; color: #dc3545; cursor: pointer;">
                    <ion-icon name="trash" style="font-size: 1.4rem;"></ion-icon>
                </button>
                <div class="form-group">
                    <label>Titel (bijv. 'Afvalscheiding')</label>
                    <input type="text" id="rule-title-${index}" value="${r.title}" required>
                </div>
                <div class="form-group">
                    <label>Beschrijving</label>
                    <textarea id="rule-desc-${index}" required>${r.desc}</textarea>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    });
}

function saveRuleInputs() {
    (currentData.rules || []).forEach((r, index) => {
        const titleEl = document.getElementById("rule-title-" + index);
        const descEl = document.getElementById("rule-desc-" + index);
        if (titleEl) {
            r.title = titleEl.value;
            r.desc = descEl.value;
        }
    });
}

// --- Lokale Tips Functionaliteit ---
window.addTipField = function () {
    saveTipInputs();
    currentData.restaurants = currentData.restaurants || [];
    currentData.restaurants.push({ name: "", desc: "", url: "#" });
    renderTipFields();
};

window.removeTipField = function (index) {
    saveTipInputs();
    currentData.restaurants.splice(index, 1);
    renderTipFields();
};

function renderTipFields() {
    const list = document.getElementById('tip-list');
    list.innerHTML = '';
    (currentData.restaurants || []).forEach((t, index) => {
        const html = `
            <div class="video-item" style="border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; position: relative;">
                <button type="button" onclick="removeTipField(${index})" style="position: absolute; right: 10px; top: 10px; background: none; border: none; color: #dc3545; cursor: pointer;">
                    <ion-icon name="trash" style="font-size: 1.4rem;"></ion-icon>
                </button>
                <div class="form-group">
                    <label>Naam (bijv. 'Pannenkoekenboerderij')</label>
                    <input type="text" id="tip-name-${index}" value="${t.name}" required>
                </div>
                <div class="form-group">
                    <label>Korte omschrijving</label>
                    <input type="text" id="tip-desc-${index}" value="${t.desc}" required>
                </div>
                <div class="form-group">
                    <label>Website URL (Optioneel)</label>
                    <input type="url" id="tip-url-${index}" value="${t.url}">
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    });
}

function saveTipInputs() {
    (currentData.restaurants || []).forEach((t, index) => {
        const nameEl = document.getElementById("tip-name-" + index);
        const descEl = document.getElementById("tip-desc-" + index);
        const urlEl = document.getElementById("tip-url-" + index);
        if (nameEl) {
            t.name = nameEl.value;
            t.desc = descEl.value;
            t.url = urlEl.value || "#";
        }
    });
}

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
                    <label>Thumbnail / Preview afbeelding</label>
                    <select id="video-thumb-${index}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); font-family: 'Nunito', sans-serif;">
                        ${globalAvailableImages.map(img => `<option value="${img}" ${v.thumb === img ? 'selected' : ''}>${img.split('/').pop()}</option>`).join('')}
                    </select>
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
document.getElementById('admin-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Update plain fields
    currentData.accessCode = document.getElementById('access-code').value;
    currentData.property.name = document.getElementById('prop-name').value;
    currentData.property.headerImage = document.getElementById('prop-header-image').value;
    currentData.property.wifi.network = document.getElementById('wifi-network').value;
    currentData.property.wifi.password = document.getElementById('wifi-password').value;

    // Save dynamic arrays
    saveInsightInputs();
    saveRuleInputs();
    saveTipInputs();
    saveVideoInputs();

    // Create the content for mockData.js
    const fileContent = `// Dit simuleert de data die uit het CMS van de verhuurder komt.
const appData = ${JSON.stringify(currentData, null, 4)};
`;

    // Attempt to save locally via the custom Python server
    const msg = document.getElementById('success-message');
    try {
        const response = await fetch('http://localhost:8002/save', {
            method: 'POST',
            body: fileContent
        });
        if (response.ok) {
            msg.innerText = "Opgeslagen! ✔ De lokale map is bijgewerkt.";
            msg.style.backgroundColor = "#d4edda";
            msg.style.color = "#155724";
            msg.style.border = "1px solid #c3e6cb";

            // Show the pop-up
            alert("Opgeslagen!");
        } else {
            msg.innerText = "Fout bij opslaan! (Server is waarschijnlijk niet server.py)";
            msg.style.backgroundColor = "#f8d7da";
            msg.style.color = "#721c24";
            msg.style.border = "1px solid #f5c6cb";

            // Show error pop-up
            alert("Fout bij opslaan!");
        }
    } catch (err) {
        msg.innerText = "Netwerkfout. Draait de Python server op poort 8002 wel?";
        msg.style.backgroundColor = "#f8d7da";
        msg.style.color = "#721c24";
        msg.style.border = "1px solid #f5c6cb";

        alert("Netwerkfout! Zorg dat server.py draait.");
    }

    msg.style.display = 'block';

    // Hide message after 4 seconds
    setTimeout(() => {
        msg.style.display = 'none';
    }, 4000);
});

// Download mockData.js functionality
document.getElementById('download-btn').addEventListener('click', () => {
    // We need to recreate the mockData.js file format exactly
    const fileContent = `// Dit simuleert de data die uit het CMS van de verhuurder komt.
const appData = ${JSON.stringify(currentData, null, 4)};
`;

    // Create a Blob with the content
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mockData.js';
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
});
