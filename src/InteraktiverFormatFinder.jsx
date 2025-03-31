import { useState } from 'react'
import './styles/formatfinder.css'

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
step6Options: [
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
  "Retreat Ich bin": "https://www.institut-neue-sokratische-dialoge.de/ichbin",
  "Sokratisches Gespräch Online": "https://www.institut-neue-sokratische-dialoge.de/sokratisches-gespraech-online",
  "Sokratischer Konvent": "https://www.institut-neue-sokratische-dialoge.de/neuer-sokratischer-konvent",
  "Entdeckungspfad: mehrere Formate zur Auswahl": "https://www.institut-neue-sokratische-dialoge.de/formate",

  // NEU:
  "Sokratischer Männerkreis Online": "https://www.institut-neue-sokratische-dialoge.de/sokratischer-maennerkreis-online",
  "Sokratischer Lehrerkreis Online": "https://www.institut-neue-sokratische-dialoge.de/sokratischer-lehrerkreis-online",
  "Sokratischer Führungskreis Online": "https://www.institut-neue-sokratische-dialoge.de/sokratischerfuehrungskreis-online",
  "Dialog- und Qigong-Retreat": "https://www.institut-neue-sokratische-dialoge.de/dialog-und-qigong-retreat",
  "Neuer Sokratischer Dialog im Norden": "https://www.institut-neue-sokratische-dialoge.de/dialog-norden",
  "Neuer Sokratischer Dialog vor Ort": "https://www.institut-neue-sokratische-dialoge.de/Kontakt",
  "Neuer Sokratischer Dialog als Teil deiner Veranstaltung": "https://www.institut-neue-sokratische-dialoge.de/Kontakt"
}


function getFormats(step3, step2_1, step2_2, step2_3, step6, step1) {
  const formats = []

  // Basis-Zuordnungen
  if (step3.includes("schreibend")) formats.push("Sokratische Schreibwerkstatt")
  if (step3.includes("Gespräch")) formats.push("Sokratisches Mentoring")
  if (step3.includes("Rückzug")) formats.push("Retreat (Ich bin / Qigong)")
  if (step3.includes("anderen denken")) formats.push("Sokratisches Gespräch Online")
  if (step3.includes("schriftlich in Kontakt")) formats.push("Sokratischer Konvent")
  if (step3.includes("unsicher")) formats.push("Entdeckungspfad: mehrere Formate zur Auswahl")

  if (step6.includes("Mann") && step2_1 === "Resonanz" && step2_3 === "Ich will mich zeigen – ohne Maske") {
    formats.push("Sokratischer Männerkreis Online")
  }

  if (step6.includes("LehrerIn")) {
    formats.push("Sokratischer Lehrerkreis Online")
  }

  if (step6.includes("Führungsverantwortung") && step2_1 === "Entscheidungskraft") {
    formats.push("Sokratischer Führungskreis Online")
  }

  if (step2_1 === "Rückzug" &&
     (step2_2 === "Im Übergang – ich will Altes würdigen und Neues finden" ||
      step2_2 === "In der Tiefe – ich will weitergraben")) {
    formats.push("Dialog- und Qigong-Retreat")
  }

  if (step2_1 === "Rückzug" &&
      step2_2 === "Im Übergang – ich will Altes würdigen und Neues finden" &&
      step2_3 === "Ich brauche erst mal Raum für mich") {
    formats.push("Neuer Sokratischer Dialog im Norden")
  }

  if (step2_2 === "In der Tiefe – ich will weitergraben" &&
      step2_3 === "Ich bin bereit für Austausch mit anderen") {
    formats.push("Neuer Sokratischer Dialog vor Ort")
  }

  if (step2_2 === "An einer Schwelle – etwas will sich verändern" &&
      step2_3 === "Ich suche ein Gegenüber, das mit mir denkt") {
    formats.push("Neuer Sokratischer Dialog als Teil deiner Veranstaltung")
  }

  // Priorisierungen durch Schritt 1
  const step1Boost = {
    "Ich stecke fest": "Sokratisches Mentoring",
    "Ich spüre, dass etwas in Bewegung": "Retreat (Ich bin / Qigong)",
    "Ich sehne mich nach Verbindung": "Sokratischer Konvent",
    "Ich will nicht mehr funktionieren": "Sokratische Schreibwerkstatt",
    "Ich suche Klarheit": "Sokratisches Mentoring",
    "Ich fühle mich leer": "Retreat (Ich bin / Qigong)"
  }

  const boost = Object.entries(step1Boost)
    .filter(([key]) => step1.includes(key))
    .map(([, value]) => value)

  // Wenn mehrere Formate: sortieren nach Boost
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
    "Sokratischer Konvent",
    "Entdeckungspfad: mehrere Formate zur Auswahl"
  ]

  const uniqueFormats = [...new Set(formats)]

  if (uniqueFormats.length === 0) {
    return ["Entdeckungspfad: mehrere Formate zur Auswahl"]
  }

  return formatPriority.filter(f => uniqueFormats.includes(f)).slice(0, 2)
}

export default function InteraktiverFormatFinder() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})

  const handleSelect = (stepKey, value) => {
    setAnswers(prev => ({ ...prev, [stepKey]: value }))
    setStep(step + 1)
  }

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
          <h2 className="ff-heading">Dein Weg könnte hier weitergehen:</h2>
          <div className="ff-results">
            {getFormats(answers.step3).map((f, i) => (
              <p key={i} className="ff-link">👉 <a href={formatLinks[f]} target="_blank" rel="noopener noreferrer">{f}</a></p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
