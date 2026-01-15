document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
    startGallery();
    startBooking();
    startCards();
    startScrollButton();
});
function startGallery() {
    const bigImage = document.querySelector('.hero-media img');
    const smallImages = document.querySelectorAll('.car-photo img');
    
    if (bigImage && smallImages.length > 0) {
        smallImages.forEach(img => {
            img.addEventListener('click', function() {
                bigImage.src = this.src;
                
                // Simple effect
                bigImage.style.opacity = '0.5';
                setTimeout(() => {
                    bigImage.style.opacity = '1';
                }, 200);
            });
        });
    }
}
function startBooking() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const carName = document.getElementById('car-title')?.textContent || 'Car';
            const price = document.querySelector('.price h2')?.textContent || '$25';
            
            showBookingForm(carName, price);
        });
    });
}
function showBookingForm(carName, price) {
    const formHTML = `
        <div class="booking-overlay" id="bookingOverlay">
            <div class="booking-form">
                <h3>Book ${carName}</h3>
                <p>Price: ${price}/day</p>
                
                <form id="bookForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <input type="date" required>
                    <input type="date" required>
                    <button type="submit">Book Now</button>
                </form>
                
                <button onclick="closeForm()" class="close-button">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    addFormStyles();
    
    const form = document.getElementById('bookForm');
    form.addEventListener('submit', handleForm);
}
function addFormStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .booking-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .booking-form {
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            text-align: center;
        }
        
        .booking-form h3 {
            color: #333;
            margin-bottom: 15px;
        }
        
        .booking-form input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        
        .booking-form button {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 5px;
            font-size: 16px;
        }
        
        .booking-form button:hover {
            background: #0056b3;
        }
        
        .close-button {
            background: #dc3545 !important;
        }
        
        .close-button:hover {
            background: #c82333 !important;
        }
    `;
    document.head.appendChild(style);
}
function handleForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const date1 = form.querySelectorAll('input[type="date"]')[0].value;
    const date2 = form.querySelectorAll('input[type="date"]')[1].value;
    
    if (!name || !email || !date1 || !date2) {
        alert('Please fill all fields!');
        return;
    }
    
    const formBox = document.querySelector('.booking-form');
    formBox.innerHTML = `
        <h3>Success! 🎉</h3>
        <p>Thank you ${name}!</p>
        <p>Email: ${email}</p>
        <p>Dates: ${date1} to ${date2}</p>
        <button onclick="closeForm()" class="close-button">Close</button>
    `;
}
function closeForm() {
    const overlay = document.getElementById('bookingOverlay');
    if (overlay) {
        overlay.remove();
    }
}
function startCards() {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        const viewBtn = card.querySelector('.btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const carName = card.querySelector('h4').textContent;
                alert(`You selected ${carName}!`);
            });
        }
    });
}
function startScrollButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-btn';
    scrollBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(scrollBtn);
    const style = document.createElement('style');
    style.textContent = `
        .scroll-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .scroll-btn:hover {
            background: #0056b3;
        }
    `;
    document.head.appendChild(style);
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.hero-media img');
    if (mainImage) {
        let clickCount = 0;
        mainImage.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 3) {
                alert('You really like this car! 🚗');
                clickCount = 0;
            }
        });
    }
    const price = document.querySelector('.price h2');
    if (price) {
        price.addEventListener('click', function() {
            this.style.color = '#28a745';
            setTimeout(() => {
                this.style.color = '';
            }, 1000);
        });
    }
    const items = document.querySelectorAll('.equipment-list li');
    items.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = '#e3f2fd';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 500);
        });
    });
});

console.log('Simple JavaScript loaded! 🚗');