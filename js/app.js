// Data Loading Functions - Load from files only (PHP updates files)
async function loadFlightsData() {
  try {
    const response = await fetch('data/flights.json');
    if (!response.ok) {
      throw new Error('Failed to load flights.json');
    }
    const data = await response.json();
    return data.flights || data;
  } catch (error) {
    console.error('Error loading flights:', error);
    alert('Failed to load flight data. Please ensure the server is running.');
    return [];
  }
}

async function loadHotelsData() {
  try {
    const response = await fetch('data/hotels.xml');
    if (!response.ok) {
      throw new Error('Failed to load hotels.xml');
    }
    const xmlText = await response.text();
    return xmlText;
  } catch (error) {
    console.error('Error loading hotels:', error);
    alert('Failed to load hotel data. Please ensure the server is running.');
    return '';
  }
}

async function loadCarsData() {
  try {
    const response = await fetch('data/cars.xml');
    if (!response.ok) {
      throw new Error('Failed to load cars.xml');
    }
    const xmlText = await response.text();
    return xmlText;
  } catch (error) {
    console.error('Error loading cars:', error);
    alert('Failed to load car data. Please ensure the server is running.');
    return '';
  }
}

// Shared Components Class
class SharedComponents {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
  }

  // Initialize shared components
  init() {
    this.injectComponents();
    this.updateNavigation();
    this.updateSidebar();
  }

  // Inject all shared HTML components
  injectComponents() {
    // Header HTML
    const headerHTML = `
      <header>
        <div class="header-content">
          <div class="logo">
            <h1>TravelDeals</h1>
            <p class="tagline">Premium Travel Experiences</p>
          </div>
          <div class="datetime" id="datetime">
            <!-- Current date/time will be inserted here by JavaScript -->
          </div>
        </div>
      </header>
    `;

    // Navigation HTML
    const navbarHTML = `
      <nav class="main-nav">
        <ul>
          <li><a href="index.html" data-page="index">Home</a></li>
          <li><a href="stays.html" data-page="stays">Stays</a></li>
          <li><a href="flights.html" data-page="flights">Flights</a></li>
          <li><a href="cars.html" data-page="cars">Cars</a></li>
          <li><a href="cruises.html" data-page="cruises">Cruises</a></li>
          <li><a href="cart.html" data-page="cart">Cart</a></li>
          <li><a href="contact.html" data-page="contact">Contact Us</a></li>
        </ul>
      </nav>
    `;

    // Sidebar HTML
    const sidebarHTML = `
      <aside class="sidebar">
        <div class="sidebar-section">
          <h3>Quick Actions</h3>
          <ul>
            <li><button id="font-increase">Increase Font Size</button></li>
            <li><button id="font-decrease">Decrease Font Size</button></li>
            <li><button id="color-toggle">Change Background</button></li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 id="sidebar-tips-title">Travel Tips</h3>
          <p id="sidebar-tips-content">Book at least 3 weeks in advance for the best deals on flights and hotels.</p>
        </div>
        <div class="sidebar-section">
          <h3 id="sidebar-offers-title">Special Offers</h3>
          <p id="sidebar-offers-content">Save up to 30% on weekend getaways when you book flights + hotel together.</p>
        </div>
      </aside>
    `;

    // Footer HTML
    const footerHTML = `
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h4>TravelDeals</h4>
            <p>Your trusted partner for premium travel experiences since 2010.</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="flights.html">Flights</a></li>
              <li><a href="stays.html">Stays</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@traveldeals.com</p>
            <p>Phone: (800) 555-TRAVEL</p>
            <p>Address: 123 Travel Street, Suite 100, San Francisco, CA</p>
          </div>
	  <div class="footer-section">
	    <h4>Project Partners</h4>
	    <p>Mike Barron - dal436283</p>
	    <p>Shahbaz Ali - dal042653</p>
	    <p>Steve Burgos - sib130130</p>
	  </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 TravelDeals. All rights reserved.</p>
        </div>
      </footer>
    `;

    // Inject components
    this.injectHTML('header', headerHTML);
    this.injectHTML('nav', navbarHTML);
    this.injectHTML('aside', sidebarHTML);
    this.injectHTML('footer', footerHTML);
  }

  // Function to inject HTML content
  injectHTML(selector, htmlContent) {
    const element = document.querySelector(selector);
    if (element) {
      element.outerHTML = htmlContent;
    }
  }

  // Update navigation with active state
  updateNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const pageData = link.getAttribute('data-page');
      if (pageData === this.currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Update sidebar content based on current page
  updateSidebar() {
    const sidebarConfigs = {
      index: {
        tipsTitle: 'Travel Tips',
        tipsContent: 'Book at least 3 weeks in advance for the best deals on flights and hotels.',
        offersTitle: 'Special Offers',
        offersContent: 'Save up to 30% on weekend getaways when you book flights + hotel together.'
      },
      stays: {
        tipsTitle: 'Hotel Tips',
        tipsContent: 'Book directly with hotels for potential upgrades and better cancellation policies.',
        offersTitle: 'Popular Cities',
        offersContent: 'Los Angeles, CA<br>San Francisco, CA<br>Austin, TX<br>Dallas, TX'
      },
      flights: {
        tipsTitle: 'Flight Tips',
        tipsContent: 'Book flights on Tuesday or Wednesday for the best prices. Early morning or late night flights are often cheaper.',
        offersTitle: 'Popular Routes',
        offersContent: 'Los Angeles to San Francisco<br>Dallas to Houston<br>San Diego to Sacramento'
      },
      cars: {
        tipsTitle: 'Car Rental Tips',
        tipsContent: 'Book your rental car in advance for better rates and vehicle selection. Weekend rentals often have higher demand.',
        offersTitle: 'Popular Locations',
        offersContent: 'Los Angeles Airport (LAX)<br>San Francisco Downtown<br>Dallas City Center<br>Austin Airport'
      },
      cruises: {
        tipsTitle: 'Cruise Tips',
        tipsContent: 'Book shore excursions in advance as they often sell out quickly.',
        offersTitle: 'Popular Destinations',
        offersContent: 'Alaska Glaciers<br>Bahamas Beaches<br>Mediterranean Coast'
      },
      cart: {
        tipsTitle: 'Cart Tips',
        tipsContent: 'Review all items in your cart before proceeding to checkout. Items are saved automatically.',
        offersTitle: 'Need Help?',
        offersContent: 'Contact our support team at (800) 555-HELP for booking assistance.'
      },
      contact: {
        tipsTitle: 'Customer Service',
        tipsContent: 'Our customer service team is available 24/7 to assist with your travel needs.',
        offersTitle: 'Emergency Contact',
        offersContent: 'For urgent matters during your trip, call our emergency line: (800) 555-HELP'
      }
    };

    const config = sidebarConfigs[this.currentPage];
    if (config) {
      const tipsTitle = document.getElementById('sidebar-tips-title');
      const tipsContent = document.getElementById('sidebar-tips-content');
      if (tipsTitle) tipsTitle.textContent = config.tipsTitle;
      if (tipsContent) tipsContent.innerHTML = config.tipsContent;

      const offersTitle = document.getElementById('sidebar-offers-title');
      const offersContent = document.getElementById('sidebar-offers-content');
      if (offersTitle) offersTitle.textContent = config.offersTitle;
      if (offersContent) offersContent.innerHTML = config.offersContent;
    }
  }
}

// Common functionality for all pages
function updateDateTime() {
  const datetimeElement = document.getElementById('datetime');
  if (datetimeElement) {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const datetimeString = now.toLocaleDateString('en-US', options);
    datetimeElement.textContent = datetimeString;
  }
}

// Font size control functions
function changeFontSize(direction) {
  const mainContent = document.querySelector('.main-content');
  const currentSize = parseFloat(window.getComputedStyle(mainContent).fontSize);
  const newSize = currentSize + (direction * 2);

  if (newSize >= 12 && newSize <= 24) {
    mainContent.style.fontSize = newSize + 'px';
  }
}

function toggleBackgroundColor() {
  document.documentElement.classList.toggle('dark-mode');
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  // Dark mode is UI only, not part of assignment requirements
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('darkMode', isDarkMode);
  }
}

