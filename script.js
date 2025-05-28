// Stylish Alert Function
function showCustomAlert(title, message) {
  const overlay = document.createElement("div");
  overlay.className = "alert-overlay";

  const alertContainer = document.createElement("div");
  alertContainer.className = "alert-container";

  const alertTitle = document.createElement("h3");
  alertTitle.className = "alert-title";
  alertTitle.textContent = title;

  const alertContent = document.createElement("div");
  alertContent.className = "alert-content";

  // Split message by newlines and create paragraphs
  const lines = message.split("\n");
  lines.forEach((line) => {
    if (line.trim()) {
      const p = document.createElement("p");
      p.textContent = line;
      alertContent.appendChild(p);
    }
  });

  const alertButton = document.createElement("button");
  alertButton.className = "alert-button";
  alertButton.textContent = "OK";
  alertButton.addEventListener("click", () => {
    overlay.classList.remove("active");
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        // Pastikan overlay masih ada sebelum dihapus
        document.body.removeChild(overlay);
      }
    }, 400);
  });

  alertContainer.appendChild(alertTitle);
  alertContainer.appendChild(alertContent);
  alertContainer.appendChild(alertButton);
  overlay.appendChild(alertContainer);
  document.body.appendChild(overlay);

  // Trigger animation
  setTimeout(() => {
    overlay.classList.add("active");
  }, 10);

  // Close on ESC key
  function handleEsc(e) {
    // Definisikan handleEsc di dalam scope showCustomAlert atau di luar jika ingin reusability lebih
    if (e.key === "Escape") {
      overlay.classList.remove("active");
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          // Pastikan overlay masih ada sebelum dihapus
          document.body.removeChild(overlay);
        }
      }, 400);
      document.removeEventListener("keydown", handleEsc); // Hapus event listener setelah dieksekusi
    }
  }
  document.addEventListener("keydown", handleEsc);
}

// Modified kirimData function to use the custom alert
function kirimData() {
  // Mengambil data dari form dasar
  var name = document.getElementById("nama").value;
  var nim = document.getElementById("nim").value;

  var peminatanRadio = document.querySelector(
    "input[name='peminatan']:checked"
  );
  var peminatan = peminatanRadio ? peminatanRadio.value : "Belum dipilih";

  var alamat = document.getElementById("alamat").value;

  // Mengambil data dari select dropdown
  var semesterSelect = document.getElementById("semester");
  var semesterValue = semesterSelect.value;
  var semesterText = "";
  if (semesterValue && semesterSelect.selectedIndex >= 0) {
    semesterText = semesterSelect.options[semesterSelect.selectedIndex].text;
  }
  var tampilSemester = semesterValue ? semesterText : "Semester belum dipilih";

  // Mengambil data dari input tanggal
  var tanggalLahirInput = document.getElementById("tanggal_lahir");
  var tanggalLahirValue = tanggalLahirInput.value;
  var tampilTanggalLahir;

  if (tanggalLahirValue) {
    const dateObject = new Date(tanggalLahirValue);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    };
    tampilTanggalLahir = dateObject.toLocaleDateString("id-ID", options);
  } else {
    tampilTanggalLahir = "Tanggal lahir belum diisi";
  }

  // Validasi
  if (
    !name ||
    !nim ||
    !alamat ||
    !semesterValue ||
    !tanggalLahirValue ||
    peminatan === "Belum dipilih"
  ) {
    showCustomAlert(
      "Form Tidak Lengkap",
      "Harap lengkapi semua field yang wajib diisi!\n\nPastikan Anda telah mengisi:\n- Nama\n- NIM\n- Peminatan\n- Semester\n- Tanggal Lahir\n- Alamat"
    );
    return;
  }

  // Menampilkan data dalam alert custom
  showCustomAlert(
    "Formulir Terkirim",
    `Nama: ${name}\nNIM: ${nim}\nPeminatan: ${peminatan}\nSemester: ${tampilSemester}\nTanggal Lahir: ${tampilTanggalLahir}\nAlamat: ${alamat}`
  );

  // Opsional: Mengosongkan form setelah alert
  document.getElementById("pendaftaranForm").reset();
}

// Updated NIM validation to use the custom alert
function validateNIMInput(element) {
  let originalValue = element.value;
  let sanitizedValue = originalValue.replace(/[^0-9]/g, "");

  if (originalValue !== sanitizedValue) {
    showCustomAlert("Format NIM Salah", "NIM hanya boleh diisi dengan angka!");
  }
  // Selalu setel nilai ke yang sudah dibersihkan, meskipun tidak ada perubahan,
  // untuk menangani kasus pengguna menyalin dan menempelkan teks dengan karakter non-numerik.
  element.value = sanitizedValue;
}

// Fungsi untuk membuat partikel latar belakang
const particles = []; // Pindahkan deklarasi array particles ke scope global jika createParticles akan dipanggil beberapa kali
// atau jika partikel perlu diakses dari fungsi lain. Jika tidak, bisa di dalam fungsi.

function createParticles() {
  // Jika ingin membersihkan partikel lama sebelum membuat yang baru (misalnya jika fungsi ini dipanggil ulang)
  // particles.forEach(p => p.remove());
  // particles.length = 0; // Kosongkan array

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle); // Tambahkan partikel ke body

    const size = Math.random() * 10 + 5;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.opacity = Math.random() * 0.3 + 0.1; // Opasitas lebih rendah agar tidak terlalu mengganggu
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    particles.push(particle);
  }
}

// Panggil createParticles setelah DOM selesai dimuat
document.addEventListener("DOMContentLoaded", createParticles);
