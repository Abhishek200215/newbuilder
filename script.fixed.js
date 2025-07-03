
// Global variables to store uploaded images
let uploadedImages = {
  profileImage: null,
  logo: null
};

// Color conversion functions
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function getDarkerColor(hex, opacity = 0.8) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb}, ${opacity})`;
}

// Handle file upload
function handleFileUpload(event, type) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImages[type] = {
      name: file.name,
      data: e.target.result
    };

    // Show file name in UI
    const labelSpan = document.getElementById(type + 'Name');
    if (labelSpan) {
      labelSpan.textContent = file.name;
    }

    showToast(`${type} uploaded successfully!`);
    console.log(`${type} uploaded:`, uploadedImages[type]);
  };
  reader.readAsDataURL(file);
}


// Toast message utility
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Section toggles placeholder
function setupSectionToggles() {
  // Example: collapse/expand toggle logic
  document.querySelectorAll(".section-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const target = document.getElementById(toggle.dataset.target);
      if (target) {
        target.classList.toggle("hidden");
      }
    });
  });
}

// Initialization on window load
window.onload = function () {
  const profileInput = document.getElementById('profileImage');
  const logoInput = document.getElementById('logo');
  const servicesContainer = document.querySelector('#services-container');

  if (profileInput) {
    profileInput.addEventListener('change', function (e) {
      handleFileUpload(e, 'profileImage');
    });
  } else {
    console.warn('profileImage input not found.');
  }

  if (logoInput) {
    logoInput.addEventListener('change', function (e) {
      handleFileUpload(e, 'logo');
    });
  } else {
    console.warn('logo input not found.');
  }

  if (typeof setupSectionToggles === 'function') {
    setupSectionToggles();
  } else {
    console.warn('setupSectionToggles() is not defined.');
  }

  if (
    servicesContainer &&
    servicesContainer.querySelectorAll('.array-item').length === 0
  ) {
    const firstItem = document.createElement('div');
    firstItem.className = 'array-item';
    firstItem.innerHTML = '<input type="text" placeholder="New service">';
    servicesContainer.appendChild(firstItem);
  }
};
