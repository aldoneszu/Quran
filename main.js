const suras = [
  "الناس","الفلق","الإخلاص","المسد","النصر","الكافرون","الكوثر","الماعون","قريش","الفيل",
  "الهمزة","العصر","التكاثر","القارعة","العاديات","الزلزلة","البينة","القدر","العلق","التين",
  "الشرح","الضحى","الليل","الشمس","البلد","الفجر","الغاشية","الأعلى","الطارق","البروج",
  "الانشقاق","المطففين","الانفطار","التكوير","عبس","النازعات","النبأ","المرسلات","الإنسان","القيامة",
  "المدثر","المزمل","الجن","نوح","المعارج","الحاقة","القلم","الملك","التحريم","الطلاق",
  "التغابن","المنافقون","الجمعة","الصف","المجادلة","الحديد","الواقعة","الرحمن","القمر","النجم",
  "الطور","الذاريات","ق","الحجرات","الفتح","محمد","الأحقاف","الجاثية","الدخان","الزخرف",
  "الشورى","فصلت","غافر","الزمر","ص","الصافات","يس","فاطر","سبأ","الأحزاب",
  "السجدة","لقمان","الروم","العنكبوت","القصص","النمل","الشعراء","الفرقان","النور","المؤمنون",
  "الحج","الأنبياء","طه","مريم","الكهف","الإسراء","النحل","الحجر","إبراهيم","الرعد",
  "يوسف","هود","يونس","التوبة","الأنفال","الأعراف","الأنعام","المائدة","النساء","آل عمران",
  "البقرة","الفاتحة"
];

const list = document.getElementById("sura-list");

suras.forEach((sura, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${sura}</span>
    <button class="unmarked" onclick="toggleMark(${index})" id="btn-${index}">❌</button>
  `;
  list.appendChild(li);
});

function toggleMark(index) {
  const btn = document.getElementById(`btn-${index}`);
  const marked = localStorage.getItem(`sura-${index}`) === "1";

  if (marked) {
    localStorage.setItem(`sura-${index}`, "0");
    btn.classList.remove("marked");
    btn.classList.add("unmarked");
    btn.textContent = "❌";
  } else {
    localStorage.setItem(`sura-${index}`, "1");
    btn.classList.remove("unmarked");
    btn.classList.add("marked");
    btn.textContent = "✅";
  }
}

// عند تحميل الصفحة، استرجع الحفظ من localStorage
window.onload = () => {
  suras.forEach((_, index) => {
    const btn = document.getElementById(`btn-${index}`);
    const marked = localStorage.getItem(`sura-${index}`) === "1";
    if (marked) {
      btn.classList.remove("unmarked");
      btn.classList.add("marked");
      btn.textContent = "✅";
    }
  });
};
