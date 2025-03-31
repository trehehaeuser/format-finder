import { useState, useEffect } from 'react'
import './styles/formatfinder.css'
import './styles/fonts.css'


const data = {
  step1: [
    "Ich habe eine Frage, die mich nicht loslässt.",
    "Ich stecke fest – innerlich oder äußerlich.",
    "Ich suche Klarheit für eine Entscheidung.",
    "Ich fühle mich leer, orientierungslos, abgeschnitten.",
    "Ich sehne mich nach Verbindung, die echt ist.",
    "Ich will nicht mehr funktionieren – sondern wieder fühlen.",
    "Ich spüre, dass etwas in Bewegung kommen will – aber weiß nicht wie."
  ],
  step2_1: [
    "Orientierung", "Resonanz", "Rückzug", "Entscheidungskraft",
    "Klarheit", "Bewegung / Veränderung"
  ],
  step2_2: [
    "Am Anfang – ich taste mich erst vor",
    "In der Krise – ich brauche Halt",
    "An einer Schwelle – etwas will sich verändern",
    "Im Übergang – ich will Altes würdigen und Neues finden",
    "In der Tiefe – ich will weitergraben"
  ],
  step2_3: [
    "Ich brauche erst mal Raum für mich",
    "Ich bin bereit für Austausch mit anderen",
    "Ich will mich zeigen – ohne Maske",
    "Ich suche ein Gegenüber, das mit mir denkt"
  ],
  step3: [
    "Ich will Klarheit – aber in meinem Tempo. Am liebsten schreibend, ohne direkten Kontakt.",
    "Ich wünsche mir jemanden, der mit mir denkt – nicht für mich. Im echten Gespräch.",
    "Ich will raus aus dem Alltag. Stille. Raum. Rückzug, um mich wieder zu spüren.",
    "Ich will mit anderen denken. Hören, was sie bewegt – und was in mir anklingt.",
    "Ich will schriftlich in Kontakt kommen – nicht allein, aber ohne reden zu müssen.",
    "Ich bin noch unsicher – ich will entdecken."
  ],
  step6: [
    "Ich bin Mann und suche Austausch unter Männern",
    "Ich bin LehrerIn oder LernbegleiterIn",
    "Ich habe Führungsverantwortung",
    "Ich bin Moderator, Trainer, Coach, Mentor oder Berater",
    "Keines davon"
  ]
}

const formatLinks = {
  "Sokratische Schreibwerkstatt": "https://www.institut-neue-sokratische-dialoge.de/sokratische-schreibwerkstatt",
  "Sokratisches Mentoring": "https://www.institut-neue-sokratische-dialoge.de/sokratisches-mentoring",
  "Ich bin – Tagesretreat": "https://www.institut-neue-sokratische-dialoge.de/retreat",
  "Sokratisches Gespräch Online": "https://www.institut-neue-sokratische-dialoge.de/sokratisches-gespraech-online",
  "Sokratischer Konvent": "https://www.institut-neue-sokratische-dialoge.de/konvent",
  "Entdeckungspfad: mehrere Formate zur Auswahl": "https://www.institut-neue-sokratische-dialoge.de/formate",
  "Sokratischer Männerkreis Online": "https://www.institut-neue-sokratische-dialoge.de/maennerkreis",
  "Sokratischer Lehrerkreis Online": "https://www.institut-neue-sokratische-dialoge.de/lehrerkreis",
  "Sokratischer Führungskreis Online": "https://www.institut-neue-sokratische-dialoge.de/fuehrungskreis",
  "Dialog- und Qigong-Retreat": "https://www.institut-neue-sokratische-dialoge.de/dialog-und-qigong-retreat",
  "Neuer Sokratischer Dialog im Norden": "https://www.institut-neue-sokratische-dialoge.de/dialog-im-norden",
  "Neuer Sokratischer Dialog vor Ort": "https://www.institut-neue-sokratische-dialoge.de/dialog-vor-ort",
  "Neuer Sokratischer Dialog als Teil deiner Veranstaltung": "https://www.institut-neue-sokratische-dialoge.de/dialog-in-veranstaltung"
}

