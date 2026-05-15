// script.js

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Secure Modal Logic
const modal = document.getElementById('secureModal');
const form = document.getElementById('appointmentForm');
const feedback = document.getElementById('formFeedback');
const submitBtn = document.getElementById('submitBtn');

function openSecureModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeSecureModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    form.reset();
    feedback.className = 'form-feedback hidden';
    feedback.innerHTML = '';
}

// Close modal on outside click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSecureModal();
        }
    });
}

// Form Submission Simulation with Strict Validation
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset feedback
        feedback.className = 'form-feedback hidden';
        feedback.innerHTML = '';

        // Extract Data
        const patientName = document.getElementById('patientName').value.trim();
        const dob = document.getElementById('dob').value;
        const facility = document.getElementById('facility').value;
        const specialty = document.getElementById('specialty').value;
        const reason = document.getElementById('reason').value.trim();
        const hipaaConsent = document.getElementById('hipaaConsent').checked;

        // Defense-in-Depth: Client-Side Validation
        const errors = [];

        if (patientName.length < 2) {
            errors.push("Legal Name is invalid.");
        }

        const today = new Date();
        const dobDate = new Date(dob);
        if (dobDate >= today) {
            errors.push("Date of Birth must be in the past.");
        }

        if (!facility || !specialty) {
            errors.push("Facility and Department are required.");
        }

        if (reason.length < 10) {
            errors.push("Reason for visit must be at least 10 characters.");
        }

        if (!hipaaConsent) {
            errors.push("HIPAA Consent is mandatory.");
        }

        // Display Errors if any
        if (errors.length > 0) {
            feedback.className = 'form-feedback error';
            feedback.innerHTML = `<strong>Validation Failed:</strong><ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
            return;
        }

        // Simulate API Request (Loading State)
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader" class="spin"></i> Authenticating & Encrypting...';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Fake API Delay
        setTimeout(() => {
            // Success State
            feedback.className = 'form-feedback success';
            feedback.innerHTML = `
                <div style="display:flex; gap: 8px; align-items:flex-start;">
                    <i data-lucide="check-circle" style="margin-top:2px;"></i>
                    <div>
                        <strong>Appointment Confirmed!</strong><br>
                        Your scheduling request has been securely processed and encrypted.<br>
                        A confirmation will be sent to your secure portal.
                    </div>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            submitBtn.innerHTML = '<i data-lucide="check"></i> Scheduled';
            
            // Auto-close after a few seconds
            setTimeout(() => {
                closeSecureModal();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i data-lucide="check-circle"></i> Authenticate & Schedule';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 3500);

        }, 2500); // 2.5-second simulation
    });
}

// Add spin animation to CSS dynamically for the loader
const style = document.createElement('style');
style.innerHTML = `
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        
        // Check if currently active
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // If it wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
