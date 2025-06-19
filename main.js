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

const dailyTips = [
  "أفضل الأعمال أدومها وإن قل.",
  "اقرأ بتدبر لتفهم المعاني.",
  "استمع لقارئ متقن يومياً.",
  "ابدأ بسورة صغيرة لتحقيق إنجاز سريع.",
  "راجع ما حفظته كل يوم."
];

const dailyChallenges = [
  "سورة الناس كاملة.",
  "أول 5 آيات من البقرة.",
  "آخر 3 آيات من الحشر.",
  "سورة الإخلاص 3 مرات.",
  "سورة الكوثر مع تفسيرها."
];

const list = document.getElementById('sura-list');
const progressText = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const dailyTip = document.getElementById('daily-tip');
const dailyChallenge = document.getElementById('daily-challenge');
const audioSource = document.getElementById('audio-source');
const player = document.getElementById('player');
const testSura = document.getElementById('test-sura');
const userInput = document.getElementById('user-input');
const checkResult = document.getElementById('check-result');

// Load Suras List
suras.forEach((sura, index) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${sura}</span>
    <button class="unmarked" onclick="toggleMark(${index})" id="btn-${index}">❌</button>
    <button onclick="playSura(${index})">▶️</button>
  `;
  list.appendChild(li);

  // Add to test select
  const option = document.createElement('option');
  option.value = index;
  option.textContent = sura;
  testSura.appendChild(option);
});

// Toggle mark
function toggleMark(index) {
  const btn = document.getElementById(`btn-${index}`);
  const marked = localStorage.getItem(`sura-${index}`) === '1';

  if (marked) {
    localStorage.setItem(`sura-${index}`, '0');
    btn.classList.remove('marked');
    btn.classList.add('unmarked');
    btn.textContent = '❌';
  } else {
    localStorage.setItem(`sura-${index}`, '1');
    btn.classList.remove('unmarked');
    btn.classList.add('marked');
    btn.textContent = '✅';
  }
  updateProgress();
}

// Update progress
function updateProgress() {
  let marked = 0;
  suras.forEach((_, index) => {
    if (localStorage.getItem(`sura-${index}`) === '1') marked++;
  });
  const percent = Math.floor((marked / suras.length) * 100);
  progressText.textContent = percent;
  progressBar.value = percent;
}

// Play Sura audio from Sheikh Al-Husary
function playSura(index) {
  const suraNum = (suras.length - index).toString().padStart(3, '0');
  audioSource.src = `https://server10.mp3quran.net/husr/${suraNum}.mp3`;
  player.load();
  player.play();
}

// Daily Tip & Challenge
dailyTip.textContent = dailyTips[Math.floor(Math.random() * dailyTips.length)];
dailyChallenge.textContent = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];

function markDailyChallenge() {
  alert('أحسنت! تم حفظ تحدي اليوم ✅');
}

// Testing user on first Ayah (simple dummy)
function checkAyah() {
  const correct = 'بسم الله الرحمن الرحيم';
  if(userInput.value.trim() === correct){
    checkResult.textContent = '✅ صحيح!';
  } else {
    checkResult.textContent = '❌ خطأ! الصحيح: ' + correct;
  }
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Load marks
window.onload = () => {
  suras.forEach((_, index) => {
    const btn = document.getElementById(`btn-${index}`);
    const marked = localStorage.getItem(`sura-${index}`) === '1';
    if (marked) {
      btn.classList.remove('unmarked');
      btn.classList.add('marked');
      btn.textContent = '✅';
    }
  });
  updateProgress();
}
