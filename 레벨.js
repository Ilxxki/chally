
let currentLevel = 1;
let currentPoints = 0;
const pointsToLevelUp = 100;
const attendancePoints = 1;
const questPoints = 3;
const quests = ['물마시기', '스트레칭하기'];
let currentQuest = '';
let lastQuestTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    const lastAttendance = localStorage.getItem('lastAttendance');
    if (!lastAttendance || isNewDay(new Date(lastAttendance))) {
        setTimeout(() => {
            openPopup('attendance-popup');
        }, 2000);
    }
});

function isNewDay(lastDate) {
    const today = new Date();
    const lastAttendanceDate = new Date(lastDate);
    return today.getFullYear() !== lastAttendanceDate.getFullYear() ||
           today.getMonth() !== lastAttendanceDate.getMonth() ||
           today.getDate() !== lastAttendanceDate.getDate();
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function confirmAttendance() {
    currentPoints += attendancePoints;
    localStorage.setItem('lastAttendance', new Date().toISOString());
    updateDisplay();
    closePopup('attendance-popup');
}

function openQuestPopup() {
    if (Date.now() - lastQuestTime < 3600000) {
        alert('퀘스트는 1시간에 하나만 완료할 수 있습니다.');
        return;
    }
    currentQuest = quests[Math.floor(Math.random() * quests.length)];
    document.getElementById('quest-text').textContent = currentQuest + ' 퀘스트를 완료하세요.';
    openPopup('quest-popup');
}

function completeQuest() {
    currentPoints += questPoints;
    lastQuestTime = Date.now();
    if (currentPoints >= pointsToLevelUp) {
        currentLevel++;
        currentPoints -= pointsToLevelUp; // 포인트 초기화 및 남은 포인트 유지
    }
    updateDisplay();
    closePopup('quest-popup');
}

function updateDisplay() {
    document.getElementById('level').textContent = currentLevel;
    document.getElementById('points').textContent = currentPoints;
    const progressBarInner = document.getElementById('progress-bar-inner');
    progressBarInner.style.width = (currentPoints / pointsToLevelUp) * 100 + '%';
    
    const percentage = Math.floor((currentPoints / pointsToLevelUp) * 100);
    document.getElementById('percentage-text').textContent = percentage + '%';

    const circleProgress = document.querySelector('.circle-progress');
    const radius = circleProgress.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (currentPoints / pointsToLevelUp) * circumference;
    circleProgress.style.strokeDashoffset = offset;
    document.getElementById('level-text').textContent = currentLevel;
}
function showContent(contentId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(contentId).style.display = 'block';
  }
  
