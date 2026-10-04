document.addEventListener("DOMContentLoaded", () => {
  const updatesData = [
    {
      id: 1,
      category: "feature",
      badgeText: "Fitur Baru",
      date: "4 Oktober 2026",
      title: "Dukungan Mode Gelap (Dark Mode) Resmi Dirilis!",
      content: "Sekarang kamu dapat mengubah tampilan forum ke Mode Gelap melalui tombol di sidebar kiri untuk kenyamanan membaca di malam hari."
    },
    {
      id: 2,
      category: "improvement",
      badgeText: "Peningkatan",
      date: "28 September 2026",
      title: "Optimasi Pencarian & Respons Pemuatan Diskusi",
      content: "Kami telah mengoptimalkan kecepatan pencarian topik dan komentar sehingga respons halaman kini 50% lebih cepat."
    },
    {
      id: 3,
      category: "bugfix",
      badgeText: "Perbaikan Bug",
      date: "15 September 2026",
      title: "Perbaikan Jumlah Suka & Sinkronisasi Komentar",
      content: "Memperbaiki masalah teknis di mana jumlah suka (like) dan jumlah komentar tidak terbarui secara otomatis pada utas panjang."
    }
  ];

  const updatesFeed = document.getElementById("updatesFeed");
  const tabButtons = document.querySelectorAll(".tab-btn");

  function renderUpdates(filter = "all") {
    if (!updatesFeed) return;
    updatesFeed.innerHTML = "";

    const filteredData = filter === "all" 
      ? updatesData 
      : updatesData.filter(item => item.category === filter);

    if (filteredData.length === 0) {
      updatesFeed.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">Tidak ada pembaruan untuk kategori ini.</p>`;
      return;
    }

    filteredData.forEach(item => {
      const card = document.createElement("article");
      card.className = "update-card";

      card.innerHTML = `
        <div class="update-card-header">
          <span class="badge-tag ${item.category}">${item.badgeText}</span>
          <span class="update-date">${item.date}</span>
        </div>
        <h3 class="update-title">${item.title}</h3>
        <p class="update-body">${item.content}</p>
      `;

      updatesFeed.appendChild(card);
    });
  }

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-category");
      renderUpdates(category);
    });
  });

  renderUpdates("all");
});