// VALIDATION FUNCTIONS ACCORDING TO ASSIGNMENT REQUIREMENTS

// Contact form validation with regex
function validateContactForm() {
  let isValid = true;
  const errors = [];

  // Get form values
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const comment = document.getElementById('comment').value.trim();

  // Clear previous errors
  clearAllErrors();

  // First name validation (alphabetic only, capital first letter)
  const firstNameRegex = /^[A-Z][a-zA-Z]*$/;
  if (!firstName) {
    showError('first-name', 'First name is required.');
    isValid = false;
  } else if (!firstNameRegex.test(firstName)) {
    showError('first-name', 'First name must start with a capital letter and contain only alphabetic characters.');
    isValid = false;
  }

  // Last name validation (alphabetic only, capital first letter)
  const lastNameRegex = /^[A-Z][a-zA-Z]*$/;
  if (!lastName) {
    showError('last-name', 'Last name is required.');
    isValid = false;
  } else if (!lastNameRegex.test(lastName)) {
    showError('last-name', 'Last name must start with a capital letter and contain only alphabetic characters.');
    isValid = false;
  }

  // First name and last name cannot be the same
  if (firstName && lastName && firstName.toLowerCase() === lastName.toLowerCase()) {
    showError('last-name', 'First name and last name cannot be the same.');
    isValid = false;
  }

  // Phone number validation (ddd)ddd-dddd format
  const phoneRegex = /^\(\d{3}\)\d{3}-\d{4}$/;
  if (!phone) {
    showError('phone', 'Phone number is required.');
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    showError('phone', 'Phone number must be in the format (ddd)ddd-dddd.');
    isValid = false;
  }

  // Email validation (must contain @ and .)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'Email address is required.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Email address must contain @ and .');
    isValid = false;
  }

  // Gender validation (must be selected)
  if (!gender) {
    showError('gender-group', 'Gender must be selected.');
    isValid = false;
  }

  // Comment validation (at least 10 characters)
  if (!comment) {
    showError('comment', 'Comment is required.');
    isValid = false;
  } else if (comment.length < 10) {
    showError('comment', 'Comment must be at least 10 characters.');
    isValid = false;
  }

  return isValid;
}

// Flight form validation with regex
function validateFlightForm() {
  let isValid = true;
  clearAllErrors();

  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const departureDate = document.getElementById('departure-date').value;
  const returnDate = document.getElementById('return-date').value;
  const tripType = document.querySelector('input[name="trip-type"]:checked').value;
  const adultCount = parseInt(document.getElementById('adult-count').textContent);
  const childCount = parseInt(document.getElementById('child-count').textContent);
  const infantCount = parseInt(document.getElementById('infant-count').textContent);

  // Origin validation (must be Texas or California city)
  const validCities = [
    'Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth', 'El Paso',
    'Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento'
  ];
  if (!origin) {
    showError('origin', 'Origin city is required.');
    isValid = false;
  } else if (!validCities.includes(origin)) {
    showError('origin', 'Origin must be a city in Texas or California.');
    isValid = false;
  }

  // Destination validation (must be Texas or California city)
  if (!destination) {
    showError('destination', 'Destination city is required.');
    isValid = false;
  } else if (!validCities.includes(destination)) {
    showError('destination', 'Destination must be a city in Texas or California.');
    isValid = false;
  }

  // Departure date validation (Sep 1, 2024 to Dec 1, 2024)
  const departureDateRegex = /^2024-(09-(0[1-9]|[12][0-9]|30)|10-(0[1-9]|[12][0-9]|3[01])|11-(0[1-9]|[12][0-9]|30)|12-01)$/;
  if (!departureDate) {
    showError('departure-date', 'Departure date is required.');
    isValid = false;
  } else if (!departureDateRegex.test(departureDate)) {
    showError('departure-date', 'Departure date must be between Sep 1, 2024 to Dec 1, 2024.');
    isValid = false;
  }

  // Return date validation for round trip
  if (tripType === 'round-trip') {
    if (!returnDate) {
      showError('return-date', 'Return date is required for round trip.');
      isValid = false;
    } else if (!departureDateRegex.test(returnDate)) {
      showError('return-date', 'Return date must be between Sep 1, 2024 to Dec 1, 2024.');
      isValid = false;
    } else if (new Date(returnDate) <= new Date(departureDate)) {
      showError('return-date', 'Return date must be after departure date.');
      isValid = false;
    }
  }

  // Passenger count validation (max 4 per category)
  if (adultCount > 4) {
    showError('passenger-toggle', 'Number of adults cannot be more than 4.');
    isValid = false;
  }
  if (childCount > 4) {
    showError('passenger-toggle', 'Number of children cannot be more than 4.');
    isValid = false;
  }
  if (infantCount > 4) {
    showError('passenger-toggle', 'Number of infants cannot be more than 4.');
    isValid = false;
  }

  return isValid;
}

// Stays form validation without regex
function validateStaysForm() {
  let isValid = true;
  clearAllErrors();

  const city = document.getElementById('city').value.trim();
  const checkIn = document.getElementById('check-in').value;
  const checkOut = document.getElementById('check-out').value;
  const adultCount = parseInt(document.getElementById('adult-count').textContent);
  const childCount = parseInt(document.getElementById('child-count').textContent);
  const infantCount = parseInt(document.getElementById('infant-count').textContent);

  // City validation (must be Texas or California city)
  const validCities = [
    'Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth', 'El Paso',
    'Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento'
  ];
  if (!city) {
    showError('city', 'City is required.');
    isValid = false;
  } else if (!validCities.includes(city)) {
    showError('city', 'City must be a city in Texas or California.');
    isValid = false;
  }

  // Check-in date validation (Sep 1, 2024 to Dec 1, 2024)
  if (!checkIn) {
    showError('check-in', 'Check-in date is required.');
    isValid = false;
  } else {
    const checkInDate = new Date(checkIn);
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2024-12-01');
    if (checkInDate < minDate || checkInDate > maxDate) {
      showError('check-in', 'Check-in date must be between Sep 1, 2024 to Dec 1, 2024.');
      isValid = false;
    }
  }

  // Check-out date validation (Sep 1, 2024 to Dec 1, 2024)
  if (!checkOut) {
    showError('check-out', 'Check-out date is required.');
    isValid = false;
  } else {
    const checkOutDate = new Date(checkOut);
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2024-12-01');
    if (checkOutDate < minDate || checkOutDate > maxDate) {
      showError('check-out', 'Check-out date must be between Sep 1, 2024 to Dec 1, 2024.');
      isValid = false;
    } else if (checkIn && new Date(checkOut) <= new Date(checkIn)) {
      showError('check-out', 'Check-out date must be after check-in date.');
      isValid = false;
    }
  }

  // Guest validation (max 2 per room, except infants)
  // Adults + Children should not exceed 2 per room, but infants can stay with adults
  // The system will calculate how many rooms are needed
  const totalGuests = adultCount + childCount;
  // No validation error - the system will calculate rooms needed

  return isValid;
}

// Cars form validation with DOM methods
function validateCarsForm() {
  let isValid = true;
  clearAllErrors();

  const city = document.getElementById('car-city').value.trim();
  const carType = document.getElementById('car-type').value;
  const pickupDate = document.getElementById('car-pickup').value;
  const dropoffDate = document.getElementById('car-dropoff').value;

  // City validation (must be Texas or California city)
  const validCities = [
    'Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth', 'El Paso',
    'Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento'
  ];
  if (!city) {
    showError('car-city', 'City is required.');
    isValid = false;
  } else if (!validCities.includes(city)) {
    showError('car-city', 'City must be a city in Texas or California.');
    isValid = false;
  }

  // Car type validation (economy, SUV, Compact, midsize)
  const validCarTypes = ['economy', 'suv', 'compact', 'midsize'];
  if (!carType) {
    showError('car-type', 'Car type is required.');
    isValid = false;
  } else if (!validCarTypes.includes(carType)) {
    showError('car-type', 'Car type must be economy, SUV, Compact, or midsize.');
    isValid = false;
  }

  // Pickup date validation (Sep 1, 2024 to Dec 1, 2024)
  if (!pickupDate) {
    showError('car-pickup', 'Pick-up date is required.');
    isValid = false;
  } else {
    const pickupDateObj = new Date(pickupDate);
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2024-12-01');
    if (pickupDateObj < minDate || pickupDateObj > maxDate) {
      showError('car-pickup', 'Pick-up date must be between Sep 1, 2024 to Dec 1, 2024.');
      isValid = false;
    }
  }

  // Drop-off date validation (Sep 1, 2024 to Dec 1, 2024)
  if (!dropoffDate) {
    showError('car-dropoff', 'Drop-off date is required.');
    isValid = false;
  } else {
    const dropoffDateObj = new Date(dropoffDate);
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2024-12-01');
    if (dropoffDateObj < minDate || dropoffDateObj > maxDate) {
      showError('car-dropoff', 'Drop-off date must be between Sep 1, 2024 to Dec 1, 2024.');
      isValid = false;
    } else if (pickupDate && new Date(dropoffDate) <= new Date(pickupDate)) {
      showError('car-dropoff', 'Drop-off date must be after pick-up date.');
      isValid = false;
    }
  }

  return isValid;
}

