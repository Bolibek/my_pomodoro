# Qo'llanmaga xush kelibsiz!

README.md fayli sizga loyihani bajarishingizda qo'llanma sifatida xizmat qiladi. Quyidagi berilgan ketma ketlikni bajaring:

1. Ushbu reponi fork qilasiz, va fork qilingan reponi o'zingizning local kompyuteringizga clone qilib olasiz.
2. Loyihani local'da ochib `npm install` buyrug'ini terminalga yozasiz.
3. Kerakli paketlarni o'rnatib olgandan so'ng,
   `git remote add upstream https://github.com/umarmuhandis/pomodoro` 
   buyrug'ini copy/paste qilasiz
4. Umumiy pomodoro metodi qanday ishlashini o'rganish uchun quyidagi web ilovani ishlatib ko'rishingiz mumkun: [pomofocus.io](https://pomofocus.io/)

## Tavsiya etiladigan extensionlarni o'rnatib olish

`.vscode\extensions.json` - ushbu file'da barcha kerakli bo'lgan, ishimizni osonlashtiradigan extensionlar ro'yhati berib o'tilgan. Har bitta extensionni install qilib olishingiz kerak bo'ladi. Install qilish uchun berilgan extensionning ID'isi maxsus extensionlar bo'limidan izlayasiz va **install** tugmasi bosasiz.

## Bosqichlar

Loyiha ustida qiynalmasdan ishlashingiz uchun uni ikkita qisimga bo'lib chiqdim. Har bir vazifa uchun alohida branch ochasiz (_vazifa-raqam-tavsifi_) ko'rinishida bo'lishi kerak. Misol uchun birinchi vazifa ustida ishlashni boshlayotgan bo'lsangiz quyidagicha ko'rinishda yangi branch ochasiz: `git checkout -b vazifa-1-verstka` Har bitta vazifani tugatganingizdan so'ng **PR raise** qilgan holda mendan **code review** request qilasiz.

⚠️ Hech bir PR'ni mendan **approval** olmasdan asosiy branch'ga merge qilib yubormang. Approval olganingizdan so'nggina merge qilsangiz bo'ladi. Ogohlik barchamizning burchimizdur, ogoh bo'ling!

Ureeee, endi hamma narsa tayyor. Qo'llarni shimarib, coffee'ni damlab olib ☕, kod yozishga kirishsak ham bo'ladi 👩‍💻, barchaga omad ✊

- [1-bosqich: UI design](src/instructions/1-bosqich.md) (~4 kun)
- [2-bosqich: JavaScript logic](src/instructions/2-bosqich.md) (~10 kun)

## Bonus 🎉

Ushbu bo'limda yuqoridagi berilgan vazifalarni muddatidan avval tugatgan dasturchilar uchun bonus vazifalar berilgan:

- Qizil shakldagi aylanani bajarish ya'ni timer kamaygani sayin qizil shakl ham qisqarib borishi kerak. Bu o'rinda sizga quyidagi maqola foydali bo'ladi: https://css-tricks.com/building-progress-ring-quickly/
- Desktop designni Tailwind CSS yordamida mobilga moslashtirsh (a.k.a mobile responsive design)

## Albatta o'qing ❗️

Loyiha design'ini hech kim bilan ulashish mumkun emas. Design mualliflik huquqiga ega. Design frontendmentor saytidan sotib olingan: [Link](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G)
