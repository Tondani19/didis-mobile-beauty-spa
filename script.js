/*=========================================
  DIDI'S MOBILE BEAUTY SPA
  ==========================================*/

  document.addEventListener('DOMContentLoaded',() => {
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) return;

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //Reset state
        clearErrors();
        let isValid = true;

        // Form elements
        const fullName = document.getElementById('full-name');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const bookingDate = document.getElementById('bookingDate');
        const address = document.getElementById('address');

        // 1. Full Name Validation
        if (fullName.value.trim().length < 3) {
            showError(fullName, 'nameError', 'Please enter your full name (at least 3 characters).');
            isValid = false;
        }

        // 2. Phone Number Validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, 'phoneError', 'Please enter a valid 10-digit phone number.');
            isValid = false;
        }

        // 3. Service Selection Validation
        if (service.value === '') {
            showError(service, 'serviceError', 'Please select a spa treatment.');
            isValid = false;
        }

        // 4. Date Validation (MMust be today or future date)
        const selectedDate = new Date(bookingDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!bookingDate.value || selectedDate < today) {
            showError(bookingDate, 'dateError', 'Please select a valid date (today or future).');
            isValid = false;
        }

        // 5. Address Validation
        if (address.value.trim().length < 5) {
            showError(address, 'addressError', 'Please provide a full address).');
            isValid = false;
        }

        // Successful Submission
        if (isValid) {
            const successBox = document.getElementById('formsuccess');
            successBox.innerHTML= `<strong>Thank you, ${fullName.value}!</strong> Your booking requestfor ${service.value} has been logged. We will contact you at ${phone.value} shortly`;
            successBox.style.display = 'block';

            bookingForm.reset();
        }
    });
    
    function showError(inputElement, errorId, message) {
        inputElement.classList.add('invalid');
        const errorContainer = document.getElementById(errorId);
        if (errorContainer) {
            errorContainer.innerText = message;
            errorContainer.classList.add ('active');
        }
    }

    function clearErrors() {
        const invalidInputs = document.querySelectorAll('.invalid');
        invalidInputs.forEach(input => input.classList.remove('invalid')); 

        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            msg.classList.remove('active');
            msg.innerText = '';
        });

        const successBox = document.getElementById('formsuccess');
        if (successBox) {
            successBox.style.display = 'none';
        }
    }
  });
        