// Cruises form validation with jQuery
function validateCruisesForm() {
  let isValid = true;
  clearAllErrors();

  const destination = $('#cruise-destination').val();
  const departureDate = $('#cruise-departure').val();
  const minDuration = parseInt($('#min-duration').val());
  const maxDuration = parseInt($('#max-duration').val());
  const adultCount = parseInt($('#cruise-adult-count').text());
  const childCount = parseInt($('#cruise-child-count').text());
  const infantCount = parseInt($('#cruise-infant-count').text());

  // Destination validation (Alaska, Bahamas, Europe, Mexico)
  const validDestinations = ['alaska', 'bahamas', 'europe', 'mexico'];
  if (!destination) {
    showError('cruise-destination', 'Destination is required.');
    isValid = false;
  } else if (!validDestinations.includes(destination)) {
    showError('cruise-destination', 'Destination should be Alaska, Bahamas, Europe, or Mexico.');
    isValid = false;
  }

  // Departure date validation (Sep 1, 2024 to Dec 1, 2024)
  if (!departureDate) {
    showError('cruise-departure', 'Departure date is required.');
    isValid = false;
  } else {
    const departureDateObj = new Date(departureDate);
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2024-12-01');
    if (departureDateObj < minDate || departureDateObj > maxDate) {
      showError('cruise-departure', 'Departure date must be between Sep 1, 2024 to Dec 1, 2024.');
      isValid = false;
    }
  }

  // Duration validation (minimum 3, maximum 10 days)
  if (minDuration < 3) {
    showError('min-duration', 'Minimum duration cannot be less than 3 days.');
    isValid = false;
  }
  if (maxDuration > 10) {
    showError('max-duration', 'Maximum duration cannot be greater than 10 days.');
    isValid = false;
  }
  if (minDuration > maxDuration) {
    showError('max-duration', 'Maximum duration must be greater than or equal to minimum duration.');
    isValid = false;
  }

  // Guest validation (max 2 per room, except infants)
  // Adults + Children should not exceed 2 per room, but infants can stay with adults
  // The system will calculate how many rooms are needed
  const totalGuests = adultCount + childCount;
  // No validation error - the system will calculate rooms needed

  return isValid;
}

// Book form validation
function validateBookForm() {
  let isValid = true;
  clearAllErrors();

  const bookingType = document.getElementById('booking-type').value;
  const firstName = document.getElementById('booking-first-name').value.trim();
  const lastName = document.getElementById('booking-last-name').value.trim();
  const email = document.getElementById('booking-email').value.trim();
  const phone = document.getElementById('booking-phone').value.trim();
  const terms = document.getElementById('booking-terms').checked;

  // Booking type validation
  if (!bookingType) {
    showError('booking-type', 'Booking type is required.');
    isValid = false;
  }

  // First name validation
  const firstNameRegex = /^[A-Z][a-zA-Z]*$/;
  if (!firstName) {
    showError('booking-first-name', 'First name is required.');
    isValid = false;
  } else if (!firstNameRegex.test(firstName)) {
    showError('booking-first-name', 'First name must start with a capital letter and contain only alphabetic characters.');
    isValid = false;
  }

  // Last name validation
  const lastNameRegex = /^[A-Z][a-zA-Z]*$/;
  if (!lastName) {
    showError('booking-last-name', 'Last name is required.');
    isValid = false;
  } else if (!lastNameRegex.test(lastName)) {
    showError('booking-last-name', 'Last name must start with a capital letter and contain only alphabetic characters.');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('booking-email', 'Email address is required.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('booking-email', 'Please enter a valid email address.');
    isValid = false;
  }

  // Phone validation
  const phoneRegex = /^\(\d{3}\)\d{3}-\d{4}$/;
  if (!phone) {
    showError('booking-phone', 'Phone number is required.');
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    showError('booking-phone', 'Phone number must be in the format (ddd)ddd-dddd.');
    isValid = false;
  }

  // Terms validation
  if (!terms) {
    showError('booking-terms', 'You must agree to the terms and conditions.');
    isValid = false;
  }

  return isValid;
}

// Utility functions
function showError(elementId, message) {
  hideError(elementId);
  const element = document.getElementById(elementId);
  if (element) {
    const errorElement = document.createElement('label');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.id = elementId + '-error';
    errorElement.style.display = 'block';
    element.parentNode.appendChild(errorElement);
    element.classList.add('error');
    
    // Special handling for radio groups
    if (elementId === 'gender-group') {
      const radioGroup = element;
      radioGroup.classList.add('error');
    }
  }
}

function hideError(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const errorElement = document.getElementById(elementId + '-error');
    if (errorElement) {
      errorElement.remove();
    }
    element.classList.remove('error');
    
    // Special handling for radio groups
    if (elementId === 'gender-group') {
      const radioGroup = element;
      radioGroup.classList.remove('error');
    }
  }
}

function clearAllErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => element.classList.remove('error'));
}

function showSuccess(message) {
  // Create success message element
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  successElement.textContent = message;
  successElement.style.cssText = 'padding: 1rem; background: #4caf50; color: white; border-radius: 4px; margin: 1rem 0;';
  
  // Try to find a form first, otherwise append to main content
  const form = document.querySelector('form');
  const mainContent = document.querySelector('.main-content');
  const targetElement = form || mainContent || document.body;
  
  if (targetElement) {
    targetElement.insertBefore(successElement, targetElement.firstChild);
    successElement.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      successElement.remove();
    }, 5000);
  } else {
    // Fallback to alert
    alert(message);
  }
}

function displayResults(formData, pageType) {
  const resultsContainer = document.getElementById(pageType + '-results');
  if (resultsContainer) {
    resultsContainer.style.display = 'block';
    const content = document.getElementById('results-content') || document.getElementById(pageType + '-results-content');
    
    if (content) {
      let html = '<div class="results-details">';
      for (let key in formData) {
        if (formData[key]) {
          html += `
            <div class="detail-item">
              <div class="detail-label">${key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
              <div class="detail-value">${formData[key]}</div>
            </div>
          `;
        }
      }
      html += '</div>';
      content.innerHTML = html;
    }
  }
}