const formatDescriptions = {
  "Sokratische Schreibwerkstatt": "Dein innerer Kompass in Worten – Klarheit im Schreiben, ohne äußeren Druck.",
  "Sokratisches Mentoring": "Individuelles Denk- und Gesprächsformat für echte Klarheit in komplexen Fragen.",
  "Ich bin – Tagesretreat": "Ein Raum zum Rückzug, Spüren und Wandeln – mit Bewegung, Dialog und Natur.",
  "Sokratisches Gespräch Online": "Gemeinsames Denken auf Augenhöhe – online, strukturiert und tiefgehend.",
  "Sokratischer Konvent": "In Resonanz mit anderen – Raum für Präsenz, Austausch und das Wesentliche.",
  "Sokratischer Männerkreis Online": "Für Männer, die sich zeigen wollen – ehrlich, verletzlich, kraftvoll.",
  "Sokratischer Lehrerkreis Online": "Für LernbegleiterInnen, die sich Raum nehmen zum Denken, Hören, Verstehen.",
  "Sokratischer Führungskreis Online": "Reflexionsraum für Menschen mit Verantwortung – jenseits von Businessroutinen.",
  "Neuer Sokratischer Dialog im Norden": "Still. Echt. Tief. Ein Dialogformat an einem Ort, der Weite schenkt.",
  "Neuer Sokratischer Dialog vor Ort": "Bringe Denkraum in deine Region – mit Tiefe, Struktur und Präsenz.",
  "Neuer Sokratischer Dialog als Teil deiner Veranstaltung": "Verwandle Events in echte Resonanzräume mit Substanz.",
  "Dialog- und Qigong-Retreat": "Die Kraft aus Bewegung und Dialog – Retreat für Körper, Geist und Wandel.",
  "Entdeckungspfad: mehrere Formate zur Auswahl": "Du bist eingeladen, weiter zu entdecken – in deinem Tempo."
}


function getFormats(step3 = "", step2_1 = "", step2_2 = "", step2_3 = "", step6 = "", step1 = []) {
  const formats = []

  if (step3.includes("schreibend")) formats.push("Sokratische Schreibwerkstatt")
  if (step3.includes("Gespräch")) formats.push("Sokratisches Mentoring")
  if (step3.includes("Rückzug")) formats.push("Ich bin – Tagesretreat")
  if (step3.includes("anderen denken")) formats.push("Sokratisches Gespräch Online")
  if (step3.includes("schriftlich in Kontakt")) formats.push("Sokratischer Konvent")
  if (step3.includes("unsicher")) formats.push("Entdeckungspfad: mehrere Formate zur Auswahl")

  if (step6.includes("Mann") && step2_1 === "Resonanz" && step2_3 === "Ich will mich zeigen – ohne Maske") {
    formats.push("Sokratischer Männerkreis Online")
  }
  if (step6.includes("LehrerIn")) formats.push("Sokratischer Lehrerkreis Online")
  if (step6.includes("Führungsverantwortung") && step2_1 === "Entscheidungskraft") formats.push("Sokratischer Führungskreis Online")
  if (step2_1 === "Rückzug" && (step2_2 === "Im Übergang – ich will Altes würdigen und Neues finden" || step2_2 === "In der Tiefe – ich will weitergraben")) {
    formats.push("Dialog- und Qigong-Retreat")
  }
  if (step2_1 === "Rückzug" && step2_2 === "Im Übergang – ich will Altes würdigen und Neues finden" && step2_3 === "Ich brauche erst mal Raum für mich") {
    formats.push("Neuer Sokratischer Dialog im Norden")
  }
  if (step2_2 === "In der Tiefe – ich will weitergraben" && step2_3 === "Ich bin bereit für Austausch mit anderen") {
    formats.push("Neuer Sokratischer Dialog vor Ort")
  }
  if (step2_2 === "An einer Schwelle – etwas will sich verändern" && step2_3 === "Ich suche ein Gegenüber, das mit mir denkt") {
    formats.push("Neuer Sokratischer Dialog als Teil deiner Veranstaltung")
  }
  if (step6.includes("Coach") && step3.includes("mit mir denkt")) formats.push("Sokratisches Mentoring")
  if (step6.includes("Coach") && step2_3 === "Ich will mich zeigen – ohne Maske") formats.push("Sokratischer Konvent")

  const step1Boost = {
    "Ich stecke fest": "Sokratisches Mentoring",
    "Ich spüre, dass etwas in Bewegung": "Ich bin – Tagesretreat",
    "Ich sehne mich nach Verbindung": "Sokratischer Konvent",
    "Ich will nicht mehr funktionieren": "Sokratische Schreibwerkstatt",
    "Ich suche Klarheit": "Sokratisches Mentoring",
    "Ich fühle mich leer": "Ich bin – Tagesretreat"
  }

  const boost = [...new Set(
  Object.entries(step1Boost)
    .filter(([key]) => step1 && step1.includes(key))
    .map(([, value]) => value)
)]


  const formatPriority = [
    ...boost,
    "Sokratisches Mentoring",
    "Sokratisches Gespräch Online",
    "Sokratische Schreibwerkstatt",
    "Sokratischer Führungskreis Online",
    "Sokratischer Männerkreis Online",
    "Sokratischer Lehrerkreis Online",
    "Dialog- und Qigong-Retreat",
    "Neuer Sokratischer Dialog im Norden",
    "Neuer Sokratischer Dialog vor Ort",
    "Neuer Sokratischer Dialog als Teil deiner Veranstaltung",
    "Sokratischer Konvent",
    "Entdeckungspfad: mehrere Formate zur Auswahl"
  ]

  const uniqueFormats = [...new Set(formats)]
  if (uniqueFormats.length === 0) return ["Entdeckungspfad: mehrere Formate zur Auswahl"]
  return formatPriority.filter(f => uniqueFormats.includes(f)).slice(0, 2)
}



