import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/47a8c131-cfb8-490d-befb-6360ed56138c/files/2e7620ab-0aa1-4663-bb8a-99f88e86db51.jpg";

const NAV_ITEMS = [
  { label: "ГЛАВНАЯ", href: "#home" },
  { label: "О КОРПОРАЦИИ", href: "#about" },
  { label: "ЛОКАЦИЯ", href: "#location" },
  { label: "РАСПИСАНИЕ", href: "#schedule" },
];

const DAILY_GAMES = [
  {
    slot: "ИГРА 1",
    time: "12:00",
    title: "ДНЕВНОЙ СТАРТ",
    type: "КОМАНДНАЯ",
    desc: "Открытая игра для всех желающих. Команды формируются на месте.",
  },
  {
    slot: "ИГРА 2",
    time: "15:00",
    title: "ДНЕВНАЯ СХВАТКА",
    type: "СТРАТЕГИЯ",
    desc: "Захват территорий на Заводском 3. Нужна тактика и слаженность команды.",
  },
  {
    slot: "ИГРА 3",
    time: "18:00",
    title: "ВЕЧЕРНИЙ РАУНД",
    type: "РОЛЕВАЯ",
    desc: "Сценарные игры с заданиями. Каждый день — новый сценарий.",
    status: "featured",
  },
  {
    slot: "ИГРА 4",
    time: "21:00",
    title: "НОЧНАЯ ОПЕРАЦИЯ",
    type: "ВЫЖИВАНИЕ",
    desc: "Ночная игра для опытных игроков. Темнота меняет правила.",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] overflow-x-hidden">

      {/* TICKER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#00ff88] h-7 overflow-hidden flex items-center">
        <div className="animate-ticker whitespace-nowrap flex items-center gap-0">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="font-mono-ibm text-[10px] font-medium text-black tracking-widest">
              &nbsp;&nbsp;&nbsp;◆ ZG CORP — РЕАЛЬНЫЕ ИГРЫ В РЕАЛЬНОМ ГОРОДЕ &nbsp;&nbsp;&nbsp;◆ ЖЕЛЕЗНОГОРСК, ЗАВОДСКОЙ 3 &nbsp;&nbsp;&nbsp;◆ 4 ИГРЫ КАЖДЫЙ ДЕНЬ &nbsp;&nbsp;&nbsp;◆ 50 ИГРОКОВ &nbsp;&nbsp;&nbsp;◆ БЫВШ. ОТКИ &nbsp;&nbsp;&nbsp;◆ ВСТУПАЙ В ИГРУ
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav className="fixed top-7 left-0 right-0 z-40 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-[#00ff88] flex items-center justify-center"
              style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
              <span className="font-russo text-black text-xs">ZG</span>
            </div>
            <span className="font-russo text-white text-lg tracking-wider group-hover:text-[#00ff88] transition-colors">
              CORP
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`font-oswald text-sm tracking-widest transition-all duration-200 relative ${
                  activeSection === item.href.slice(1)
                    ? "text-[#00ff88]"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#00ff88]" />
                )}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-[#00ff88]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#1e1e1e] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="font-oswald text-sm tracking-widest text-left text-[#888] hover:text-[#00ff88] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "84px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        <div className="absolute inset-0 scan-line pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="absolute top-28 left-6 w-12 h-12 border-l-2 border-t-2 border-[#00ff88] opacity-60" />
        <div className="absolute bottom-8 right-6 w-12 h-12 border-r-2 border-b-2 border-[#00ff88] opacity-60" />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="animate-fade-up opacity-0 delay-100 inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-green" />
            <span className="font-mono-ibm text-[#00ff88] text-xs tracking-[0.3em]">ИГРОВАЯ КОРПОРАЦИЯ / ЖЕЛЕЗНОГОРСК</span>
          </div>

          <h1 className={`font-russo text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-4 ${glitching ? "animate-glitch" : ""}`}>
            <span className="animate-fade-up opacity-0 delay-200 block">ZG</span>
            <span className="animate-fade-up opacity-0 delay-300 block text-[#00ff88] glow-green">CORP</span>
          </h1>

          <div className="animate-fade-up opacity-0 delay-400 w-24 h-px bg-[#00ff88] mb-6" />

          <p className="animate-fade-up opacity-0 delay-500 font-oswald text-xl md:text-2xl text-[#aaa] font-light max-w-lg leading-relaxed mb-3">
            Игры происходят в реальном городе, на реальных улицах.
            <br />
            <span className="text-white">Ты — агент. Железногорск — арена.</span>
          </p>

          <p className="animate-fade-up opacity-0 delay-600 font-mono-ibm text-xs text-[#555] tracking-widest mb-10">
            РАНЕЕ ИЗВЕСТНА КАК <span className="text-[#00ff88]">ОТКИ</span>
          </p>

          <div className="animate-fade-up opacity-0 delay-600 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#schedule")}
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
              className="bg-[#00ff88] text-black font-oswald font-semibold text-sm tracking-widest px-8 py-3 hover:bg-white transition-colors duration-200"
            >
              БЛИЖАЙШИЕ ИГРЫ
            </button>
            <button
              onClick={() => scrollTo("#about")}
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
              className="border border-[#00ff88] text-[#00ff88] font-oswald font-semibold text-sm tracking-widest px-8 py-3 hover:bg-[#00ff88]/10 transition-colors duration-200"
            >
              О НАС
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <Icon name="ChevronDown" size={18} className="text-[#00ff88] animate-bounce" />
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <div className="border-y border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: "2+", label: "ГОДА ИГРЫ" },
            { val: "50", label: "ИГРОКОВ" },
            { val: "4", label: "ИГРЫ В ДЕНЬ" },
            { val: "1", label: "КОРПОРАЦИЯ" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-russo text-3xl text-[#00ff88] glow-green">{s.val}</div>
              <div className="font-mono-ibm text-[10px] text-[#555] tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono-ibm text-[#00ff88] text-xs tracking-[0.3em]">02 /</span>
            <h2 className="font-russo text-4xl md:text-5xl text-white">О КОРПОРАЦИИ</h2>
            <div className="flex-1 h-px bg-[#1e1e1e] ml-4 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-[#00ff88]" />
                  <h3 className="font-russo text-xl text-white tracking-wider">ИСТОРИЯ</h3>
                </div>
                <p className="font-oswald font-light text-[#999] text-lg leading-relaxed">
                  Всё началось под именем <span className="text-white font-normal">ОТКИ</span> — небольшой кружок энтузиастов, которые хотели вывести игры за пределы экранов.
                </p>
                <p className="font-oswald font-light text-[#999] text-lg leading-relaxed mt-4">
                  Сегодня мы — <span className="text-[#00ff88] font-normal">ZG Corp</span>. 50 игроков, 4 игры каждый день прямо на Заводском 3 в Железногорске.
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-[#00ff88]" />
                  <h3 className="font-russo text-xl text-white tracking-wider">МИССИЯ</h3>
                </div>
                <p className="font-oswald font-light text-[#999] text-lg leading-relaxed">
                  Превратить каждую улицу, каждый двор и каждое здание Железногорска в арену для незабываемых командных игр. Мы делаем реальную жизнь захватывающей.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: "Crosshair",
                  title: "РЕАЛЬНЫЙ ГОРОД",
                  desc: "Игры проходят на настоящих улицах Железногорска — никаких виртуальных арен.",
                },
                {
                  icon: "Users",
                  title: "ЖИВЫЕ КОМАНДЫ",
                  desc: "Ты взаимодействуешь с реальными людьми, строишь стратегию и завоёвываешь доверие.",
                },
                {
                  icon: "Trophy",
                  title: "50 ИГРОКОВ",
                  desc: "Сообщество из 50 активных участников, готовых играть каждый день.",
                },
                {
                  icon: "Zap",
                  title: "4 ИГРЫ КАЖДЫЙ ДЕНЬ",
                  desc: "Каждый день на Заводском 3 — четыре игры в разное время. Приходи в любое удобное.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  className="flex gap-4 p-5 bg-[#111] border border-[#1e1e1e] hover:border-[#00ff88]/30 hover:bg-[#111]/80 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00ff88]/20 transition-colors">
                    <Icon name={f.icon} fallback="Circle" size={18} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <div className="font-russo text-sm text-white tracking-wider mb-1">{f.title}</div>
                    <div className="font-oswald font-light text-[#777] text-sm leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LOCATION ═══════════ */}
      <section id="location" className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono-ibm text-[#00ff88] text-xs tracking-[0.3em]">03 /</span>
            <h2 className="font-russo text-4xl md:text-5xl text-white">ЛОКАЦИЯ</h2>
            <div className="flex-1 h-px bg-[#1e1e1e] ml-4 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="relative h-80 bg-[#111] border border-[#1e1e1e] overflow-hidden"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))", boxShadow: "0 0 20px rgba(0,255,136,0.15), inset 0 0 20px rgba(0,255,136,0.03)" }}
            >
              <div className="absolute inset-0 grid-bg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-4 h-4 bg-[#00ff88] rounded-full animate-pulse-green relative z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[#00ff88]/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#00ff88]/10 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#00ff88]/05 rounded-full" />
                  <div className="absolute top-1/2 -left-40 -right-40 h-px bg-[#00ff88]/10" style={{ marginTop: 0 }} />
                  <div className="absolute -top-40 -bottom-40 left-1/2 w-px bg-[#00ff88]/10" style={{ marginLeft: 0 }} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-mono-ibm text-[#00ff88] text-xs tracking-widest">КООРДИНАТЫ БАЗЫ</div>
                <div className="font-russo text-white text-sm mt-1">52.3397° N, 35.3606° E</div>
              </div>
              <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#00ff88]/50" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#00ff88]/50" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#00ff88]/50" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#00ff88]/50" />
            </div>

            <div>
              <div className="mb-8">
                <div className="font-mono-ibm text-[#00ff88] text-xs tracking-[0.2em] mb-3">БАЗА КОРПОРАЦИИ</div>
                <h3 className="font-russo text-3xl md:text-4xl text-white leading-tight mb-2">ЖЕЛЕЗНОГОРСК</h3>
                <h3 className="font-russo text-3xl md:text-4xl text-[#00ff88] glow-green leading-tight">КУРСКАЯ ОБЛ.</h3>
              </div>

              <div
                className="p-6 bg-[#111] border border-[#00ff88]/20 mb-6"
                style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))", boxShadow: "0 0 20px rgba(0,255,136,0.15), inset 0 0 20px rgba(0,255,136,0.03)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={18} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <div className="font-mono-ibm text-[10px] text-[#555] tracking-widest mb-1">ТОЧНЫЙ АДРЕС</div>
                    <div className="font-russo text-white text-lg">ул. Заводской, 3</div>
                    <div className="font-oswald font-light text-[#777] text-sm mt-1">г. Железногорск, Курская область</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Clock", label: "ВРЕМЯ ИГРЫ", val: "Каждую субботу" },
                  { icon: "MapPin", label: "ЗОНА ОПЕРАЦИЙ", val: "Весь город" },
                  { icon: "Users", label: "УЧАСТНИКИ", val: "От 6 человек" },
                  { icon: "Calendar", label: "СЕЗОН", val: "Круглый год" },
                ].map((item) => (
                  <div key={item.label}
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                    className="p-4 bg-[#111] border border-[#1e1e1e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={item.icon} fallback="Circle" size={14} className="text-[#00ff88]" />
                      <span className="font-mono-ibm text-[9px] text-[#555] tracking-widest">{item.label}</span>
                    </div>
                    <div className="font-oswald text-white text-sm font-medium">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SCHEDULE ═══════════ */}
      <section id="schedule" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono-ibm text-[#00ff88] text-xs tracking-[0.3em]">04 /</span>
            <h2 className="font-russo text-4xl md:text-5xl text-white">РАСПИСАНИЕ</h2>
            <div className="flex-1 h-px bg-[#1e1e1e] ml-4 hidden md:block" />
          </div>
          <p className="font-oswald font-light text-[#666] text-lg mb-14 ml-12 md:ml-20">
            Каждый день на Заводском 3 — 4 игры. Приходи в любое время.
          </p>

          {/* Daily schedule banner */}
          <div
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            className="flex items-center gap-4 p-4 bg-[#00ff88]/5 border border-[#00ff88]/30 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-green flex-shrink-0" />
            <span className="font-mono-ibm text-[#00ff88] text-xs tracking-widest">ЕЖЕДНЕВНО</span>
            <div className="h-px flex-1 bg-[#00ff88]/20" />
            <span className="font-oswald text-[#999] text-sm">ул. Заводской, 3 · Железногорск</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {DAILY_GAMES.map((ev, i) => (
              <div
                key={i}
                style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                className={`relative flex gap-5 p-6 border transition-all duration-300 hover:border-[#00ff88]/30 ${
                  ev.status === "featured"
                    ? "bg-[#00ff88]/5 border-[#00ff88]/40"
                    : "bg-[#111] border-[#1e1e1e]"
                }`}
              >
                {ev.status === "featured" && (
                  <div className="absolute -top-3 left-6 bg-[#00ff88] text-black font-mono-ibm text-[9px] tracking-widest px-3 py-1">
                    ЛУЧШЕЕ ВРЕМЯ
                  </div>
                )}
                {/* Time block */}
                <div className={`w-16 flex flex-col items-center justify-center border flex-shrink-0 ${
                  ev.status === "featured" ? "border-[#00ff88] bg-[#00ff88]/10" : "border-[#2a2a2a] bg-[#0d0d0d]"
                }`}>
                  <span className={`font-russo text-xl leading-none ${ev.status === "featured" ? "text-[#00ff88]" : "text-white"}`}>
                    {ev.time}
                  </span>
                  <span className="font-mono-ibm text-[9px] text-[#555] tracking-wider mt-1">{ev.slot}</span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-mono-ibm text-[10px] tracking-widest mb-1 ${ev.status === "featured" ? "text-[#00ff88]" : "text-[#555]"}`}>
                    {ev.type}
                  </div>
                  <div className="font-russo text-white text-base mb-2">{ev.title}</div>
                  <p className="font-oswald font-light text-[#777] text-sm leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            className="mt-12 p-8 bg-[#111] border border-[#1e1e1e] text-center"
          >
            <div className="font-mono-ibm text-[#00ff88] text-xs tracking-[0.3em] mb-3">ХОЧЕШЬ УЧАСТВОВАТЬ?</div>
            <h3 className="font-russo text-2xl md:text-3xl text-white mb-4">ВСТУПИ В КОРПОРАЦИЮ</h3>
            <p className="font-oswald font-light text-[#777] text-lg max-w-lg mx-auto mb-6">
              50 игроков уже в деле. Приходи на Заводской 3 в любой день — игра найдётся.
            </p>
            <button
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
              className="bg-[#00ff88] text-black font-oswald font-semibold text-sm tracking-widest px-8 py-3 hover:bg-white transition-colors duration-200"
            >
              ЗАПИСАТЬСЯ НА ИГРУ
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-[#1e1e1e] bg-[#0d0d0d] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00ff88] flex items-center justify-center"
              style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
              <span className="font-russo text-black text-xs">ZG</span>
            </div>
            <div>
              <div className="font-russo text-white text-sm tracking-wider">ZG CORP</div>
              <div className="font-mono-ibm text-[9px] text-[#444] tracking-widest">БЫВШ. ОТКИ</div>
            </div>
          </div>

          <div className="font-oswald font-light text-[#555] text-sm text-center">
            г. Железногорск, Курская область, ул. Заводской 3
          </div>

          <div className="font-mono-ibm text-[10px] text-[#333] tracking-widest">
            © {new Date().getFullYear()} ZG CORP
          </div>
        </div>
      </footer>

    </div>
  );
}