// Format phone number as user types
function formatPhoneNumber(input) {
  let numbers = input.value.replace(/\D/g, '');
  if (numbers.length <= 3) {
    input.value = numbers;
  } else if (numbers.length <= 6) {
    input.value = '(' + numbers.substring(0, 3) + ')' + numbers.substring(3);
  } else {
    input.value = '(' + numbers.substring(0, 3) + ')' + numbers.substring(3, 6) + '-' + numbers.substring(6, 10);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize shared components
  new SharedComponents();
  
  // Update date and time
  updateDateTime();
  setInterval(updateDateTime, 1000);
  
  // Event delegation for dynamically injected buttons
  document.addEventListener('click', function(e) {
    if (e.target.id === 'font-increase') {
      changeFontSize(1);
    } else if (e.target.id === 'font-decrease') {
      changeFontSize(-1);
    } else if (e.target.id === 'color-toggle') {
      toggleBackgroundColor();
    }
  });

  // Initialize phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[id*="phone"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function () {
      formatPhoneNumber(this);
    });
  });

  // FORM SUBMISSION HANDLERS

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateContactForm()) {
        const formData = {
          'First Name': document.getElementById('first-name').value,
          'Last Name': document.getElementById('last-name').value,
          'Phone': document.getElementById('phone').value,
          'Email': document.getElementById('email').value,
          'Gender': document.querySelector('input[name="gender"]:checked').value,
          'Comment': document.getElementById('comment').value
        };
        
        // Save to JSON
        saveContactFormToJSON(formData);
        
        showSuccess('Thank you for your message! We will get back to you within 24 hours.');
        displayResults(formData, 'contact');
      }
    });
  }

  // Flight form submission
  const flightForm = document.getElementById('flight-form');
  if (flightForm) {
    flightForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateFlightForm()) {
        searchFlights();
      }
    });
  }

  // Stays form submission
  const staysForm = document.getElementById('stays-form');
  if (staysForm) {
    staysForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateStaysForm()) {
        searchHotels();
      }
    });
  }

  // Cars form submission
  const carsForm = document.getElementById('cars-form');
  if (carsForm) {
    carsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateCarsForm()) {
        searchCars();
      }
    });
  }

  // Cruises form submission (using jQuery)
  if (typeof $ !== 'undefined') {
    $(document).ready(function() {
      $('#cruises-form').on('submit', function(e) {
        e.preventDefault();
        if (validateCruisesForm()) {
          searchCruises();
        }
      });
    });
  }

  // Book form submission
  const bookForm = document.getElementById('booking-form');
  if (bookForm) {
    bookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateBookForm()) {
        const formData = {
          'Booking Type': document.getElementById('booking-type').value,
          'First Name': document.getElementById('booking-first-name').value,
          'Last Name': document.getElementById('booking-last-name').value,
          'Email': document.getElementById('booking-email').value,
          'Phone': document.getElementById('booking-phone').value,
          'Special Requests': document.getElementById('booking-special-requests').value || 'None'
        };
        
        const confirmationDiv = document.getElementById('booking-confirmation');
        if (confirmationDiv) {
          confirmationDiv.style.display = 'block';
          const content = document.getElementById('booking-confirmation-content');
          if (content) {
            let html = '<div class="results-details">';
            for (let key in formData) {
              html += `
                <div class="detail-item">
                  <div class="detail-label">${key}</div>
                  <div class="detail-value">${formData[key]}</div>
                </div>
              `;
            }
            html += '</div>';
            content.innerHTML = html;
          }
        }
        showSuccess('Booking confirmed successfully!');
      }
    });
  }

  // PASSENGER/GUEST SELECTION FUNCTIONALITY

  // Flight passenger selection
  const passengerToggle = document.getElementById('passenger-toggle');
  const passengerForm = document.getElementById('passenger-form');
  const passengerSummary = document.getElementById('passenger-summary');
  
  if (passengerToggle && passengerForm && passengerSummary) {
    passengerToggle.addEventListener('click', function() {
      passengerForm.style.display = passengerForm.style.display === 'none' ? 'block' : 'none';
    });

    // Passenger count controls
    ['adult', 'child', 'infant'].forEach(type => {
      const decreaseBtn = document.getElementById(`${type}-decrease`);
      const increaseBtn = document.getElementById(`${type}-increase`);
      const countDisplay = document.getElementById(`${type}-count`);

      if (decreaseBtn && increaseBtn && countDisplay) {
        decreaseBtn.addEventListener('click', function() {
          let count = parseInt(countDisplay.textContent);
          if (count > (type === 'adult' ? 1 : 0)) {
            countDisplay.textContent = count - 1;
            updatePassengerSummary();
          }
        });

        increaseBtn.addEventListener('click', function() {
          let count = parseInt(countDisplay.textContent);
          if (count < 4) {
            countDisplay.textContent = count + 1;
            updatePassengerSummary();
          }
        });
      }
    });

    const passengerDone = document.getElementById('passenger-done');
    if (passengerDone) {
      passengerDone.addEventListener('click', function() {
        passengerForm.style.display = 'none';
      });
    }
  }

  // Stays guest selection
  const guestsToggle = document.getElementById('guests-toggle');
  const guestsForm = document.getElementById('guests-form');
  const guestsSummary = document.getElementById('guests-summary');
  
  if (guestsToggle && guestsForm && guestsSummary) {
    guestsToggle.addEventListener('click', function() {
      guestsForm.style.display = guestsForm.style.display === 'none' ? 'block' : 'none';
    });

    // Guest count controls
    ['adult', 'child', 'infant'].forEach(type => {
      const decreaseBtn = document.getElementById(`${type}-decrease`);
      const increaseBtn = document.getElementById(`${type}-increase`);
      const countDisplay = document.getElementById(`${type}-count`);

      if (decreaseBtn && increaseBtn && countDisplay) {
        decreaseBtn.addEventListener('click', function() {
          let count = parseInt(countDisplay.textContent);
          if (count > (type === 'adult' ? 1 : 0)) {
            countDisplay.textContent = count - 1;
            updateGuestsSummary();
            updateRoomsInfo();
          }
        });

        increaseBtn.addEventListener('click', function() {
          let count = parseInt(countDisplay.textContent);
          if (count < 4) {
            countDisplay.textContent = count + 1;
            updateGuestsSummary();
            updateRoomsInfo();
          }
        });
      }
    });

    const guestsDone = document.getElementById('guests-done');
    if (guestsDone) {
      guestsDone.addEventListener('click', function() {
        guestsForm.style.display = 'none';
      });
    }
  }

  // Cruise guest selection
  if (typeof $ !== 'undefined') {
    $(document).ready(function() {
      $('#cruise-guests-toggle').on('click', function() {
        $('#cruise-guests-form').toggle();
      });

      $('.cruise-adult-decrease, .cruise-child-decrease, .cruise-infant-decrease').on('click', function() {
        const type = $(this).hasClass('cruise-adult-decrease') ? 'adult' : 
                    $(this).hasClass('cruise-child-decrease') ? 'child' : 'infant';
        const countDisplay = $(`#cruise-${type}-count`);
        let count = parseInt(countDisplay.text());
        if (count > (type === 'adult' ? 2 : 0)) {
          countDisplay.text(count - 1);
          updateCruiseGuestsSummary();
        }
      });

      $('.cruise-adult-increase, .cruise-child-increase, .cruise-infant-increase').on('click', function() {
        const type = $(this).hasClass('cruise-adult-increase') ? 'adult' : 
                    $(this).hasClass('cruise-child-increase') ? 'child' : 'infant';
        const countDisplay = $(`#cruise-${type}-count`);
        let count = parseInt(countDisplay.text());
        if (count < 4) {
          countDisplay.text(count + 1);
          updateCruiseGuestsSummary();
        }
      });

      $('#cruise-guests-done').on('click', function() {
        $('#cruise-guests-form').hide();
      });
    });
  }

  // TRIP TYPE FUNCTIONALITY
  const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');
  tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const returnDateGroup = document.getElementById('return-date-group');
      const bookingReturnDateGroup = document.getElementById('booking-return-date-group');
      
      if (this.value === 'round-trip') {
        if (returnDateGroup) returnDateGroup.style.display = 'block';
        if (bookingReturnDateGroup) bookingReturnDateGroup.style.display = 'block';
      } else {
        if (returnDateGroup) returnDateGroup.style.display = 'none';
        if (bookingReturnDateGroup) bookingReturnDateGroup.style.display = 'none';
      }
    });
  });

  // BOOKING TYPE FUNCTIONALITY
  const bookingTypeSelect = document.getElementById('booking-type');
  if (bookingTypeSelect) {
    bookingTypeSelect.addEventListener('change', function() {
      const flightSection = document.getElementById('flight-booking-section');
      if (this.value === 'flight') {
        flightSection.style.display = 'block';
      } else {
        flightSection.style.display = 'none';
      }
    });
  }

  // Helper functions
  function updatePassengerSummary() {
    const adultCountEl = document.getElementById('adult-count');
    const childCountEl = document.getElementById('child-count');
    const infantCountEl = document.getElementById('infant-count');
    
    // Only update if elements exist (not on cart page)
    if (!adultCountEl || !childCountEl || !infantCountEl) {
      return;
    }
    
    const adultCount = parseInt(adultCountEl.textContent);
    const childCount = parseInt(childCountEl.textContent);
    const infantCount = parseInt(infantCountEl.textContent);
    
    let summary = `${adultCount} Adult${adultCount !== 1 ? 's' : ''}`;
    if (childCount > 0) summary += `, ${childCount} Child${childCount !== 1 ? 'ren' : ''}`;
    if (infantCount > 0) summary += `, ${infantCount} Infant${infantCount !== 1 ? 's' : ''}`;
    
    if (passengerSummary) {
      passengerSummary.textContent = summary;
    }
  }

  function updateGuestsSummary() {
    const adultCountEl = document.getElementById('adult-count');
    const childCountEl = document.getElementById('child-count');
    const infantCountEl = document.getElementById('infant-count');
    
    // Only update if elements exist (not on cart page)
    if (!adultCountEl || !childCountEl || !infantCountEl) {
      return;
    }
    
    const adultCount = parseInt(adultCountEl.textContent);
    const childCount = parseInt(childCountEl.textContent);
    const infantCount = parseInt(infantCountEl.textContent);
    
    let summary = `${adultCount} Adult${adultCount !== 1 ? 's' : ''}`;
    if (childCount > 0) summary += `, ${childCount} Child${childCount !== 1 ? 'ren' : ''}`;
    if (infantCount > 0) summary += `, ${infantCount} Infant${infantCount !== 1 ? 's' : ''}`;
    
    if (guestsSummary) {
      guestsSummary.textContent = summary;
    }
  }

  function updateRoomsInfo() {
    const adultCountEl = document.getElementById('adult-count');
    const childCountEl = document.getElementById('child-count');
    
    // Only update if elements exist (not on cart page)
    if (!adultCountEl || !childCountEl) {
      return;
    }
    
    const adultCount = parseInt(adultCountEl.textContent);
    const childCount = parseInt(childCountEl.textContent);
    const totalGuests = adultCount + childCount;
    const roomsNeeded = Math.ceil(totalGuests / 2);
    
    const roomsInfo = document.getElementById('rooms-info');
    const roomsCount = document.getElementById('rooms-count');
    
    if (roomsInfo && roomsCount) {
      roomsCount.textContent = roomsNeeded;
      roomsInfo.style.display = totalGuests > 0 ? 'block' : 'none';
    }
  }

  function updateCruiseGuestsSummary() {
    if (typeof $ !== 'undefined') {
      const adultCount = parseInt($('#cruise-adult-count').text());
      const childCount = parseInt($('#cruise-child-count').text());
      const infantCount = parseInt($('#cruise-infant-count').text());
      
      let summary = `${adultCount} Adult${adultCount !== 1 ? 's' : ''}`;
      if (childCount > 0) summary += `, ${childCount} Child${childCount !== 1 ? 'ren' : ''}`;
      if (infantCount > 0) summary += `, ${infantCount} Infant${infantCount !== 1 ? 's' : ''}`;
      
      $('#cruise-guests-summary').text(summary);
    }
  }

  // Initialize summaries (only if elements exist on current page)
  // These functions now check for element existence before accessing
  updatePassengerSummary();
  updateGuestsSummary();
  updateRoomsInfo();
  if (typeof $ !== 'undefined') {
    $(document).ready(function() {
      updateCruiseGuestsSummary();
    });
  }
});

