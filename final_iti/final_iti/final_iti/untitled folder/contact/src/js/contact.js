  // Car image mapping
  const carImages = {
    'default': './src/images/cars/22124bcfd303fe6ed4c56d7e9052d896.png',
    'mercedes-sedan':'./src/images/cars/sedan.png',
    'mercedes-suv': './src/images/cars/suv.png',
    'mercedes-premium': './src/images/cars/mer-premium.png',
    'porsche-premium': './src/images/cars/porche-premium.png',
    'toyota-crossover': './src/images/cars/toyota-crossover.png',
    'mercedes-van': './src/images/cars/mercedes-van.png',
    'toyota-sedan': './src/images/cars/toyota-sedan.png',
    'maybach-premium': './src/images/cars/maybach-transparent.png'
  };

  const carTypeSelect = document.getElementById('carTypeInput');
  
  const carImageElement = document.getElementById('carImage');
  
  carTypeSelect.addEventListener('change', function() {
    const selectedCar = this.value;
    const imageUrl = carImages[selectedCar] || carImages['default'];
    
    carImageElement.style.backgroundImage = `url('${imageUrl}')`;
    
    // Optional: Add a small animation effect
    carImageElement.style.opacity = '0.7';
    setTimeout(() => {
      carImageElement.style.opacity = '1';
    }, 300);
  });

  // Notification function
  function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notificationContainer');
    
    // Create notification element
    const notification = document.createElement('div');
    
    // Set notification styles based on type
    let bgColor, textColor, icon;
    switch(type) {
      case 'success':
        bgColor = 'bg-green-500';
        textColor = 'text-white';
        break;
      case 'error':
        bgColor = 'bg-red-500';
        textColor = 'text-white';
        break;
      case 'warning':
        bgColor = 'bg-yellow-500';
        textColor = 'text-white';
        break;
      default:
        bgColor = 'bg-blue-500';
        textColor = 'text-white';
    }
    
    // Set notification classes and content
    notification.className = `${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center transform transition-all duration-500 translate-x-full`;
    notification.innerHTML = `${message}`;
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        notificationContainer.removeChild(notification);
      }, 500);
    }, 5000);
  }

  // Book Now button functionality
  document.getElementById('bookNowBtn').addEventListener('click', function() {
    const carType = document.getElementById('carTypeInput').value;
    const rentalPlace = document.getElementById('rentalPlace').value;
    const returnPlace = document.getElementById('returnPlace').value;
    const rentalDate = document.getElementById('rentalDate').value;
    const returnDate = document.getElementById('returnDate').value;
    
    if (!carType || carType === 'default') {
      showNotification('Please select a car type', 'error');
      return;
    }
    
    if (!rentalPlace || rentalPlace === 'Place of rental') {
      showNotification('Please select a rental place', 'error');
      return;
    }
    
    if (!returnPlace || returnPlace === 'Place of return') {
      showNotification('Please select a return place', 'error');
      return;
    }
    
    if (!rentalDate) {
      showNotification('Please select a rental date', 'error');
      return;
    }
    
    if (!returnDate) {
      showNotification('Please select a return date', 'error');
      return;
    }
    
    // Check if return date is after rental date
    if (new Date(returnDate) <= new Date(rentalDate)) {
      showNotification('Return date must be after rental date', 'error');
      return;
    }
    
    // If all validations pass, show success message
    showNotification('Booking successful! Your car has been reserved.', 'success');
    
    // Reset form after successful booking
    setTimeout(() => {
      document.getElementById('carTypeInput').value = 'default';
      document.getElementById('rentalPlace').value = 'Place of rental';
      document.getElementById('returnPlace').value = 'Place of return';
      document.getElementById('rentalDate').value = '';
      document.getElementById('returnDate').value = '';
      carImageElement.style.backgroundImage = `url('${carImages['default']}')`;
    }, 2000);
  });
 