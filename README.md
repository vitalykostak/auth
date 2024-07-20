## Start

- node - v20.12.2
- npm install
- npm run dev

## Архітектура

- Даний проект слідує архітектурній методології [Feature-Sliced Design](https://feature-sliced.design). Тобто проект поділений на рівні між якими лежить одностороння архітектурна границя.
  **app --> pages --> widgets --> features --> entities --> shared**
  Самі рівні - це лаєри (layers). В середині леєрів лежать слайси (slices). В середині слайсів лежать сегменти (segments).

- Важливо пам`ятати, що так як між леєрами лежить архітектурна границя, не можна в ниже лежачих леєрах імпортувати модулі з вище лежачих. <u>Лише навпаки у вище лежачих імпортуються ниже лежачі.</u>

- Також, важливий нюанс. В самих лаєрах, між слайсами лежить двостороння архітектурна границя. Тобто:
  Якщо є фіча _feature/someFeature1_ i _feature/someFeature2_, то вони дві ніяк не можуть взаємодіяти та не можуть імпортувати одна в одної нічого. Те саме і в інших леєрах: _entities/user_ i _entities/comment_, і тд. Це правило частково не виконується в леєрі _shared_
- Використовуються _entry point(index.ts)_ в модулях, імпортувати з модуля можна тільки з _entry point_. Все інше - деталі реалізації.

## Dependency Inversion

Враховуючи правила архітектури, архітектурні границі. Взаємодія модулів відбувається за допомогою _DI (props, context, renderProp, slots)_.
На практиці це виглядає так:

- леєри _shared_ i _entities_ є низькорівневі. В них мінімальна кількість логіки, вони взоємодють суто з абстракціями прокинутими зверху через інтерфейс.
- леєр _feautres_ - рівень трохи вище за _shared_ i _entities_. Фічі вміщують логіку, АЛЕ дуже важливо все одно виділяти залежності модуля і прокидувати їх зверху (в даному проекті це можна побачити в pages/auth.lazy.tsx, а саме як features/Auth (LoginForm) працює в контексті з залежностями.)
- леєри _widgets_ i _pages_ є високорівневими, композиційними, гнучкими леєрами. На цих рівнях будується взаємодія ниже лежачих _features_ і _entites_.

## P.S.

В даному тестовому завданні вперше, працював з _tanstack router, rxjs, tsyringe, tailwind_. Тобто, досить не знайомий для мене стек. Тому міг, десь не коректно з ними працювати, але нічого супер складного в цьому нема.
Через це тестове виконував ~2 дні.