// FLIGHT SEARCH FUNCTIONS
async function searchFlights() {
  const tripType = document.querySelector('input[name="trip-type"]:checked').value;
  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const departureDate = document.getElementById('departure-date').value;
  const returnDate = document.getElementById('return-date').value;
  const adultCount = parseInt(document.getElementById('adult-count').textContent);
  const childCount = parseInt(document.getElementById('child-count').textContent);
  const infantCount = parseInt(document.getElementById('infant-count').textContent);
  const totalPassengers = adultCount + childCount + infantCount;

  try {
    // Load data (tries file first, falls back to embedded data)
    const flights = await loadFlightsData();
    const data = { flights: flights };
    
    if (tripType === 'one-way') {
      const outboundFlights = findFlights(data.flights, origin, destination, departureDate, totalPassengers);
      displayFlightResults(outboundFlights, 'outbound', origin, destination, departureDate, adultCount, childCount, infantCount);
    } else {
      const outboundFlights = findFlights(data.flights, origin, destination, departureDate, totalPassengers);
      const returnFlights = findFlights(data.flights, destination, origin, returnDate, totalPassengers);
      displayFlightResults(outboundFlights, 'outbound', origin, destination, departureDate, adultCount, childCount, infantCount);
      displayFlightResults(returnFlights, 'return', destination, origin, returnDate, adultCount, childCount, infantCount);
    }
    
    showSuccess('Flight search completed successfully!');
  } catch (error) {
    console.error('Error loading flights:', error);
    alert('Error loading flight data. Please try again.');
  }
}

function findFlights(flights, origin, destination, targetDate, totalPassengers) {
  const targetDateObj = new Date(targetDate);
  const results = [];
  
  // First, try to find flights on the exact date
  let exactMatches = flights.filter(f => 
    f.origin.toLowerCase() === origin.toLowerCase() && 
    f.destination.toLowerCase() === destination.toLowerCase() &&
    f.departureDate === targetDate &&
    f.availableSeats >= totalPassengers
  );
  
  // If no exact matches, expand to ±3 days
  if (exactMatches.length === 0) {
    for (let i = -3; i <= 3; i++) {
      const searchDate = new Date(targetDateObj);
      searchDate.setDate(searchDate.getDate() + i);
      const searchDateStr = searchDate.toISOString().split('T')[0];
      
      const matches = flights.filter(f =>
        f.origin.toLowerCase() === origin.toLowerCase() &&
        f.destination.toLowerCase() === destination.toLowerCase() &&
        f.departureDate === searchDateStr &&
        f.availableSeats >= totalPassengers
      );
      
      results.push(...matches);
    }
  } else {
    results.push(...exactMatches);
  }
  
  return results;
}

function displayFlightResults(flights, tripSegment, origin, destination, date, adultCount, childCount, infantCount) {
  const totalPassengers = adultCount + childCount + infantCount;
  const resultsContainer = document.getElementById('flight-results');
  const resultsContent = document.getElementById('results-content');
  
  if (!flights || flights.length === 0) {
    resultsContent.innerHTML = `<p style="text-align: center; padding: 2rem; color: var(--light-text);">
      No flights found for ${tripSegment} segment on ${date} (±3 days).
    </p>`;
    resultsContainer.style.display = 'block';
    return;
  }
  
  let html = `<div style="margin-bottom: 2rem;">
    <h4 style="color: var(--primary-color); margin-bottom: 1rem;">${tripSegment === 'outbound' ? 'Outbound' : 'Return'} Flights</h4>
    <div style="display: grid; gap: 1rem;">`;
  
  flights.forEach(flight => {
    const basePrice = flight.price * adultCount;
    const childPrice = flight.price * 0.7 * childCount;
    const infantPrice = flight.price * 0.1 * infantCount;
    const totalPrice = basePrice + childPrice + infantPrice;
    
    html += `
      <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1.5rem; background: var(--background-color);">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto; gap: 1rem; align-items: center;">
          <div>
            <strong>${flight.flightId}</strong>
          </div>
          <div>
            <div>${flight.departureTime}</div>
            <div style="font-size: 0.9rem; color: var(--light-text);">${flight.origin}</div>
          </div>
          <div>
            <div>${flight.arrivalTime}</div>
            <div style="font-size: 0.9rem; color: var(--light-text);">${flight.destination}</div>
          </div>
          <div style="font-size: 0.9rem; color: var(--light-text);">
            <div>Date: ${flight.departureDate}</div>
            <div>Seats: ${flight.availableSeats}</div>
          </div>
          <div style="font-size: 1.2rem; font-weight: bold; color: var(--secondary-color);">
            $${totalPrice.toFixed(2)}
          </div>
          <button onclick="addToCart('${flight.flightId}', '${flight.origin}', '${flight.destination}', '${flight.departureDate}', '${flight.arrivalDate}', '${flight.departureTime}', '${flight.arrivalTime}', ${totalPrice}, ${adultCount}, ${childCount}, ${infantCount}, '${tripSegment}', ${flight.availableSeats}, ${totalPassengers})" class="btn-small" ${flight.availableSeats < totalPassengers ? 'disabled' : ''} style="${flight.availableSeats < totalPassengers ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
            ${flight.availableSeats < totalPassengers ? 'Not Enough Seats' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `;
  });
  
  html += `</div></div>`;
  
  if (resultsContent.innerHTML) {
    resultsContent.innerHTML += html;
  } else {
    resultsContent.innerHTML = html;
  }
  resultsContainer.style.display = 'block';
}

