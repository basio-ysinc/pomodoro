import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "focus": "Focus",
      "break": "Break",
      "longBreak": "Long Break",
      "start": "Start",
      "pause": "Pause",
      "reset": "Reset",
      "work": "Work",
      "rounds": "Rounds",
      "completed": "Completed",
      "keepGoing": "Keep going!",
      "takeRest": "Take a rest",
      "notificationFocusTitle": "Focus Session Complete!",
      "notificationFocusBody": "Great job! Time for a break.",
      "notificationBreakTitle": "Break is Over!",
      "notificationBreakBody": "Ready to focus again?",
      "lBreak": "L.Break"
    }
  },
  ja: {
    translation: {
      "focus": "集中",
      "break": "休憩",
      "longBreak": "長休憩",
      "start": "開始",
      "pause": "一時停止",
      "reset": "リセット",
      "work": "作業",
      "rounds": "セット",
      "completed": "完了数",
      "keepGoing": "頑張ろう！",
      "takeRest": "少し休もう",
      "notificationFocusTitle": "作業完了！",
      "notificationFocusBody": "お疲れ様です！休憩しましょう。",
      "notificationBreakTitle": "休憩終了！",
      "notificationBreakBody": "さあ、次の作業を始めましょう。",
      "lBreak": "長休憩"
    }
  },
  es: {
    translation: {
      "focus": "Enfoque",
      "break": "Descanso",
      "longBreak": "Descanso Largo",
      "start": "Iniciar",
      "pause": "Pausa",
      "reset": "Reiniciar",
      "work": "Trabajo",
      "rounds": "Rondas",
      "completed": "Completado",
      "keepGoing": "¡Sigue así!",
      "takeRest": "Descansa un poco",
      "notificationFocusTitle": "¡Sesión completada!",
      "notificationFocusBody": "¡Buen trabajo! Es hora de un descanso.",
      "notificationBreakTitle": "¡Se acabó el descanso!",
      "notificationBreakBody": "¿Listo para enfocarte de nuevo?",
      "lBreak": "D.Largo"
    }
  },
  fr: {
    translation: {
      "focus": "Concentration",
      "break": "Pause",
      "longBreak": "Longue Pause",
      "start": "Démarrer",
      "pause": "Pause",
      "reset": "Réinitialiser",
      "work": "Travail",
      "rounds": "Tours",
      "completed": "Terminé",
      "keepGoing": "Continuez !",
      "takeRest": "Reposez-vous",
      "notificationFocusTitle": "Session terminée !",
      "notificationFocusBody": "Beau travail ! L'heure de la pause.",
      "notificationBreakTitle": "La pause est finie !",
      "notificationBreakBody": "Prêt à vous concentrer ?",
      "lBreak": "L.Pause"
    }
  },
  de: {
    translation: {
      "focus": "Fokus",
      "break": "Pause",
      "longBreak": "Lange Pause",
      "start": "Start",
      "pause": "Pause",
      "reset": "Reset",
      "work": "Arbeit",
      "rounds": "Runden",
      "completed": "Abgeschlossen",
      "keepGoing": "Weiter so!",
      "takeRest": "Ruh dich aus",
      "notificationFocusTitle": "Sitzung beendet!",
      "notificationFocusBody": "Gute Arbeit! Zeit für eine Pause.",
      "notificationBreakTitle": "Pause ist vorbei!",
      "notificationBreakBody": "Bereit für den Fokus?",
      "lBreak": "L.Pause"
    }
  },
  zh: {
    translation: {
      "focus": "专注",
      "break": "休息",
      "longBreak": "长休息",
      "start": "开始",
      "pause": "暂停",
      "reset": "重置",
      "work": "工作",
      "rounds": "回合",
      "completed": "完成",
      "keepGoing": "继续加油！",
      "takeRest": "休息一下",
      "notificationFocusTitle": "专注会话结束！",
      "notificationFocusBody": "干得好！该休息了。",
      "notificationBreakTitle": "休息结束！",
      "notificationBreakBody": "准备好重新专注了吗？",
      "lBreak": "长休息"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;