export default function InteraktiverFormatFinder() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})

  const handleSelect = (stepKey, value) => {
    setAnswers(prev => ({ ...prev, [stepKey]: value }))
    setStep(step + 1)

    // Google Analytics Tracking – Schritt-Event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'formatfinder_step', {
        event_category: 'FormatFinder',
        event_label: value,
        value: stepKey
      })
    }
  }

  useEffect(() => {
    if (step === 6) {
      const resultFormats = getFormats(
        answers.step3,
        answers.step2_1,
        answers.step2_2,
        answers.step2_3,
        answers.step6,
        answers.step1
      )

      // Google Analytics Tracking – Ergebnis-Event
      if (typeof gtag !== 'undefined') {
        resultFormats.forEach(format => {
          gtag('event', 'formatfinder_result', {
            event_category: 'FormatFinder',
            event_label: format
          })
        })
      }
    }
  }, [step])

  const renderButtons = (items, stepKey) => (
    <div className="ff-content">
      {items.map((item, i) => (
        <button key={i} onClick={() => handleSelect(stepKey, item)} className="ff-button">{item}</button>
      ))}
    </div>
  )

  return (
    <div className="ff-wrapper">
      {step === 1 && (
        <div className="ff-card">
          <h2 className="ff-heading">Was beschäftigt dich gerade?</h2>
          {renderButtons(data.step1, 'step1')}
        </div>
      )}

      {step === 2 && (
        <div className="ff-card">
          <h2 className="ff-heading">Was brauchst du gerade am meisten?</h2>
          {renderButtons(data.step2_1, 'step2_1')}
        </div>
      )}

      {step === 3 && (
        <div className="ff-card">
          <h2 className="ff-heading">Wo bist du auf deinem Weg?</h2>
          {renderButtons(data.step2_2, 'step2_2')}
        </div>
      )}

      {step === 4 && (
        <div className="ff-card">
          <h2 className="ff-heading">Wie offen bist du für Begegnung mit anderen?</h2>
          {renderButtons(data.step2_3, 'step2_3')}
        </div>
      )}

      {step === 5 && (
        <div className="ff-card">
          <h2 className="ff-heading">Wie willst du weitergehen?</h2>
          {renderButtons(data.step3, 'step3')}
        </div>
      )}

      {step === 6 && (
        <div className="ff-card">
          <h2 className="ff-heading">Damit ich dir die passenden Formate vorschlagen kann, noch eine kleine Abschlussfrage …</h2>
          {renderButtons(data.step6, 'step6')}
        </div>
      )}

      {step === 7 && (
        <div className="ff-card">
          <h2 className="ff-heading">Dein Weg könnte hier weitergehen:</h2>
          <div className="ff-content">
            {getFormats(answers.step3, answers.step2_1, answers.step2_2, answers.step2_3, answers.step6, answers.step1).map((f, i) => (
              <div key={i} className="ff-result">
                <p className="ff-link">👉 <a href={formatLinks[f]} target="_blank" rel="noopener noreferrer">{f}</a></p>
                <p className="ff-description">{formatDescriptions[f]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