// Cart functionality - Use global window.cart (no localStorage)
// Initialize cart from sessionStorage if available, otherwise empty array
if (!window.cart) {
  if (typeof sessionStorage !== 'undefined') {
    const cartData = sessionStorage.getItem('travelCart');
    if (cartData) {
      try {
        window.cart = JSON.parse(cartData);
      } catch (e) {
        console.error('Error parsing cart from sessionStorage:', e);
        window.cart = [];
      }
    } else {
      window.cart = [];
    }
  } else {
    window.cart = [];
  }
}

function addToCart(flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, totalPrice, adultCount, childCount, infantCount, tripSegment, availableSeats, totalPassengers) {
  // Validate availability
  if (!availableSeats || availableSeats === 0 || isNaN(availableSeats)) {
    alert('Sorry, this flight is not available.');
    return;
  }
  
  if (totalPassengers > availableSeats) {
    alert(`Sorry, only ${availableSeats} seat(s) available. You need ${totalPassengers} seat(s).`);
    return;
  }
  
  const cartItem = {
    type: 'flight',
    flightId,
    origin,
    destination,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    totalPrice,
    adultCount,
    childCount,
    infantCount,
    tripSegment
  };
  
  // Ensure cart is initialized
  if (!window.cart) {
    window.cart = [];
  }
  
    window.cart.push(cartItem);
    
    // Store cart in sessionStorage for navigation to cart page (required for cart to work across pages)
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('travelCart', JSON.stringify(window.cart));
    }
  
  showSuccess(`${tripSegment === 'outbound' ? 'Outbound' : 'Return'} flight added to cart!`);
  
  // Update cart indicator if it exists
  const cartIndicator = document.getElementById('cart-count');
  if (cartIndicator) {
    cartIndicator.textContent = window.cart.length;
  }
}

// Hotel search function
async function searchHotels() {
  const city = document.getElementById('city').value.trim();
  const checkIn = document.getElementById('check-in').value;
  const checkOut = document.getElementById('check-out').value;
  const adultCount = parseInt(document.getElementById('adult-count').textContent);
  const childCount = parseInt(document.getElementById('child-count').textContent);
  const infantCount = parseInt(document.getElementById('infant-count').textContent);
  
  try {
    // Load data (tries file first, falls back to embedded data)
    const hotelsXml = await loadHotelsData();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(hotelsXml, 'text/xml');
    const hotels = xmlDoc.getElementsByTagName('hotel');
    
    // Aggregate hotels by hotelId - show minimum available rooms across all dates in range
    const hotelMap = new Map();
    
    for (let i = 0; i < hotels.length; i++) {
      const hotel = hotels[i];
      const hotelCity = hotel.getElementsByTagName('city')[0].textContent;
      const hotelDate = hotel.getElementsByTagName('date')[0].textContent;
      
      if (hotelCity.toLowerCase() === city.toLowerCase() && 
          isDateInRange(hotelDate, checkIn, checkOut)) {
        const hotelId = hotel.getElementsByTagName('hotelId')[0].textContent;
        const roomsEl = hotel.getElementsByTagName('availableRooms')[0];
        const roomsText = roomsEl ? roomsEl.textContent.trim() : '';
        const roomsNum = Number.parseInt(roomsText, 10);
        const safeRooms = Number.isFinite(roomsNum) ? roomsNum : 0;

        const priceEl = hotel.getElementsByTagName('pricePerNight')[0];
        const priceText = priceEl ? priceEl.textContent.trim() : '';
        const priceNum = Number.parseFloat(priceText);
        const safePrice = Number.isFinite(priceNum) ? priceNum : 0;

        // Aggregate by hotel ID - keep minimum rooms and first price
        if (!hotelMap.has(hotelId)) {
          hotelMap.set(hotelId, {
            id: hotelId,
            name: hotel.getElementsByTagName('hotelName')[0].textContent,
            city: hotelCity,
            availableRooms: safeRooms,
            pricePerNight: safePrice
          });
        } else {
          // Update minimum available rooms
          const existing = hotelMap.get(hotelId);
          existing.availableRooms = Math.min(existing.availableRooms, safeRooms);
        }
      }
    }
    
    const availableHotels = Array.from(hotelMap.values());
    
    displayHotelResults(availableHotels, city, checkIn, checkOut, adultCount, childCount, infantCount);
    showSuccess('Hotel search completed successfully!');
  } catch (error) {
    console.error('Error loading hotels:', error);
    alert('Failed to load hotel data. Please try again.');
  }
}

function isDateInRange(hotelDate, checkIn, checkOut) {
  const hotel = new Date(hotelDate);
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  return hotel >= inDate && hotel <= outDate;
}

function displayHotelResults(hotels, city, checkIn, checkOut, adultCount, childCount, infantCount) {
  const resultsContainer = document.getElementById('stays-results');
  const resultsContent = document.getElementById('results-content');
  
  if (!hotels || hotels.length === 0) {
    resultsContent.innerHTML = '<p>No hotels available in this city.</p>';
    resultsContainer.style.display = 'block';
    return;
  }
  
  let html = '<div style="display: grid; gap: 1rem;">';
  
  hotels.forEach(hotel => {
    html += `
      <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1.5rem; background: var(--background-color);">
        <h4>${hotel.name}</h4>
        <div class="results-details">
          <div class="detail-item">
            <div class="detail-label">Hotel ID</div>
            <div class="detail-value">${hotel.id}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">City</div>
            <div class="detail-value">${hotel.city}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Check-in</div>
            <div class="detail-value">${checkIn}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Check-out</div>
            <div class="detail-value">${checkOut}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Price per night</div>
            <div class="detail-value" style="font-weight: bold; color: var(--secondary-color);">$${hotel.pricePerNight}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Available Rooms</div>
            <div class="detail-value">${hotel.availableRooms}</div>
          </div>
        </div>
        <button onclick="addHotelToCart('${String(hotel.id).replace(/'/g, "\\'")}', '${String(hotel.name).replace(/'/g, "\\'")}', '${String(hotel.city).replace(/'/g, "\\'")}', '${checkIn}', '${checkOut}', ${hotel.pricePerNight}, ${adultCount}, ${childCount}, ${infantCount}, ${hotel.availableRooms})" class="btn-small" style="margin-top: 1rem; ${hotel.availableRooms === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}" ${hotel.availableRooms === 0 ? 'disabled' : ''}>
          ${hotel.availableRooms === 0 ? 'Not Available' : 'Add to Cart'}
        </button>
      </div>
    `;
  });
  
  html += '</div>';
  resultsContent.innerHTML = html;
  resultsContainer.style.display = 'block';
}

function addHotelToCart(hotelId, hotelName, city, checkIn, checkOut, pricePerNight, adultCount, childCount, infantCount, availableRooms) {
  try {
    // Ensure cart is initialized
    if (!window.cart) {
      window.cart = [];
    }
    
    // Validate availability
    if (!availableRooms || availableRooms === 0 || isNaN(availableRooms)) {
      alert('Sorry, this hotel is not available.');
      return;
    }
    
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalGuests = adultCount + childCount;
    const roomsNeeded = Math.ceil(totalGuests / 2);
    
    if (roomsNeeded > availableRooms) {
      alert(`Sorry, only ${availableRooms} room(s) available. You need ${roomsNeeded} room(s).`);
      return;
    }
    
    const totalPrice = pricePerNight * nights * roomsNeeded;
    
    const cartItem = {
      type: 'hotel',
      hotelId: String(hotelId),
      hotelName: String(hotelName),
      city: String(city),
      checkIn: String(checkIn),
      checkOut: String(checkOut),
      pricePerNight: Number(pricePerNight),
      nights: Number(nights),
      roomsNeeded: Number(roomsNeeded),
      totalPrice: Number(totalPrice),
      adultCount: Number(adultCount),
      childCount: Number(childCount),
      infantCount: Number(infantCount)
    };
    
    window.cart.push(cartItem);
    
    // Store cart in sessionStorage for navigation to cart page (required for cart to work across pages)
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('travelCart', JSON.stringify(window.cart));
    }
    
    showSuccess('Hotel added to cart!');
    
    // Update cart indicator if it exists
    const cartIndicator = document.getElementById('cart-count');
    if (cartIndicator) {
      cartIndicator.textContent = window.cart.length;
    }
    
  } catch (error) {
    console.error('Error in addHotelToCart:', error);
    alert('Error adding hotel to cart: ' + error.message);
  }
}

