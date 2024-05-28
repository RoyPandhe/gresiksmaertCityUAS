document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var imageFile = document.getElementById('image').files[0];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var reader = new FileReader();
            reader.onload = function(e) {
                var imageUrl = e.target.result;

                var reportItem = document.createElement('div');
                reportItem.className = 'report-item';
                reportItem.innerHTML = `
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Kategori:</strong> ${category}</p>
                    <p><strong>Lokasi:</strong> Latitude ${latitude}, Longitude ${longitude}</p>
                    <p><strong>Gambar:</strong></p>
                    <img src="${imageUrl}" alt="Laporan Gambar">
                `;

                document.getElementById('reportList').appendChild(reportItem);
                document.getElementById('reportForm').reset();
            };
            reader.readAsDataURL(imageFile);
        }, function(error) {
            alert('Error mendapatkan lokasi: ' + error.message);
        });
    } else {
        alert('Geolocation tidak didukung oleh browser ini.');
    }
});
