import { useState } from 'react'
import '@/styles/formatfinder.css'

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
  ]
}

const formatLinks = {
  "Sokratische Schreibwerkstatt": "https://www.institut-neue-sokratische-dialoge.de/sokratische-schreibwerkstatt",
  "Sokratisches Mentoring": "https://www.institut-neue-sokratische-dialoge.de/mentoring",
  "Retreat (Ich bin / Qigong)": "https://www.institut-neue-sokratische-dialoge.de/retreat",
  "Sokratisches Gespräch Online": "https://www.institut-neue-sokratische-dialoge.de/sokratischer-dialog",
  "Sokratischer Konvent": "https://www.institut-neue-sokratische-dialoge.de/konvent",
  "Entdeckungspfad: mehrere Formate zur Auswahl": "https://www.institut-neue-sokratische-dialoge.de/formate"
}

function getFormats(step3) {
  const formats = []
  if (step3.includes("schreibend")) formats.push("Sokratische Schreibwerkstatt")
  if (step3.includes("Gespräch")) formats.push("Sokratisches Mentoring")
  if (step3.includes("Rückzug")) formats.push("Retreat (Ich bin / Qigong)")
  if (step3.includes("anderen denken")) formats.push("Sokratisches Gespräch Online")
  if (step3.includes("schriftlich in Kontakt")) formats.push("Sokratischer Konvent")
  if (step3.includes("unsicher")) formats.push("Entdeckungspfad: mehrere Formate zur Auswahl")
  return formats
}

export default function InteraktiverFormatFinder() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})

  const handleSelect = (stepKey, value) => {
    setAnswers(prev => ({ ...prev, [stepKey]: value }))
    setStep(step + 1)
  }

  return (
    <div className="ff-wrapper">
      {step === 1 && (
        <Card className="ff-card">
          <CardContent className="ff-content">
            <h2 className="ff-heading">Was beschäftigt dich gerade?</h2>
            {data.step1.map((item, i) => (
              <Button key={i} onClick={() => handleSelect('step1', item)} className="ff-button">{item}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="ff-card">
          <CardContent className="ff-content">
            <h2 className="ff-heading">Was brauchst du gerade am meisten?</h2>
            {data.step2_1.map((item, i) => (
              <Button key={i} onClick={() => handleSelect('step2_1', item)} className="ff-button">{item}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="ff-card">
          <CardContent className="ff-content">
            <h2 className="ff-heading">Wo bist du auf deinem Weg?</h2>
            {data.step2_2.map((item, i) => (
              <Button key={i} onClick={() => handleSelect('step2_2', item)} className="ff-button">{item}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card className="ff-card">
          <CardContent className="ff-content">
            <h2 className="ff-heading">Wie offen bist du für Begegnung mit anderen?</h2>
            {data.step2_3.map((item, i) => (
              <Button key={i} onClick={() => handleSelect('step2_3', item)} className="ff-button">{item}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card className="ff-card">
          <CardContent className="ff-content">
            <h2 className="ff-heading">Wie willst du weitergehen?</h2>
            {data.step3.map((item, i) => (
              <Button key={i} onClick={() => handleSelect('step3', item)} className="ff-button">{item}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card className="ff-card">
          <CardContent className="ff-content">
            <h2 className="ff-heading">Dein Weg könnte hier weitergehen:</h2>
            {getFormats(answers.step3).map((f, i) => (
              <p key={i} className="ff-link">👉 <a href={formatLinks[f]} target="_blank" rel="noopener noreferrer">{f}</a></p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