// Car search function using DOM methods
async function searchCars() {
  const city = document.getElementById('car-city').value.trim();
  const carType = document.getElementById('car-type').value;
  const pickupDate = document.getElementById('car-pickup').value;
  const dropoffDate = document.getElementById('car-dropoff').value;
  
  try {
    // Load data (tries file first, falls back to embedded data)
    const carsXml = await loadCarsData();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(carsXml, 'text/xml');
    const cars = xmlDoc.getElementsByTagName('car');
    
    const availableCars = [];
    
    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      const carCity = car.getElementsByTagName('city')[0].textContent;
      const carCarType = car.getElementsByTagName('carType')[0].textContent;
      const checkInDate = car.getElementsByTagName('checkInDate')[0].textContent;
      const checkOutDate = car.getElementsByTagName('checkOutDate')[0].textContent;
      
      if (carCity.toLowerCase() === city.toLowerCase() && 
          carCarType.toLowerCase() === carType.toLowerCase() &&
          isDateRangeInRange(checkInDate, checkOutDate, pickupDate, dropoffDate)) {
        availableCars.push({
          id: car.getElementsByTagName('carId')[0].textContent,
          city: carCity,
          carType: carCarType,
          pricePerDay: parseFloat(car.getElementsByTagName('pricePerDay')[0].textContent)
        });
      }
    }
    
    displayCarResults(availableCars, city, carType, pickupDate, dropoffDate);
    showSuccess('Car search completed successfully!');
    
    // Also suggest cars based on previous bookings
    suggestCarsBasedOnBookings(city, pickupDate, dropoffDate);
  } catch (error) {
    console.error('Error loading cars:', error);
    alert('Failed to load car data. Please try again.');
  }
}

function isDateRangeInRange(carCheckIn, carCheckOut, userPickup, userDropoff) {
  const carIn = new Date(carCheckIn);
  const carOut = new Date(carCheckOut);
  const userIn = new Date(userPickup);
  const userOut = new Date(userDropoff);
  
  // Check if car's date range overlaps with user's desired dates
  return (carIn <= userOut && carOut >= userIn);
}

function displayCarResults(cars, city, carType, pickupDate, dropoffDate) {
  const resultsContainer = document.getElementById('cars-results');
  const resultsContent = document.getElementById('cars-results-content');
  const resultsSummary = document.getElementById('results-summary');
  
  if (!cars || cars.length === 0) {
    resultsContent.innerHTML = '<p>No cars available for your search criteria.</p>';
    resultsContainer.style.display = 'block';
    return;
  }
  
  const nights = Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
  
  if (resultsSummary) {
    resultsSummary.textContent = `Found ${cars.length} available cars in ${city}`;
  }
  
  // Use DOM methods to create car cards
  resultsContent.innerHTML = '';
  
  cars.forEach(car => {
    const totalPrice = car.pricePerDay * nights;
    
    // Create card div
    const card = document.createElement('div');
    card.style.cssText = 'border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1.5rem; background: var(--background-color); margin-bottom: 1rem;';
    
    // Create title
    const title = document.createElement('h4');
    title.textContent = `${car.carType.charAt(0).toUpperCase() + car.carType.slice(1)} Rental`;
    card.appendChild(title);
    
    // Create details container
    const details = document.createElement('div');
    details.className = 'results-details';
    
    // Add detail items using DOM methods
    const createDetailItem = (label, value) => {
      const item = document.createElement('div');
      item.className = 'detail-item';
      
      const detailLabel = document.createElement('div');
      detailLabel.className = 'detail-label';
      detailLabel.textContent = label;
      item.appendChild(detailLabel);
      
      const detailValue = document.createElement('div');
      detailValue.className = 'detail-value';
      detailValue.textContent = value;
      item.appendChild(detailValue);
      
      details.appendChild(item);
      return item;
    };
    
    createDetailItem('Car ID', car.id);
    createDetailItem('City', car.city);
    createDetailItem('Car Type', car.carType);
    createDetailItem('Pick-up Date', pickupDate);
    createDetailItem('Drop-off Date', dropoffDate);
    createDetailItem('Price per Day', `$${car.pricePerDay}`);
    createDetailItem('Total Price', `$${totalPrice.toFixed(2)}`);
    
    card.appendChild(details);
    
    // Create add to cart button (cars don't have availability issues, but add anyway)
    const addButton = document.createElement('button');
    addButton.className = 'btn-small';
    addButton.style.cssText = 'margin-top: 1rem;';
    addButton.textContent = 'Add to Cart';
    addButton.onclick = function() {
      addCarToCart(car.id, car.city, car.carType, pickupDate, dropoffDate, car.pricePerDay);
    };
    card.appendChild(addButton);
    
    resultsContent.appendChild(card);
  });
  
  resultsContainer.style.display = 'block';
}

function addCarToCart(carId, city, carType, pickupDate, dropoffDate, pricePerDay) {
  const nights = Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
  const totalPrice = pricePerDay * nights;
  
  const cartItem = {
    type: 'car',
    carId,
    city,
    carType,
    pickupDate,
    dropoffDate,
    pricePerDay,
    nights,
    totalPrice
  };
  
  // Ensure cart is initialized
  if (!window.cart) {
    window.cart = [];
  }
  
  window.cart.push(cartItem);
  showSuccess('Car added to cart!');
  
  // Update cart indicator if it exists
  const cartIndicator = document.getElementById('cart-count');
  if (cartIndicator) {
    cartIndicator.textContent = window.cart.length;
  }
  
  // Store cart in sessionStorage for navigation to cart page (required for cart to work across pages)
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('travelCart', JSON.stringify(window.cart));
  }
}

// Suggest cars based on previous bookings
// Load from booking files (car_bookings.xml and hotel_bookings.json)
async function suggestCarsBasedOnBookings(city, pickupDate, dropoffDate) {
  try {
    // Load car bookings from XML
    let previousCarBookings = [];
    try {
      const carBookingsResponse = await fetch('data/car_bookings.xml');
      if (carBookingsResponse.ok) {
        const carBookingsXml = await carBookingsResponse.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(carBookingsXml, 'text/xml');
        const bookings = xmlDoc.getElementsByTagName('booking');
        
        for (let i = 0; i < bookings.length; i++) {
          const booking = bookings[i];
          previousCarBookings.push({
            city: booking.getElementsByTagName('city')[0]?.textContent || '',
            carType: booking.getElementsByTagName('carType')[0]?.textContent || ''
          });
        }
      }
    } catch (e) {
      // Silently fail - no previous bookings
    }
    
    // Load hotel bookings from JSON
    let previousHotelBookings = [];
    try {
      const hotelBookingsResponse = await fetch('data/hotel_bookings.json');
      if (hotelBookingsResponse.ok) {
        const hotelBookingsData = await hotelBookingsResponse.json();
        if (Array.isArray(hotelBookingsData)) {
          previousHotelBookings = hotelBookingsData.map(booking => ({
            city: booking.city || ''
          }));
        } else if (hotelBookingsData.bookings && Array.isArray(hotelBookingsData.bookings)) {
          previousHotelBookings = hotelBookingsData.bookings.map(booking => ({
            city: booking.city || ''
          }));
        }
      }
    } catch (e) {
      // Silently fail - no previous bookings
    }
    
    // Check if user has previous bookings in this city
    const sameCityCarBookings = previousCarBookings.filter(booking => 
      booking.city && booking.city.toLowerCase() === city.toLowerCase()
    );
    const sameCityHotelBookings = previousHotelBookings.filter(booking => 
      booking.city && booking.city.toLowerCase() === city.toLowerCase()
    );
    
    if (sameCityCarBookings.length > 0 || sameCityHotelBookings.length > 0) {
      // Get preferred car types from previous bookings
      const preferredCarTypes = [...new Set(sameCityCarBookings.map(b => b.carType).filter(Boolean))];
      
      // Show suggestions based on previous preferences
      const suggestionsDiv = document.createElement('div');
      suggestionsDiv.id = 'car-suggestions';
      suggestionsDiv.style.cssText = 'margin-top: 2rem; padding: 1.5rem; background-color: #e3f2fd; border-radius: var(--border-radius); border-left: 4px solid #2196F3;';
      
      const title = document.createElement('h3');
      title.textContent = '💡 Recommended Cars Based on Your Booking History';
      title.style.cssText = 'margin-top: 0; color: #1976D2;';
      suggestionsDiv.appendChild(title);
      
      const text = document.createElement('p');
      text.textContent = `We noticed you've booked in ${city} before. Based on your preferences, we recommend these car types for your upcoming trip.`;
      text.style.cssText = 'margin-bottom: 1rem; color: var(--light-text);';
      suggestionsDiv.appendChild(text);
      
      // If we have preferred car types, show them
      if (preferredCarTypes.length > 0) {
        const typesList = document.createElement('div');
        typesList.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;';
        preferredCarTypes.forEach(carType => {
          const badge = document.createElement('span');
          badge.textContent = carType.charAt(0).toUpperCase() + carType.slice(1);
          badge.style.cssText = 'padding: 0.5rem 1rem; background-color: #2196F3; color: white; border-radius: 20px; font-size: 0.9rem;';
          typesList.appendChild(badge);
        });
        suggestionsDiv.appendChild(typesList);
      }
      
      const resultsContainer = document.getElementById('cars-results');
      if (resultsContainer) {
        resultsContainer.appendChild(suggestionsDiv);
      }
    }
  } catch (error) {
    console.error('Error loading booking history for suggestions:', error);
    // Silently fail - suggestions are optional
  }
}

// Save contact form to JSON
async function saveContactFormToJSON(formData) {
  try {
    // Save contact form data to JSON file via PHP
    const response = await fetch('php/save_contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: formData['First Name'],
        lastName: formData['Last Name'],
        phone: formData['Phone'],
        email: formData['Email'],
        gender: formData['Gender'],
        comment: formData['Comment']
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'Failed to save contact form');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving contact form:', error);
    // If PHP fails, show error - no localStorage fallback
    alert('Failed to submit contact form. Please try again.');
  }
}

// Note: updateAvailableSeats, updateAvailableRooms, updateAvailableCars are defined in cart.html
// They are only needed during the booking process, not in app.js

// Cruise search function using jQuery
function searchCruises() {
  if (typeof $ === 'undefined') {
    alert('jQuery is required for cruise search. Please reload the page.');
    return;
  }
  
  const destination = $('#cruise-destination').val();
  const departureDate = $('#cruise-departure').val();
  const minDuration = parseInt($('#min-duration').val());
  const maxDuration = parseInt($('#max-duration').val());
  const adultCount = parseInt($('#cruise-adult-count').text());
  const childCount = parseInt($('#cruise-child-count').text());
  const infantCount = parseInt($('#cruise-infant-count').text());
  
  // Mock cruise data for demonstration
  const availableCruises = [
    {
      cruiseId: 'CR001',
      destination: 'Alaska',
      shipName: 'Alaska Explorer',
      departureDate: departureDate,
      duration: minDuration,
      pricePerPerson: 899,
      description: '7-day Alaska cruise with glacier viewing'
    },
    {
      cruiseId: 'CR002',
      destination: 'Bahamas',
      shipName: 'Caribbean Paradise',
      departureDate: departureDate,
      duration: Math.min(maxDuration, 5),
      pricePerPerson: 599,
      description: '5-day Bahamas cruise with island hopping'
    },
    {
      cruiseId: 'CR003',
      destination: 'Europe',
      shipName: 'Mediterranean Star',
      departureDate: departureDate,
      duration: Math.min(maxDuration, 10),
      pricePerPerson: 1499,
      description: '10-day Mediterranean cruise'
    },
    {
      cruiseId: 'CR004',
      destination: 'Mexico',
      shipName: 'Mexican Riviera',
      departureDate: departureDate,
      duration: Math.min(maxDuration, 7),
      pricePerPerson: 799,
      description: '7-day Mexican Riviera cruise'
    }
  ].filter(cruise => 
    cruise.destination.toLowerCase() === destination.toLowerCase() &&
    cruise.duration >= minDuration &&
    cruise.duration <= maxDuration
  );
  
  displayCruiseResults(availableCruises, adultCount, childCount, infantCount);
  showSuccess('Cruise search completed successfully!');
}

function displayCruiseResults(cruises, adultCount, childCount, infantCount) {
  if (typeof $ === 'undefined') return;
  
  const resultsContainer = $('#cruises-results');
  const resultsContent = $('#cruises-results-content');
  
  if (!cruises || cruises.length === 0) {
    resultsContent.html('<p style="text-align: center; padding: 2rem; color: var(--light-text);">No cruises found for your criteria.</p>');
    resultsContainer.show();
    return;
  }
  
  let html = '<div style="display: grid; gap: 1rem;">';
  
  cruises.forEach(cruise => {
    const totalAdults = adultCount;
    const totalChildren = childCount;
    const totalInfants = infantCount;
    const basePrice = cruise.pricePerPerson * totalAdults;
    const childPrice = cruise.pricePerPerson * 0.7 * totalChildren;
    const infantPrice = cruise.pricePerPerson * 0.1 * totalInfants;
    const totalPrice = basePrice + childPrice + infantPrice;
    
    html += `
      <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1.5rem; background: var(--background-color);">
        <h4>${cruise.shipName}</h4>
        <div class="results-details">
          <div class="detail-item">
            <div class="detail-label">Cruise ID</div>
            <div class="detail-value">${cruise.cruiseId}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Destination</div>
            <div class="detail-value">${cruise.destination}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Departure Date</div>
            <div class="detail-value">${cruise.departureDate}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Duration</div>
            <div class="detail-value">${cruise.duration} days</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Price per Adult</div>
            <div class="detail-value">$${cruise.pricePerPerson}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Total Price</div>
            <div class="detail-value" style="font-weight: bold; color: var(--secondary-color);">$${totalPrice.toFixed(2)}</div>
          </div>
        </div>
        <p style="margin-top: 1rem; color: var(--light-text);">${cruise.description}</p>
        <button onclick="addCruiseToCart('${cruise.cruiseId}', '${cruise.shipName}', '${cruise.destination}', '${cruise.departureDate}', ${cruise.duration}, ${totalPrice}, ${adultCount}, ${childCount}, ${infantCount})" class="btn-small" style="margin-top: 1rem;">
          Add to Cart
        </button>
      </div>
    `;
  });
  
  html += '</div>';
  resultsContent.html(html);
  resultsContainer.show();
}

function addCruiseToCart(cruiseId, shipName, destination, departureDate, duration, totalPrice, adultCount, childCount, infantCount) {
  const cartItem = {
    type: 'cruise',
    cruiseId,
    shipName,
    destination,
    departureDate,
    duration,
    totalPrice,
    adultCount,
    childCount,
    infantCount
  };
  
  // Ensure cart is initialized
  if (!window.cart) {
    window.cart = [];
  }
  
  window.cart.push(cartItem);
  console.log('Cruise added to cart:', cartItem);
  showSuccess('Cruise added to cart!');
  
  // Update cart indicator if it exists
  const cartIndicator = document.getElementById('cart-count');
  if (cartIndicator) {
    cartIndicator.textContent = window.cart.length;
  }
  
  // Store cart in sessionStorage for navigation to cart page (required for cart to work across pages)
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('travelCart', JSON.stringify(window.cart));
  }
}

// Enhanced error handling
window.addEventListener('error', function (e) {
  console.error('Application error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function () {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
  }
});
